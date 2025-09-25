import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = supabaseAdmin();

    // Obtener usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id as string)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Si es proveedor, obtener datos adicionales
    let providerData = null;
    if (user.role === 'PROVEEDOR') {
      const { data: provider } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', id as string)
        .single();

      if (provider) {
        providerData = {
          id: provider.id,
          razonSocial: provider.razon_social,
          rfc: provider.rfc,
          active: provider.active,
        };
      }
    }

    // Formatear respuesta
    const profile = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      providerId: providerData?.id,
      providerData: providerData,
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
}