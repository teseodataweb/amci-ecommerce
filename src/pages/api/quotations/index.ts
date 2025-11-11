import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * API: Listar cotizaciones
 * GET /api/quotations?userId=xxx&role=CLIENTE|PROVEEDOR
 *
 * Lista cotizaciones según el rol:
 * - CLIENTE: sus propias cotizaciones
 * - PROVEEDOR: cotizaciones de sus productos
 * - ADMIN: todas las cotizaciones
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

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

  try {
    const { userId, role, status, providerId } = req.query;

    if (!userId || !role) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos',
        required: ['userId', 'role']
      });
    }

    let query = supabase
      .from('quotations')
      .select(`
        id,
        status,
        presupuesto,
        valido_hasta,
        datos_servicio,
        notas_cliente,
        notas_proveedor,
        created_at,
        updated_at,
        respondida_at,
        aceptada_at,
        product:products (
          id,
          nombre,
          slug,
          emisor_factura,
          provider:providers (
            id,
            razon_social,
            contacto_operativo
          ),
          images:product_images (
            url,
            alt
          )
        ),
        cliente:users (
          id,
          name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false });

    // Filtrar según el rol
    switch (role) {
      case 'CLIENTE':
        // Clientes solo ven sus cotizaciones
        query = query.eq('cliente_id', userId);
        break;

      case 'PROVEEDOR':
        // Proveedores ven cotizaciones de sus productos
        if (!providerId) {
          // Obtener el providerId del userId
          const { data: provider, error: providerError } = await supabase
            .from('providers')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (providerError || !provider) {
            return res.status(404).json({
              error: 'Proveedor no encontrado'
            });
          }

          // Filtrar por productos del proveedor
          const { data: products } = await supabase
            .from('products')
            .select('id')
            .eq('provider_id', provider.id);

          if (products && products.length > 0) {
            const productIds = products.map(p => p.id);
            query = query.in('product_id', productIds);
          } else {
            // El proveedor no tiene productos
            return res.status(200).json({ quotations: [] });
          }
        }
        break;

      case 'ADMIN':
        // Admins ven todas
        break;

      default:
        return res.status(400).json({
          error: 'Rol inválido',
          allowedRoles: ['CLIENTE', 'PROVEEDOR', 'ADMIN']
        });
    }

    // Filtrar por estado si se especifica
    if (status) {
      query = query.eq('status', status);
    }

    const { data: quotations, error: quotationsError } = await query;

    if (quotationsError) {
      console.error('Error fetching quotations:', quotationsError);
      return res.status(500).json({
        error: 'Error al obtener cotizaciones',
        details: quotationsError.message
      });
    }

    // Formatear las cotizaciones para la respuesta
    const formattedQuotations = quotations?.map(q => {
      // Extraer relaciones (Supabase retorna arrays para relaciones)
      const product = Array.isArray(q.product) ? q.product[0] : q.product;
      const provider = Array.isArray(product?.provider) ? product.provider[0] : product?.provider;
      const images = Array.isArray(product?.images) ? product.images : [];
      const cliente = Array.isArray(q.cliente) ? q.cliente[0] : q.cliente;

      return {
        id: q.id,
        status: q.status,
        presupuesto: q.presupuesto,
        validoHasta: q.valido_hasta,
        createdAt: q.created_at,
        respondidaAt: q.respondida_at,
        aceptadaAt: q.aceptada_at,

        // Datos del producto/servicio
        producto: {
          id: product?.id,
          nombre: product?.nombre,
          slug: product?.slug,
          imagen: images?.[0]?.url || null,
          proveedor: provider?.razon_social,
          emisorFactura: product?.emisor_factura
        },

        // Datos del servicio solicitado
        servicio: q.datos_servicio,

        // Datos del cliente (solo visible para proveedor/admin)
        cliente: role !== 'CLIENTE' ? {
          id: cliente?.id,
          nombre: cliente?.name,
          email: cliente?.email,
          telefono: cliente?.phone
        } : undefined,

        // Notas
        notasCliente: q.notas_cliente,
        notasProveedor: role !== 'CLIENTE' || q.status !== 'SOLICITADA'
          ? q.notas_proveedor
          : undefined,

        // Indicadores de estado
        estaVencida: q.valido_hasta
          ? new Date(q.valido_hasta) < new Date()
          : false,
        puedeAceptar: q.status === 'PRESUPUESTADA'
          && (!q.valido_hasta || new Date(q.valido_hasta) >= new Date()),
        puedeResponder: q.status === 'SOLICITADA' && role === 'PROVEEDOR'
      };
    }) || [];

    // Estadísticas
    const stats = {
      total: formattedQuotations.length,
      solicitadas: formattedQuotations.filter(q => q.status === 'SOLICITADA').length,
      presupuestadas: formattedQuotations.filter(q => q.status === 'PRESUPUESTADA').length,
      aceptadas: formattedQuotations.filter(q => q.status === 'ACEPTADA').length,
      rechazadas: formattedQuotations.filter(q => q.status === 'RECHAZADA').length,
      vencidas: formattedQuotations.filter(q => q.estaVencida).length
    };

    return res.status(200).json({
      quotations: formattedQuotations,
      stats
    });

  } catch (error: any) {
    console.error('Error in quotations listing:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
