import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * API: Solicitar cotización
 * POST /api/quotations/request
 *
 * Permite a un cliente solicitar cotización para un servicio
 * bajo modalidad "COTIZAR"
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
    const {
      productId,
      clienteId,
      datosServicio,
      notasCliente
    } = req.body;

    // Validaciones
    if (!productId || !clienteId || !datosServicio) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        required: ['productId', 'clienteId', 'datosServicio']
      });
    }

    // Validar que el producto existe y está en modo COTIZAR
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        id,
        nombre,
        pricing_mode,
        visible,
        approved,
        provider:providers (
          id,
          razon_social,
          correos_notificaciones,
          user:users (
            email
          )
        )
      `)
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (product.pricing_mode !== 'COTIZAR') {
      return res.status(400).json({
        error: 'Este producto no requiere cotización',
        pricing_mode: product.pricing_mode
      });
    }

    if (!product.visible || !product.approved) {
      return res.status(400).json({
        error: 'Este producto no está disponible'
      });
    }

    // Validar que el cliente existe
    const { data: cliente, error: clienteError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('id', clienteId)
      .single();

    if (clienteError || !cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Validar datosServicio tiene los campos mínimos
    const camposRequeridos = ['ubicacion', 'fechaRequerida'];
    const camposFaltantes = camposRequeridos.filter(
      campo => !datosServicio[campo]
    );

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: 'Faltan datos del servicio',
        camposFaltantes
      });
    }

    // Crear la cotización
    const { data: quotation, error: quotationError } = await supabase
      .from('quotations')
      .insert({
        product_id: productId,
        cliente_id: clienteId,
        status: 'SOLICITADA',
        datos_servicio: datosServicio,
        notas_cliente: notasCliente || null
      })
      .select(`
        id,
        status,
        datos_servicio,
        notas_cliente,
        created_at,
        product:products (
          nombre,
          provider:providers (
            razon_social
          )
        ),
        cliente:users (
          name,
          email
        )
      `)
      .single();

    if (quotationError) {
      console.error('Error creating quotation:', quotationError);
      return res.status(500).json({
        error: 'Error al crear la cotización',
        details: quotationError.message
      });
    }

    // TODO: Enviar notificación por correo al proveedor
    // const correosProveedor = product.provider.correos_notificaciones || [];
    // await sendQuotationNotification(quotation, correosProveedor);

    return res.status(201).json({
      message: 'Cotización solicitada exitosamente',
      quotation: {
        id: quotation.id,
        status: quotation.status,
        producto: quotation.product.nombre,
        proveedor: quotation.product.provider.razon_social,
        datosServicio: quotation.datos_servicio,
        createdAt: quotation.created_at
      },
      nextSteps: [
        'El proveedor revisará tu solicitud',
        'Recibirás un presupuesto en las próximas 24-48 horas',
        'Podrás aceptar o rechazar el presupuesto desde tu panel'
      ]
    });

  } catch (error: any) {
    console.error('Error in quotation request:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
