import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { mockCategories } from '@/lib/mockData';

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
      console.error('Error fetching categories from database, using mock data:', error);

      // Fallback to mock data when database connection fails
      return res.status(200).json({ categories: mockCategories });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}