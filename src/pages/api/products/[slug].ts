import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Slug es requerido' });
      }

      // Intentar obtener el producto de Supabase
      const { data: product, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          provider:providers(*),
          images:product_images(*)
        `)
        .eq('slug', slug)
        .eq('visible', true)
        .eq('approved', true)
        .single();

      if (error) {
        console.error('Error fetching product from database, using mock data:', error);

        // Fallback a mock data
        const mockProduct = mockProducts.find(p => p.slug === slug);

        if (mockProduct) {
          return res.status(200).json({ product: mockProduct });
        }

        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      if (!product) {
        // Intentar con mock data
        const mockProduct = mockProducts.find(p => p.slug === slug);

        if (mockProduct) {
          return res.status(200).json({ product: mockProduct });
        }

        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      return res.status(200).json({ product });
    } catch (error) {
      console.error('Error en el servidor, using mock data:', error);

      // Fallback final a mock data
      const { slug } = req.query;
      if (typeof slug === 'string') {
        const mockProduct = mockProducts.find(p => p.slug === slug);

        if (mockProduct) {
          return res.status(200).json({ product: mockProduct });
        }
      }

      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
