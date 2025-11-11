import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { mockProviders } from '@/lib/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data: providers, error } = await supabase
        .from('providers')
        .select('id, nombre_comercial, razon_social')
        .order('nombre_comercial');

      if (error) throw error;

      return res.status(200).json({ providers: providers || [] });
    } catch (error) {
      console.error('Error fetching providers from database, using mock data:', error);

      // Fallback to mock data when database connection fails
      return res.status(200).json({ providers: mockProviders });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
