import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return res.status(200).json({ categories: categories || [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}