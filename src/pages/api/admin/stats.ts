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

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('total, estado');

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, approved, visible');

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('role');

    if (ordersError || productsError || usersError) {
      console.error('Error fetching stats:', { ordersError, productsError, usersError });
      return res.status(500).json({ error: 'Database error' });
    }

    const stats = {
      totalOrders: orders?.length || 0,
      totalSales: orders?.reduce((sum, order) => sum + parseFloat(order.total || '0'), 0) || 0,
      pendingProducts: products?.filter(p => !p.approved).length || 0,
      activeProducts: products?.filter(p => p.approved && p.visible).length || 0,
      totalProducts: products?.length || 0,
      totalClients: users?.filter(u => u.role === 'CLIENTE').length || 0,
      totalProviders: users?.filter(u => u.role === 'PROVEEDOR').length || 0
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Unexpected error fetching admin stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}