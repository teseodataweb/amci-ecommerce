import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = supabaseAdmin();

  try {
    const {
      orderId,
      providerId,
      carrier,
      tracking,
      tracking_url
    } = req.body;

    // Validaciones
    if (!orderId || !providerId || !carrier || !tracking) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Verificar que el proveedor tiene acceso a esta orden
    const { data: orderItems, error: orderError } = await supabase
      .from('order_items')
      .select(`
        *,
        products!inner(
          provider_id
        )
      `)
      .eq('order_id', orderId)
      .eq('products.provider_id', providerId);

    if (orderError || !orderItems || orderItems.length === 0) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar esta orden' });
    }

    // Crear o actualizar registro de envío
    const { data: shipping, error: shippingError } = await supabase
      .from('shippings')
      .upsert({
        order_id: orderId,
        carrier: carrier,
        tracking: tracking,
        tracking_url: tracking_url || null,
        fecha_envio: new Date().toISOString()
      }, {
        onConflict: 'order_id'
      })
      .select()
      .single();

    if (shippingError) {
      console.error('Error creating/updating shipping:', shippingError);
      return res.status(500).json({ error: 'Error al registrar el envío' });
    }

    // Actualizar estado de la orden a ENVIADO
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        estado: 'ENVIADO',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order status:', updateError);
      return res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
    }

    // Crear registro en historial de estados
    await supabase
      .from('order_status_history')
      .insert({
        order_id: orderId,
        estado: 'ENVIADO',
        reason: `Enviado con ${carrier}, guía: ${tracking}`,
        user_id: providerId
      });

    return res.status(200).json({
      success: true,
      shipping: shipping,
      message: 'Información de envío registrada exitosamente'
    });

  } catch (error) {
    console.error('Error processing shipping:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
