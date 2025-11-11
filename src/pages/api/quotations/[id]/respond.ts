import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * API: Responder cotización (Proveedor)
 * PATCH /api/quotations/[id]/respond
 *
 * Permite al proveedor responder una cotización con un presupuesto
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
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
      providerId,
      presupuesto,
      validoHasta,
      notasProveedor
    } = req.body;

    // Validaciones
    if (!quotationId || !providerId || !presupuesto) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        required: ['quotationId', 'providerId', 'presupuesto']
      });
    }

    if (typeof presupuesto !== 'number' || presupuesto <= 0) {
      return res.status(400).json({
        error: 'El presupuesto debe ser un número mayor a 0'
      });
    }

    // Obtener la cotización con verificación de propiedad
    const { data: quotation, error: quotationError } = await supabase
      .from('quotations')
      .select(`
        id,
        status,
        product:products (
          id,
          nombre,
          provider_id,
          provider:providers (
            id,
            razon_social,
            user_id
          )
        ),
        cliente:users (
          id,
          name,
          email
        )
      `)
      .eq('id', quotationId)
      .single();

    if (quotationError || !quotation) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }

    // Extraer el producto (Supabase retorna un array para relaciones)
    const product = Array.isArray(quotation.product) ? quotation.product[0] : quotation.product;
    const provider = Array.isArray(product.provider) ? product.provider[0] : product.provider;

    // Verificar que el proveedor es dueño del producto
    if (provider.id !== providerId) {
      return res.status(403).json({
        error: 'No tienes permiso para responder esta cotización'
      });
    }

    // Verificar que la cotización está en estado SOLICITADA
    if (quotation.status !== 'SOLICITADA') {
      return res.status(400).json({
        error: 'Esta cotización ya fue respondida',
        currentStatus: quotation.status
      });
    }

    // Validar fecha de validez (debe ser futura)
    let validoHastaDate = null;
    if (validoHasta) {
      validoHastaDate = new Date(validoHasta);
      if (validoHastaDate < new Date()) {
        return res.status(400).json({
          error: 'La fecha de validez debe ser futura'
        });
      }
    } else {
      // Por defecto, válido por 7 días
      validoHastaDate = new Date();
      validoHastaDate.setDate(validoHastaDate.getDate() + 7);
    }

    // Actualizar la cotización
    const { data: updatedQuotation, error: updateError } = await supabase
      .from('quotations')
      .update({
        status: 'PRESUPUESTADA',
        presupuesto: presupuesto,
        valido_hasta: validoHastaDate.toISOString(),
        notas_proveedor: notasProveedor || null,
        respondida_at: new Date().toISOString()
      })
      .eq('id', quotationId)
      .select(`
        id,
        status,
        presupuesto,
        valido_hasta,
        notas_proveedor,
        respondida_at,
        product:products (
          nombre
        ),
        cliente:users (
          name,
          email
        )
      `)
      .single();

    if (updateError) {
      console.error('Error updating quotation:', updateError);
      return res.status(500).json({
        error: 'Error al actualizar la cotización',
        details: updateError.message
      });
    }

    // TODO: Enviar notificación por correo al cliente
    // await sendQuotationResponseNotification(updatedQuotation);

    return res.status(200).json({
      message: 'Presupuesto enviado exitosamente',
      quotation: {
        id: updatedQuotation.id,
        status: updatedQuotation.status,
        presupuesto: updatedQuotation.presupuesto,
        validoHasta: updatedQuotation.valido_hasta,
        notasProveedor: updatedQuotation.notas_proveedor,
        respondidaAt: updatedQuotation.respondida_at
      },
      nextSteps: [
        'El cliente recibirá una notificación por correo',
        'El cliente puede aceptar o rechazar tu presupuesto',
        `El presupuesto es válido hasta ${new Date(updatedQuotation.valido_hasta).toLocaleDateString('es-MX')}`
      ]
    });

  } catch (error: any) {
    console.error('Error responding to quotation:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
