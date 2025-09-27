import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
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

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            nombre,
            images:product_images(url, alt)
          )
        ),
        addresses (*)
      `)
      .eq('cliente_id', userId as string)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      return res.status(500).json({ error: 'Database error', details: ordersError.message });
    }

    const formattedOrders = orders?.map(order => ({
      id: order.id,
      numero_orden: order.id.substring(0, 8).toUpperCase(),
      fecha: order.created_at,
      total: order.total,
      subtotal: order.subtotal,
      envio: order.envio,
      impuestos: order.impuestos,
      estado: order.estado,
      items_count: order.order_items?.length || 0,
      items: order.order_items?.map((item: any) => ({
        id: item.id,
        product_name: item.products?.nombre || 'Producto sin nombre',
        quantity: item.qty,
        precio_unit: item.precio_unit,
        subtotal: item.subtotal,
        image: item.products?.images?.[0]?.url || null
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
      payment_status: order.payment_status
    })) || [];

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error('Unexpected error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}