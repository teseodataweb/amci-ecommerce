import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Test 1: Simple query
    console.log('Attempting simple query...');
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
        details: error,
        env_check: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      });
    }

    console.log('Query successful:', data);

    return res.status(200).json({
      success: true,
      message: 'Connection successful',
      data,
      env_check: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
  } catch (error: any) {
    console.error('Caught error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      env_check: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
  }
}
