import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { userId } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID de orden inválido' });
  }

  const supabase = supabaseAdmin();

  try {
    // Construir query base
    let query = supabase
      .from('orders')
      .select(`
        *,
        addresses(*),
        order_items(
          *,
          products(
            id,
            nombre,
            precio,
            product_images(url),
            providers(razon_social)
          )
        ),
        shippings(
          carrier,
          tracking,
          tracking_url,
          fecha_envio
        )
      `)
      .eq('id', id);

    // Si se proporciona userId, verificar que la orden pertenece al usuario
    if (userId) {
      query = query.eq('cliente_id', userId);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      console.error('Error fetching order:', error);
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // Formatear la respuesta
    const formattedOrder = {
      id: order.id,
      numero_orden: order.id.slice(0, 8).toUpperCase(),
      fecha: order.created_at,
      total: order.total,
      subtotal: order.subtotal,
      envio: order.envio,
      impuestos: order.impuestos,
      estado: order.estado,
      payment_status: order.payment_status,
      items: order.order_items?.map((item: any) => ({
        id: item.id,
        producto_id: item.products?.id,
        producto_nombre: item.products?.nombre || 'Producto',
        cantidad: item.qty,
        precio_unitario: item.precio_unit,
        subtotal: item.subtotal,
        proveedor: item.products?.providers?.razon_social || 'Sin proveedor',
        imagen: item.products?.product_images?.[0]?.url || null
      })) || [],
      direccion: order.addresses ? {
        nombre: order.addresses.nombre,
        calle: order.addresses.calle,
        numero: order.addresses.numero,
        colonia: order.addresses.colonia,
        ciudad: order.addresses.ciudad,
        estado: order.addresses.estado,
        codigo_postal: order.addresses.codigo_postal
      } : null,
      tracking: order.shippings?.[0] ? {
        carrier: order.shippings[0].carrier,
        numero: order.shippings[0].tracking,
        url: order.shippings[0].tracking_url,
        fecha_envio: order.shippings[0].fecha_envio
      } : null
    };

    return res.status(200).json(formattedOrder);

  } catch (error) {
    console.error('Error in get order:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
