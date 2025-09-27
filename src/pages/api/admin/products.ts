import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  if (req.method === 'GET') {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          provider:providers (
            id,
            razon_social
          ),
          category:categories (
            name
          ),
          images:product_images (
            url,
            alt
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      const formattedProducts = products?.map(product => ({
        id: product.id,
        nombre: product.nombre,
        categoria: product.category?.name || 'Sin categoría',
        proveedor: product.provider?.razon_social || 'Sin proveedor',
        precio: product.precio,
        precio_modo: product.pricing_mode?.toLowerCase(),
        estado: product.approved ? (product.visible ? 'aprobado' : 'pausado') : 'pendiente',
        imagen: product.images?.[0]?.url || '/img/placeholder-product.jpg',
        created_at: product.created_at,
        descripcion: product.descripcion || ''
      }));

      return res.status(200).json({ products: formattedProducts || [] });
    } catch (error) {
      console.error('Unexpected error fetching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { productId, action } = req.body;

      if (!productId || !action) {
        return res.status(400).json({ error: 'productId and action are required' });
      }

      let updateData: any = {};

      switch (action) {
        case 'approve':
          updateData = { approved: true, visible: true };
          break;
        case 'pause':
          updateData = { visible: false };
          break;
        case 'reject':
          updateData = { approved: false, visible: false };
          break;
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', productId)
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      return res.status(200).json({ success: true, product: data });
    } catch (error) {
      console.error('Unexpected error updating product:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}