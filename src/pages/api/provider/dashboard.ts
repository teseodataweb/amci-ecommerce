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

    // Obtener información del proveedor
    const { data: provider, error: providerError } = await supabase
      .from('providers')
      .select('*')
      .eq('user_id', userId as string)
      .single();

    if (providerError || !provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    // Obtener productos del proveedor
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name),
        images:product_images(url, alt)
      `)
      .eq('provider_id', provider.id);

    if (productsError) {
      console.error('Error fetching provider products:', productsError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Obtener órdenes que incluyen productos del proveedor
    const { data: orders, error: ordersError } = await supabase
      .from('order_items')
      .select(`
        order_id,
        qty,
        precio_unit,
        subtotal,
        product:products!order_items_product_id_fkey(id, nombre),
        order:orders!order_items_order_id_fkey(
          id,
          total,
          estado,
          created_at,
          cliente:users!orders_cliente_id_fkey(name, email)
        )
      `)
      .in('product_id', products?.map(p => p.id) || []);

    if (ordersError) {
      console.error('Error fetching provider orders:', ordersError);
    }

    // Calcular estadísticas
    const totalProducts = products?.length || 0;
    const activeProducts = products?.filter(p => p.approved && p.visible).length || 0;
    const pendingProducts = products?.filter(p => !p.approved).length || 0;

    const uniqueOrders = new Map();
    orders?.forEach((item: any) => {
      if (item.order && !uniqueOrders.has(item.order.id)) {
        uniqueOrders.set(item.order.id, item.order);
      }
    });

    const totalOrders = uniqueOrders.size;
    const totalSales = Array.from(uniqueOrders.values()).reduce((sum: number, order: any) => sum + parseFloat(order.total || '0'), 0);

    // Formatear productos
    const formattedProducts = products?.map(product => ({
      id: product.id,
      nombre: product.nombre,
      categoria: product.category?.name || 'Sin categoría',
      precio: product.precio,
      pricing_mode: product.pricing_mode,
      approved: product.approved,
      visible: product.visible,
      stock: product.stock,
      imagen: product.images?.[0]?.url || '/img/placeholder-product.jpg',
      created_at: product.created_at
    }));

    // Formatear órdenes
    const formattedOrders = Array.from(uniqueOrders.values()).map((order: any) => ({
      id: order.id.substring(0, 8).toUpperCase(),
      cliente_nombre: order.cliente?.name || 'Cliente sin nombre',
      cliente_email: order.cliente?.email || '',
      total: order.total,
      estado: order.estado,
      created_at: order.created_at
    }));

    res.status(200).json({
      provider: {
        id: provider.id,
        razon_social: provider.razon_social,
        rfc: provider.rfc,
        active: provider.active
      },
      stats: {
        totalProducts,
        activeProducts,
        pendingProducts,
        totalOrders,
        totalSales
      },
      products: formattedProducts || [],
      orders: formattedOrders || []
    });
  } catch (error) {
    console.error('Unexpected error fetching provider dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}