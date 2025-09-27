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
      const { status } = req.query;

      let query = supabase
        .from('providers')
        .select(`
          *,
          user:users!providers_user_id_fkey (
            email,
            name,
            phone,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      // Filtrar por estado si se proporciona
      if (status === 'pending') {
        query = query.eq('active', false);
      } else if (status === 'active') {
        query = query.eq('active', true);
      }

      const { data: providers, error } = await query;

      if (error) {
        console.error('Error fetching providers:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      const formattedProviders = providers?.map(provider => ({
        id: provider.id,
        user_id: provider.user_id,
        razon_social: provider.razon_social,
        rfc: provider.rfc,
        email: provider.user?.email,
        name: provider.user?.name,
        phone: provider.user?.phone,
        contacto_operativo: provider.contacto_operativo,
        contacto_facturacion: provider.contacto_facturacion,
        clabe: provider.clabe,
        emisor_factura_default: provider.emisor_factura_default,
        active: provider.active,
        created_at: provider.created_at
      }));

      return res.status(200).json({ providers: formattedProviders || [] });
    } catch (error) {
      console.error('Unexpected error fetching providers:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { providerId, action } = req.body;

      if (!providerId || !action) {
        return res.status(400).json({ error: 'providerId and action are required' });
      }

      let updateData: any = {};

      if (action === 'approve') {
        updateData = { active: true };
      } else if (action === 'reject') {
        updateData = { active: false };
      } else {
        return res.status(400).json({ error: 'Invalid action' });
      }

      const { data, error } = await supabase
        .from('providers')
        .update(updateData)
        .eq('id', providerId)
        .select()
        .single();

      if (error) {
        console.error('Error updating provider:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      return res.status(200).json({ success: true, provider: data });
    } catch (error) {
      console.error('Unexpected error updating provider:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}