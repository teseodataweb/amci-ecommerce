import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { category, search, pricing_mode } = req.query;
      
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          provider:providers(*),
          images:product_images(*)
        `)
        .eq('visible', true)
        .eq('approved', true);

      // Filtrar por categoría
      if (category && category !== 'all') {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      // Filtrar por búsqueda
      if (search) {
        query = query.ilike('nombre', `%${search}%`);
      }

      // Filtrar por modo de precio
      if (pricing_mode) {
        query = query.eq('pricing_mode', pricing_mode);
      }

      const { data: products, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      return res.status(200).json({ products: products || [] });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}