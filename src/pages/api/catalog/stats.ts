import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { mockStats } from '@/lib/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Get total products count (only visible and approved)
    const { count: totalProducts, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('visible', true)
      .eq('approved', true);

    if (productsError) {
      console.error('Error fetching products count:', productsError);
      throw productsError;
    }

    // Get total providers count (only active providers with visible products)
    const { data: providersData, error: providersError } = await supabase
      .from('products')
      .select('provider_id')
      .eq('visible', true)
      .eq('approved', true);

    if (providersError) {
      console.error('Error fetching providers:', providersError);
      throw providersError;
    }

    // Count unique providers
    const uniqueProviders = new Set(providersData?.map(p => p.provider_id) || []);
    const totalProviders = uniqueProviders.size;

    // Get total categories count (only categories with visible products)
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('products')
      .select('category_id')
      .eq('visible', true)
      .eq('approved', true);

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw categoriesError;
    }

    // Count unique categories
    const uniqueCategories = new Set(categoriesData?.map(c => c.category_id) || []);
    const totalCategories = uniqueCategories.size;

    return res.status(200).json({
      stats: {
        totalProducts: totalProducts || 0,
        totalProviders: totalProviders || 0,
        totalCategories: totalCategories || 0
      }
    });
  } catch (error) {
    console.error('Error fetching catalog stats from database, using mock data:', error);

    // Fallback to mock stats when database connection fails
    return res.status(200).json({
      stats: mockStats
    });
  }
}
