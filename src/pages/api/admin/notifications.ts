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

    // Contar proveedores pendientes
    const { data: providers, error: providersError } = await supabase
      .from('providers')
      .select('id')
      .eq('active', false);

    if (providersError) {
      console.error('Error fetching pending providers:', providersError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Contar productos pendientes
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id')
      .eq('approved', false);

    if (productsError) {
      console.error('Error fetching pending products:', productsError);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({
      pendingProviders: providers?.length || 0,
      pendingProducts: products?.length || 0,
      total: (providers?.length || 0) + (products?.length || 0)
    });
  } catch (error) {
    console.error('Unexpected error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}