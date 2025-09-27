import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        cliente:users!orders_cliente_id_fkey (
          name,
          email
        ),
        order_items (
          *,
          product:products (
            nombre,
            provider:providers (
              razon_social
            )
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Database error', details: error.message });
    }

    const formattedOrders = orders?.map(order => {
      const items = order.order_items || [];
      const providerSet = new Set(items.map((item: any) => item.product?.provider?.razon_social).filter(Boolean));
      const mainProvider = providerSet.size > 0 ? Array.from(providerSet)[0] : 'Sin proveedor';

      return {
        id: order.id,
        numero_orden: order.id.substring(0, 8).toUpperCase(),
        cliente_nombre: order.cliente?.name || 'Cliente sin nombre',
        cliente_email: order.cliente?.email || '',
        proveedor: mainProvider,
        total: order.total,
        estado: order.estado,
        created_at: order.created_at,
        productos: items.map((item: any) => item.product?.nombre || 'Producto sin nombre')
      };
    });

    res.status(200).json({ orders: formattedOrders || [] });
  } catch (error) {
    console.error('Unexpected error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}