import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== CREATE ORDER API CALLED ===');
  console.log('Method:', req.method);
  console.log('Body received:', JSON.stringify(req.body, null, 2));

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = supabaseAdmin();

  try {
    const {
      userId,
      items,
      shippingAddress,
      billingInfo,
      subtotal,
      shipping,
      tax,
      total,
      paymentIntentId
    } = req.body;

    console.log('Parsed data:');
    console.log('- userId:', userId);
    console.log('- items count:', items?.length);
    console.log('- total:', total);
    console.log('- paymentIntentId:', paymentIntentId);

    // Verificar que el usuario existe
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Crear o actualizar dirección
    let addressId = null;
    if (shippingAddress) {
      const { data: address, error: addressError } = await supabase
        .from('addresses')
        .upsert({
          user_id: userId,
          nombre: shippingAddress.nombre,
          calle: shippingAddress.calle,
          numero: shippingAddress.numero || '',
          colonia: shippingAddress.colonia || '',
          ciudad: shippingAddress.ciudad,
          estado: shippingAddress.estado,
          codigo_postal: shippingAddress.codigoPostal,
          referencias: shippingAddress.referencias || '',
          is_default: true
        })
        .select()
        .single();

      if (!addressError && address) {
        addressId = address.id;
      }
    }

    // Calcular resumen de emisores de factura
    const emisorFacturaResumen = items.reduce((acc: any, item: any) => {
      const emisor = item.product?.emisor_factura || 'AMCI';
      if (!acc[emisor]) {
        acc[emisor] = {
          count: 0,
          items: []
        };
      }
      acc[emisor].count++;
      acc[emisor].items.push(item.product_id);
      return acc;
    }, {});

    // Crear orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        cliente_id: userId,
        address_id: addressId,
        total: total,
        subtotal: subtotal,
        envio: shipping,
        impuestos: tax,
        estado: 'RECIBIDO',
        payment_id: paymentIntentId || null,
        payment_status: paymentIntentId ? 'paid' : 'pending',
        emisor_factura_resumen: emisorFacturaResumen,
        notes: billingInfo?.notes || ''
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Error creating order:', orderError);
      return res.status(500).json({ error: 'Error al crear la orden' });
    }

    // Crear items de la orden
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      qty: item.quantity,
      precio_unit: item.product?.precio || 0,
      subtotal: (item.product?.precio || 0) * item.quantity,
      variant_data: item.variant_data,
      bundle_data: item.bundle_data
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Aún así devolvemos la orden creada
    }

    // Crear historial de estado
    await supabase
      .from('order_status_history')
      .insert({
        order_id: order.id,
        estado: 'RECIBIDO',
        reason: 'Orden creada',
        user_id: userId
      });

    // Decrementar stock de productos
    for (const item of items) {
      // Primero obtener el stock actual
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();

      if (product && product.stock >= item.quantity) {
        const newStock = product.stock - item.quantity;
        const { error: stockError } = await supabase
          .from('products')
          .update({
            stock: newStock
          })
          .eq('id', item.product_id);

        if (stockError) {
          console.error('Error updating stock:', stockError);
        }
      }
    }

    // Limpiar el carrito del usuario
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    console.log('Order created successfully!');
    console.log('Order ID:', order.id);
    console.log('Order Number:', order.id.slice(0, 8).toUpperCase());

    const response = {
      success: true,
      orderId: order.id,
      orderNumber: order.id.slice(0, 8).toUpperCase()
    };

    console.log('Sending response:', response);
    console.log('=== CREATE ORDER API COMPLETED ===');

    return res.status(200).json(response);

  } catch (error) {
    console.error('=== ERROR IN CREATE ORDER API ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}