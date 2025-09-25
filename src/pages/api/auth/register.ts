import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, email, name, phone, role, providerData } = req.body;

  try {
    const supabase = supabaseAdmin();

    // Crear usuario en la tabla users
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        name,
        phone,
        role: role || 'CLIENTE',
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return res.status(400).json({ error: userError.message });
    }

    // Si es proveedor, crear registro de proveedor
    if (role === 'PROVEEDOR' && providerData) {
      const { error: providerError } = await supabase
        .from('providers')
        .insert({
          user_id: userId,
          razon_social: providerData.razonSocial,
          rfc: providerData.rfc,
          contacto_operativo: providerData.contactoOperativo,
          contacto_facturacion: providerData.contactoFacturacion,
          clabe: providerData.clabe,
          emisor_factura_default: providerData.emisorFacturaDefault,
          active: false, // Requiere aprobación de admin
        });

      if (providerError) {
        console.error('Error creating provider:', providerError);
        // Si falla crear el proveedor, eliminar el usuario
        await supabase.from('users').delete().eq('id', userId);
        return res.status(400).json({ error: 'Error al crear el proveedor: ' + providerError.message });
      }
    }

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}