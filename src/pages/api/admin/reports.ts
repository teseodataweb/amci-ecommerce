import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, startDate, endDate } = req.query;

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

    // Reporte de ventas por proveedor
    if (type === 'sales-by-provider') {
      const { data: orderItems, error } = await supabase
        .from('order_items')
        .select(`
          subtotal,
          product:products!order_items_product_id_fkey(
            provider:providers(id, razon_social)
          ),
          order:orders!order_items_order_id_fkey(created_at, estado)
        `);

      if (error) {
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      // Agrupar por proveedor
      const providerSales = new Map();
      orderItems?.forEach((item: any) => {
        const providerId = item.product?.provider?.id;
        const providerName = item.product?.provider?.razon_social || 'Sin proveedor';

        if (providerId) {
          if (!providerSales.has(providerId)) {
            providerSales.set(providerId, {
              provider_id: providerId,
              razon_social: providerName,
              total_ventas: 0,
              total_ordenes: new Set()
            });
          }

          const stats = providerSales.get(providerId);
          stats.total_ventas += parseFloat(item.subtotal || '0');
          if (item.order) {
            stats.total_ordenes.add(item.order.id);
          }
        }
      });

      const salesReport = Array.from(providerSales.values()).map(stats => ({
        provider_id: stats.provider_id,
        razon_social: stats.razon_social,
        total_ventas: stats.total_ventas,
        total_ordenes: stats.total_ordenes.size
      })).sort((a, b) => b.total_ventas - a.total_ventas);

      return res.status(200).json({ report: salesReport });
    }

    // Reporte de productos más vendidos
    if (type === 'top-products') {
      const { data: orderItems, error } = await supabase
        .from('order_items')
        .select(`
          qty,
          subtotal,
          product:products!order_items_product_id_fkey(
            id,
            nombre,
            provider:providers(razon_social)
          )
        `);

      if (error) {
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      // Agrupar por producto
      const productSales = new Map();
      orderItems?.forEach((item: any) => {
        const productId = item.product?.id;
        const productName = item.product?.nombre || 'Producto sin nombre';

        if (productId) {
          if (!productSales.has(productId)) {
            productSales.set(productId, {
              product_id: productId,
              nombre: productName,
              proveedor: item.product?.provider?.razon_social || 'Sin proveedor',
              cantidad_vendida: 0,
              total_ventas: 0
            });
          }

          const stats = productSales.get(productId);
          stats.cantidad_vendida += item.qty;
          stats.total_ventas += parseFloat(item.subtotal || '0');
        }
      });

      const topProducts = Array.from(productSales.values())
        .sort((a, b) => b.cantidad_vendida - a.cantidad_vendida)
        .slice(0, 10);

      return res.status(200).json({ report: topProducts });
    }

    // Reporte de comisiones
    if (type === 'commissions') {
      const { data: settings, error: settingsError } = await supabase
        .from('settings')
        .select('amci_commission_percent')
        .single();

      if (settingsError) {
        return res.status(500).json({ error: 'Error loading settings' });
      }

      const commissionPercent = settings?.amci_commission_percent || 10;

      const { data: orderItems, error } = await supabase
        .from('order_items')
        .select(`
          subtotal,
          product:products!order_items_product_id_fkey(
            provider:providers(id, razon_social)
          ),
          order:orders!order_items_order_id_fkey(estado)
        `);

      if (error) {
        return res.status(500).json({ error: 'Database error', details: error.message });
      }

      // Calcular comisiones por proveedor (solo órdenes completadas)
      const commissions = new Map();
      orderItems?.forEach((item: any) => {
        const providerId = item.product?.provider?.id;
        const providerName = item.product?.provider?.razon_social || 'Sin proveedor';
        const orderStatus = item.order?.estado;

        // Solo contar órdenes entregadas o cerradas
        if (providerId && (orderStatus === 'ENTREGADO' || orderStatus === 'CERRADO')) {
          if (!commissions.has(providerId)) {
            commissions.set(providerId, {
              provider_id: providerId,
              razon_social: providerName,
              total_ventas: 0,
              comision_amci: 0,
              neto_proveedor: 0
            });
          }

          const stats = commissions.get(providerId);
          const subtotal = parseFloat(item.subtotal || '0');
          const commission = subtotal * (commissionPercent / 100);

          stats.total_ventas += subtotal;
          stats.comision_amci += commission;
          stats.neto_proveedor += subtotal - commission;
        }
      });

      const commissionsReport = Array.from(commissions.values())
        .sort((a, b) => b.total_ventas - a.total_ventas);

      return res.status(200).json({
        report: commissionsReport,
        commission_percent: commissionPercent
      });
    }

    return res.status(400).json({ error: 'Invalid report type' });
  } catch (error) {
    console.error('Unexpected error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}