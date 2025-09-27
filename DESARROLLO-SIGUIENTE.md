# 🚀 GUÍA DE DESARROLLO - PRÓXIMOS PASOS

**Documento técnico para desarrolladores**
**Última actualización:** 26 de Septiembre, 2025

---

## 🎯 TAREA PRIORITARIA #1: Completar Flujo de Checkout

### 📋 Descripción del Problema

Actualmente el checkout:
1. ✅ Procesa el pago con Stripe
2. ✅ Crea el Payment Intent
3. ❌ **NO guarda la orden en la base de datos**
4. ❌ **NO vacía el carrito**
5. ❌ **NO redirige a confirmación**

### 🔧 Solución Técnica

#### PASO 1: Crear API para guardar órdenes

**Archivo:** `src/pages/api/orders/create.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, cartItems, shippingAddress, paymentIntentId, totals } = req.body;

  // Validaciones
  if (!userId || !cartItems || !shippingAddress || !paymentIntentId) {
    return res.status(400).json({ error: 'Missing required fields' });
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

    // 1. Crear dirección de envío (si no existe)
    const { data: address, error: addressError } = await supabase
      .from('addresses')
      .insert({
        user_id: userId,
        nombre: shippingAddress.nombre,
        calle: shippingAddress.calle,
        numero: shippingAddress.numero,
        colonia: shippingAddress.colonia,
        ciudad: shippingAddress.ciudad,
        estado: shippingAddress.estado,
        codigo_postal: shippingAddress.codigo_postal,
        referencias: shippingAddress.referencias || null
      })
      .select()
      .single();

    if (addressError) {
      console.error('Error creating address:', addressError);
      return res.status(500).json({ error: 'Error creating address' });
    }

    // 2. Crear orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        cliente_id: userId,
        address_id: address.id,
        subtotal: totals.subtotal,
        envio: totals.shipping,
        impuestos: totals.tax,
        total: totals.total,
        estado: 'RECIBIDO',
        payment_id: paymentIntentId,
        payment_status: 'paid'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return res.status(500).json({ error: 'Error creating order' });
    }

    // 3. Crear order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      qty: item.quantity,
      precio_unit: item.price,
      subtotal: item.price * item.quantity,
      variant_data: item.variant || null,
      bundle_data: item.bundle || null
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      return res.status(500).json({ error: 'Error creating order items' });
    }

    // 4. Actualizar stock de productos
    for (const item of cartItems) {
      await supabase.rpc('decrement_product_stock', {
        product_id: item.productId,
        quantity: item.quantity
      });
    }

    // 5. Vaciar carrito del usuario
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    // 6. Crear registro en tabla payments
    await supabase
      .from('payments')
      .insert({
        order_id: order.id,
        pasarela: 'STRIPE',
        status: 'succeeded',
        payload_json: { payment_intent_id: paymentIntentId },
        amount: totals.total
      });

    return res.status(200).json({
      success: true,
      orderId: order.id,
      orderNumber: order.id.substring(0, 8).toUpperCase()
    });

  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### PASO 2: Crear función SQL para decrementar stock

**Ejecutar en Supabase SQL Editor:**

```sql
-- Función para decrementar stock de producto
CREATE OR REPLACE FUNCTION decrement_product_stock(
  product_id UUID,
  quantity INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock = GREATEST(stock - quantity, 0)
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;
```

#### PASO 3: Modificar checkout.tsx

**Archivo:** `src/pages/checkout.tsx` (línea ~90-140)

Reemplazar la sección después de `confirmPayment`:

```typescript
const { error, paymentIntent } = await stripe.confirmPayment({
  elements,
  redirect: 'if_required'
});

if (error) {
  setError(error.message || 'Error al procesar el pago');
  setProcessing(false);
  return;
}

if (paymentIntent && paymentIntent.status === 'succeeded') {
  setProcessing(true);

  try {
    // NUEVO: Guardar orden en base de datos
    const orderResponse = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        cartItems: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant || null,
          bundle: item.bundle || null
        })),
        shippingAddress: {
          nombre: formData.nombre,
          calle: formData.calle,
          numero: formData.numero,
          colonia: formData.colonia,
          ciudad: formData.ciudad,
          estado: formData.estado,
          codigo_postal: formData.codigoPostal,
          referencias: formData.referencias
        },
        paymentIntentId: paymentIntent.id,
        totals: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          tax: calculateTax(),
          total: calculateTotal()
        }
      })
    });

    if (!orderResponse.ok) {
      throw new Error('Error al crear la orden');
    }

    const orderData = await orderResponse.json();

    // Limpiar carrito local
    clearCart();

    // Redireccionar a página de confirmación
    router.push(`/orden/${orderData.orderId}?success=true`);

  } catch (error) {
    console.error('Error creating order:', error);
    setError('El pago fue exitoso pero hubo un error al crear la orden. Contacta a soporte.');
    setProcessing(false);
  }
}
```

#### PASO 4: Crear página de confirmación

**Archivo:** `src/pages/orden/[id].tsx` (NUEVO)

```typescript
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/layout/banner/Banner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

interface OrderDetails {
  id: string;
  numero_orden: string;
  fecha: string;
  total: number;
  subtotal: number;
  envio: number;
  impuestos: number;
  estado: string;
  items: Array<{
    product_name: string;
    quantity: number;
    precio_unit: number;
    subtotal: number;
    image: string;
  }>;
  direccion: {
    nombre: string;
    calle: string;
    numero: string;
    colonia: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
  };
}

const OrdenDetalle = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const isSuccess = router.query.success === 'true';

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !id) return;

      try {
        const response = await fetch(`/api/orders/${id}?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, id]);

  if (loading) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <div className="container py-5 text-center">
            <div className="spinner-border text-primary" />
            <p className="mt-3">Cargando orden...</p>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <div className="container py-5 text-center">
            <h3>Orden no encontrada</h3>
            <Link href="/ordenes" className="btn btn-primary mt-3">
              Ver mis órdenes
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <Layout header={1} footer={1}>
        {isSuccess && (
          <Banner
            title="¡Pago Exitoso!"
            subtitle={`Orden #${order.numero_orden}`}
            bg="bg-success"
          />
        )}

        <section className="order-detail pt-120 pb-120">
          <div className="container">
            {/* Mensaje de éxito */}
            {isSuccess && (
              <div className="alert alert-success mb-5" role="alert">
                <i className="fal fa-check-circle fa-2x mb-3"></i>
                <h4>¡Tu compra fue exitosa!</h4>
                <p className="mb-0">
                  Recibirás un email de confirmación con los detalles de tu orden.
                </p>
              </div>
            )}

            {/* Detalles de la orden */}
            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h4 className="mb-0">Orden #{order.numero_orden}</h4>
                    <small className="text-muted">
                      {new Date(order.fecha).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </div>
                  <div className="card-body">
                    <span className={`badge bg-${order.estado === 'RECIBIDO' ? 'info' : 'success'} mb-3`}>
                      {order.estado}
                    </span>

                    <h5 className="mb-3">Productos</h5>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.product_name}</td>
                              <td>{item.quantity}</td>
                              <td>${item.precio_unit.toLocaleString('es-MX')}</td>
                              <td>${item.subtotal.toLocaleString('es-MX')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Dirección de envío */}
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Dirección de Envío</h5>
                  </div>
                  <div className="card-body">
                    <p className="mb-1"><strong>{order.direccion.nombre}</strong></p>
                    <p className="mb-1">
                      {order.direccion.calle} {order.direccion.numero}
                    </p>
                    <p className="mb-1">
                      {order.direccion.colonia}, {order.direccion.ciudad}
                    </p>
                    <p className="mb-0">
                      {order.direccion.estado} - CP {order.direccion.codigo_postal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resumen */}
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Resumen de Orden</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toLocaleString('es-MX')}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío:</span>
                      <span>${order.envio.toLocaleString('es-MX')}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Impuestos:</span>
                      <span>${order.impuestos.toLocaleString('es-MX')}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong className="text-primary">
                        ${order.total.toLocaleString('es-MX')} MXN
                      </strong>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link href="/ordenes" className="btn btn-outline-primary w-100">
                      Ver todas mis órdenes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default OrdenDetalle;
```

#### PASO 5: Crear API para obtener orden individual

**Archivo:** `src/pages/api/orders/[id].ts` (NUEVO)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { userId } = req.query;

  if (!id || !userId) {
    return res.status(400).json({ error: 'Missing parameters' });
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

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (nombre, images:product_images(url))
        ),
        addresses (*)
      `)
      .eq('id', id as string)
      .eq('cliente_id', userId as string)
      .single();

    if (error || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const formattedOrder = {
      id: order.id,
      numero_orden: order.id.substring(0, 8).toUpperCase(),
      fecha: order.created_at,
      total: order.total,
      subtotal: order.subtotal,
      envio: order.envio,
      impuestos: order.impuestos,
      estado: order.estado,
      items: order.order_items.map((item: any) => ({
        product_name: item.products?.nombre || 'Producto',
        quantity: item.qty,
        precio_unit: item.precio_unit,
        subtotal: item.subtotal,
        image: item.products?.images?.[0]?.url || null
      })),
      direccion: order.addresses
    };

    res.status(200).json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## 🎯 TAREA PRIORITARIA #2: Sistema de Tracking

### 📋 Descripción

Permitir al proveedor registrar información de envío (paquetería, guía) y actualizar el estado de la orden.

### 🔧 Implementación

**Archivo:** `src/pages/api/provider/shipping.ts` (NUEVO)

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, providerId, carrier, tracking, tracking_url } = req.body;

  if (!orderId || !providerId || !carrier || !tracking) {
    return res.status(400).json({ error: 'Missing required fields' });
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

    // 1. Crear registro de envío
    const { data: shipping, error: shippingError } = await supabase
      .from('shippings')
      .insert({
        order_id: orderId,
        carrier: carrier,
        tracking: tracking,
        tracking_url: tracking_url || null,
        fecha_envio: new Date().toISOString()
      })
      .select()
      .single();

    if (shippingError) {
      console.error('Error creating shipping:', shippingError);
      return res.status(500).json({ error: 'Error creating shipping record' });
    }

    // 2. Actualizar estado de la orden a ENVIADO
    const { error: updateError } = await supabase
      .from('orders')
      .update({ estado: 'ENVIADO' })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order status:', updateError);
      return res.status(500).json({ error: 'Error updating order status' });
    }

    // 3. Crear registro en historial de estados
    await supabase
      .from('order_status_history')
      .insert({
        order_id: orderId,
        estado: 'ENVIADO',
        reason: `Enviado con ${carrier}, guía: ${tracking}`,
        user_id: providerId
      });

    return res.status(200).json({
      success: true,
      shipping: shipping
    });

  } catch (error) {
    console.error('Error processing shipping:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

**Modificar:** `src/pages/panel/proveedor.tsx` (función `submitTracking`)

```typescript
const submitTracking = async () => {
  if (!selectedOrder || !trackingInfo.carrier || !trackingInfo.tracking) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }

  try {
    const response = await fetch('/api/provider/shipping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: selectedOrder.id,
        providerId: user?.id,
        carrier: trackingInfo.carrier,
        tracking: trackingInfo.tracking,
        tracking_url: trackingInfo.tracking_url || null
      })
    });

    if (response.ok) {
      // Actualizar estado local
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, estado: 'ENVIADO' as const } : order
        )
      );

      setShowTrackingModal(false);
      alert('Información de envío registrada exitosamente');
    } else {
      alert('Error al registrar el envío');
    }
  } catch (error) {
    console.error('Error submitting tracking:', error);
    alert('Error al registrar el envío');
  }
};
```

---

## 📝 CHECKLIST DE DESARROLLO

### Antes de empezar una tarea:
- [ ] Leer documentación relacionada
- [ ] Crear branch nueva: `git checkout -b feature/nombre-tarea`
- [ ] Verificar que servidor de desarrollo esté corriendo
- [ ] Tener consola y DevTools abiertos

### Durante el desarrollo:
- [ ] Escribir código limpio y comentado
- [ ] Manejar errores apropiadamente
- [ ] Probar en diferentes escenarios
- [ ] Verificar que no rompa funcionalidad existente

### Después de completar:
- [ ] Probar manualmente toda la funcionalidad
- [ ] Verificar logs de consola (sin errores)
- [ ] Hacer commit: `git commit -m "feat: descripción"`
- [ ] Actualizar esta documentación si es necesario

---

## 🧪 TESTING MANUAL

### Para Checkout:
1. Agregar productos al carrito
2. Ir a checkout
3. Llenar formulario de dirección
4. Usar tarjeta de prueba de Stripe: `4242 4242 4242 4242`
5. Verificar que:
   - [ ] Orden se crea en BD
   - [ ] Carrito se vacía
   - [ ] Redirige a página de confirmación
   - [ ] Stock se reduce
   - [ ] Aparece en "Mis Órdenes"

### Para Tracking:
1. Login como proveedor
2. Ir a panel de proveedor
3. Seleccionar orden en estado "CONFIRMADO"
4. Click en "Enviar"
5. Llenar modal con datos de tracking
6. Verificar que:
   - [ ] Estado cambia a "ENVIADO"
   - [ ] Se crea registro en tabla `shippings`
   - [ ] Cliente puede ver tracking

---

## 💡 TIPS DE DESARROLLO

### Debug de APIs:
```typescript
console.log('Request body:', req.body);
console.log('User ID:', userId);
console.log('Supabase response:', data);
```

### Verificar datos en Supabase:
```sql
-- Ver órdenes recientes
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

-- Ver items de una orden
SELECT oi.*, p.nombre
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 'ORDER_ID_AQUI';

-- Ver tracking de órdenes
SELECT o.id, o.estado, s.*
FROM orders o
LEFT JOIN shippings s ON o.id = s.order_id
WHERE o.estado = 'ENVIADO';
```

### Limpiar datos de prueba:
```sql
-- ⚠️ CUIDADO: Esto borra todas las órdenes
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
```

---

**🎯 Con estas guías puedes retomar el desarrollo en cualquier momento.**

**📧 Mantén esta documentación actualizada después de cada cambio importante.**