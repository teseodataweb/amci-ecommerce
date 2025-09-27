import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Crear cliente Supabase con service role para operaciones seguras en servidor
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

    console.log('API: Fetching user profile for ID:', id);

    // Obtener usuario
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id as string)
      .maybeSingle(); // Usar maybeSingle para evitar error 406

    if (userError) {
      console.error('API: Error fetching user:', userError);
      return res.status(500).json({ error: 'Database error', details: userError.message });
    }

    if (!user) {
      console.log('API: User not found, creating basic profile');
      // Si el usuario no existe en la tabla users, crear un perfil básico
      const basicProfile = {
        id: id as string,
        email: 'unknown@example.com', // Se actualizará en el contexto
        name: '',
        phone: '',
        role: 'CLIENTE' as const,
        providerId: null,
        providerData: null,
      };
      return res.status(200).json(basicProfile);
    }

    console.log('API: User found:', user.email, 'Role:', user.role);

    // Si es proveedor, obtener datos adicionales
    let providerData = null;
    if (user.role === 'PROVEEDOR') {
      console.log('API: Fetching provider data for user');
      const { data: provider, error: providerError } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', id as string)
        .maybeSingle();

      if (providerError) {
        console.error('API: Error fetching provider:', providerError);
        // No fallar por esto, solo log el error
      } else if (provider) {
        console.log('API: Provider data found');
        providerData = {
          id: provider.id,
          razonSocial: provider.razon_social,
          rfc: provider.rfc,
          active: provider.active,
        };
      } else {
        console.log('API: No provider data found');
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

    console.log('API: Returning profile for user:', profile.email, 'Role:', profile.role);
    res.status(200).json(profile);
  } catch (error) {
    console.error('API: Unexpected error fetching user profile:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}