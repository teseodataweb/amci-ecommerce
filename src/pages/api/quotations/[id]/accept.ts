import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * API: Aceptar cotización (Cliente)
 * POST /api/quotations/[id]/accept
 *
 * Permite al cliente aceptar un presupuesto y generar una orden
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  try {
    const { id: quotationId } = req.query;
    const {
      clienteId,
      addressId // Dirección de servicio/facturación
    } = req.body;

    // Validaciones
    if (!quotationId || !clienteId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        required: ['quotationId', 'clienteId']
      });
    }

    // Obtener la cotización
    const { data: quotation, error: quotationError } = await supabase
      .from('quotations')
      .select(`
        id,
        status,
        presupuesto,
        valido_hasta,
        cliente_id,
        product:products (
          id,
          nombre,
          emisor_factura,
          provider:providers (
            id,
            razon_social
          )
        )
      `)
      .eq('id', quotationId)
      .single();

    if (quotationError || !quotation) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }

    // Verificar que el cliente es dueño de la cotización
    if (quotation.cliente_id !== clienteId) {
      return res.status(403).json({
        error: 'No tienes permiso para aceptar esta cotización'
      });
    }

    // Verificar que la cotización está en estado PRESUPUESTADA
    if (quotation.status !== 'PRESUPUESTADA') {
      return res.status(400).json({
        error: 'Esta cotización no puede ser aceptada',
        currentStatus: quotation.status,
        reason: quotation.status === 'SOLICITADA'
          ? 'El proveedor aún no ha respondido'
          : 'La cotización ya fue procesada'
      });
    }

    // Verificar que no ha expirado
    if (quotation.valido_hasta && new Date(quotation.valido_hasta) < new Date()) {
      return res.status(400).json({
        error: 'El presupuesto ha expirado',
        validoHasta: quotation.valido_hasta
      });
    }

    // Verificar que tiene presupuesto
    if (!quotation.presupuesto || quotation.presupuesto <= 0) {
      return res.status(400).json({
        error: 'El presupuesto no es válido'
      });
    }

    // Calcular totales (IVA 16%)
    const subtotal = quotation.presupuesto;
    const impuestos = subtotal * 0.16;
    const envio = 0; // Para servicios in-situ, el envío es 0
    const total = subtotal + impuestos;

    // Extraer el producto (Supabase retorna un array para relaciones)
    const product = Array.isArray(quotation.product) ? quotation.product[0] : quotation.product;

    // Crear la orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        cliente_id: clienteId,
        address_id: addressId || null,
        subtotal: subtotal,
        impuestos: impuestos,
        envio: envio,
        total: total,
        estado: 'RECIBIDO',
        emisor_factura_resumen: {
          [product.emisor_factura]: total
        },
        notes: `Orden generada desde cotización #${quotationId}`
      })
      .select('id, created_at, total, estado')
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return res.status(500).json({
        error: 'Error al crear la orden',
        details: orderError.message
      });
    }

    // Crear el item de la orden
    const { error: orderItemError } = await supabase
      .from('order_items')
      .insert({
        order_id: order.id,
        product_id: product.id,
        qty: 1,
        precio_unit: subtotal,
        subtotal: subtotal,
        variant_data: null,
        bundle_data: null
      });

    if (orderItemError) {
      console.error('Error creating order item:', orderItemError);
      // Intentar revertir la orden creada
      await supabase.from('orders').delete().eq('id', order.id);
      return res.status(500).json({
        error: 'Error al crear los items de la orden',
        details: orderItemError.message
      });
    }

    // Actualizar la cotización a ACEPTADA
    const { error: updateError } = await supabase
      .from('quotations')
      .update({
        status: 'ACEPTADA',
        aceptada_at: new Date().toISOString()
      })
      .eq('id', quotationId);

    if (updateError) {
      console.error('Error updating quotation status:', updateError);
      // No es crítico, la orden ya fue creada
    }

    // Registrar el historial de estado de la orden
    await supabase
      .from('order_status_history')
      .insert({
        order_id: order.id,
        estado: 'RECIBIDO',
        reason: 'Orden creada desde cotización aceptada',
        user_id: clienteId
      });

    // TODO: Enviar notificaciones por correo
    // - Al cliente: confirmación de orden
    // - Al proveedor: nueva orden recibida

    return res.status(201).json({
      message: 'Cotización aceptada y orden creada exitosamente',
      order: {
        id: order.id,
        total: order.total,
        estado: order.estado,
        createdAt: order.created_at
      },
      quotation: {
        id: quotationId,
        status: 'ACEPTADA',
        presupuesto: quotation.presupuesto
      },
      nextSteps: [
        'Tu orden ha sido enviada al proveedor',
        'El proveedor confirmará la fecha y hora del servicio',
        'Recibirás notificaciones del estado de tu orden',
        `Puedes ver los detalles en /orden/${order.id}`
      ]
    });

  } catch (error: any) {
    console.error('Error accepting quotation:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
