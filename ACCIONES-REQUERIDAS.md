# 🚨 ACCIONES CRÍTICAS REQUERIDAS

**Fecha:** 3 de Octubre, 2025
**Estado:** El checkout NO funciona porque faltan configuraciones

---

## ❌ **PROBLEMA ACTUAL**

El flujo de checkout se detiene después del pago porque:

1. ❌ **Las keys de Stripe NO están configuradas**
2. ❓ **Faltan tablas en la base de datos** (por verificar)
3. ❓ **Columnas faltantes en tabla orders** (por verificar)

---

## ✅ **ACCIONES REQUERIDAS (EN ORDEN)**

### **ACCIÓN #1: Configurar Stripe** 🚨 **CRÍTICO**

#### **Paso 1.1: Crear cuenta de Stripe (si no tienes)**

1. Ir a: https://dashboard.stripe.com/register
2. Crear cuenta con tu email
3. Completar verificación

#### **Paso 1.2: Obtener keys de prueba**

1. Login en: https://dashboard.stripe.com/
2. Ir a: **Developers** > **API Keys**
3. En la sección **"Standard keys"**:
   - Copiar **Publishable key** (empieza con `pk_test_...`)
   - Copiar **Secret key** (empieza con `sk_test_...`)
   - ⚠️ Asegúrate de estar en **modo TEST** (toggle arriba a la derecha)

#### **Paso 1.3: Configurar keys en .env**

Editar el archivo `.env` y **descomentar + reemplazar** estas líneas:

```env
# Stripe Configuration (para pasarela de pago)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_KEY_AQUI
STRIPE_SECRET_KEY=sk_test_TU_SECRET_KEY_AQUI
```

**Ejemplo real:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz0987654321
```

#### **Paso 1.4: Reiniciar servidor**

```bash
# En la terminal donde corre npm run dev, presiona Ctrl+C
# Luego ejecuta de nuevo:
npm run dev
```

---

### **ACCIÓN #2: Verificar/Crear Tablas en Supabase** 🚨 **CRÍTICO**

#### **Tabla 1: `shippings`**

1. Ir a: https://supabase.com/dashboard/project/dzgjxrghqyotixqnrexu
2. Click en **"SQL Editor"** (menú izquierdo)
3. Click en **"New Query"**
4. Copiar y pegar este SQL:

```sql
-- Verificar si existe la tabla shippings
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'shippings'
);

-- Si devuelve 'false', crear la tabla:
CREATE TABLE IF NOT EXISTS public.shippings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  carrier TEXT NOT NULL,
  tracking TEXT NOT NULL,
  tracking_url TEXT,
  fecha_envio TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id)
);

-- Habilitar RLS
ALTER TABLE public.shippings ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer tracking
CREATE POLICY "Anyone can view shipping info"
ON public.shippings FOR SELECT
TO authenticated
USING (true);

-- Política: Solo proveedores pueden crear/actualizar
CREATE POLICY "Providers can manage shipping"
ON public.shippings FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.products p ON oi.product_id = p.id
    WHERE oi.order_id = shippings.order_id
    AND p.provider_id = auth.uid()
  )
);
```

5. Click **"Run"**
6. ✅ Verificar que muestra **"Success. No rows returned"** o similar

---

#### **Tabla 2: `order_status_history`**

```sql
-- Verificar si existe
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'order_status_history'
);

-- Si devuelve 'false', crear:
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  estado TEXT NOT NULL,
  reason TEXT,
  user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- Política: Solo el cliente y admin pueden ver historial
CREATE POLICY "Users can view their order history"
ON public.order_status_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_status_history.order_id
    AND (o.cliente_id = auth.uid() OR
         EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'ADMIN'))
  )
);

-- Política: Sistema puede insertar
CREATE POLICY "System can insert history"
ON public.order_status_history FOR INSERT
TO authenticated
WITH CHECK (true);
```

---

### **ACCIÓN #3: Verificar Columnas en Tabla `orders`**

Ejecutar este SQL para verificar/agregar columnas faltantes:

```sql
-- Verificar columnas existentes
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'orders'
AND column_name IN ('payment_id', 'payment_status');

-- Si no existen, agregarlas:
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
```

---

### **ACCIÓN #4: Script SQL Completo (TODO EN UNO)**

Si prefieres ejecutar todo de una vez, copia este script completo:

```sql
-- ======================================
-- SCRIPT COMPLETO DE CONFIGURACIÓN
-- ======================================

-- 1. Crear tabla shippings si no existe
CREATE TABLE IF NOT EXISTS public.shippings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  carrier TEXT NOT NULL,
  tracking TEXT NOT NULL,
  tracking_url TEXT,
  fecha_envio TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id)
);

-- 2. Crear tabla order_status_history si no existe
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  estado TEXT NOT NULL,
  reason TEXT,
  user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Agregar columnas a orders si no existen
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- 4. Habilitar RLS
ALTER TABLE public.shippings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de shippings
DROP POLICY IF EXISTS "Anyone can view shipping info" ON public.shippings;
CREATE POLICY "Anyone can view shipping info"
ON public.shippings FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Providers can manage shipping" ON public.shippings;
CREATE POLICY "Providers can manage shipping"
ON public.shippings FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.products p ON oi.product_id = p.id
    WHERE oi.order_id = shippings.order_id
    AND p.provider_id = auth.uid()
  )
);

-- 6. Políticas de order_status_history
DROP POLICY IF EXISTS "Users can view their order history" ON public.order_status_history;
CREATE POLICY "Users can view their order history"
ON public.order_status_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_status_history.order_id
    AND (o.cliente_id = auth.uid() OR
         EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'ADMIN'))
  )
);

DROP POLICY IF EXISTS "System can insert history" ON public.order_status_history;
CREATE POLICY "System can insert history"
ON public.order_status_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- 7. Crear índices
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_shippings_order_id ON public.shippings(order_id);
CREATE INDEX IF NOT EXISTS idx_history_order_id ON public.order_status_history(order_id);

-- ✅ COMPLETADO
SELECT 'Database setup completed successfully!' as result;
```

---

## 🧪 **ACCIÓN #5: Probar Flujo Completo**

Una vez configurado Stripe y la BD:

### **Test Rápido:**

```bash
1. Ir a: http://localhost:3000
2. Login como cliente
3. Agregar producto al carrito
4. Ir a checkout
5. Llenar formulario
6. Usar tarjeta de PRUEBA Stripe:

   Número: 4242 4242 4242 4242
   Fecha: 12/28 (cualquier fecha futura)
   CVC: 123
   Nombre: Test User
   ZIP: 12345

7. Click "Pagar"
8. ✅ DEBE redirigir a /orden/[id]?success=true
9. ✅ DEBE mostrar la orden completa
10. ✅ DEBE mostrar "Pagado" en verde
```

---

## 📋 **CHECKLIST DE VERIFICACIÓN**

Antes de probar, asegúrate de:

### Configuración:
- [ ] Keys de Stripe configuradas en `.env`
- [ ] Servidor reiniciado después de cambiar `.env`
- [ ] Tabla `shippings` creada en Supabase
- [ ] Tabla `order_status_history` creada en Supabase
- [ ] Columnas `payment_id` y `payment_status` en tabla `orders`
- [ ] Políticas RLS configuradas

### Datos de Prueba:
- [ ] Al menos 1 producto con stock > 0
- [ ] Producto debe estar "aprobado"
- [ ] Usuario cliente registrado
- [ ] Usuario proveedor registrado

### Testing:
- [ ] Carrito funciona
- [ ] Checkout muestra formulario Stripe
- [ ] Pago procesa correctamente
- [ ] Redirige a página de orden
- [ ] Orden se guarda en BD
- [ ] Stock se reduce
- [ ] Carrito se vacía

---

## ⚠️ **ERRORES COMUNES Y SOLUCIONES**

### Error 1: "Stripe is not defined"
**Causa:** Keys de Stripe no configuradas
**Solución:** Ver ACCIÓN #1

### Error 2: "relation 'shippings' does not exist"
**Causa:** Tabla no creada en Supabase
**Solución:** Ver ACCIÓN #2

### Error 3: "column 'payment_id' does not exist"
**Causa:** Columnas faltantes en tabla orders
**Solución:** Ver ACCIÓN #3

### Error 4: Pago se procesa pero no redirige
**Causa:** Error en API `/api/orders/create`
**Solución:** Ver logs del servidor (terminal)

### Error 5: "Permission denied" al guardar orden
**Causa:** Políticas RLS bloqueando inserción
**Solución:** Verificar que usas `supabaseAdmin()` en APIs

---

## 🚀 **ORDEN DE EJECUCIÓN RECOMENDADO**

```bash
1. ✅ Configurar Stripe (.env)         [5 min]
2. ✅ Reiniciar servidor              [1 min]
3. ✅ Ejecutar script SQL completo    [2 min]
4. ✅ Verificar tablas en Supabase    [2 min]
5. ✅ Probar checkout                 [5 min]
6. ✅ Revisar logs si falla           [10 min]
```

**Tiempo total estimado:** 25 minutos

---

## 📞 **CÓMO OBTENER SOPORTE**

Si algo falla después de estas acciones:

1. **Revisar logs del servidor** (terminal donde corre `npm run dev`)
2. **Revisar consola del navegador** (F12 > Console)
3. **Verificar en Supabase:**
   - Table Editor > orders (¿se creó la orden?)
   - Table Editor > shippings (¿existe la tabla?)
   - SQL Editor > ejecutar queries de verificación

4. **Errores de Stripe:**
   - Ir a: https://dashboard.stripe.com/test/logs
   - Ver errores de API

---

## ✅ **RESUMEN EJECUTIVO**

**PARA QUE EL CHECKOUT FUNCIONE NECESITAS:**

1. 🔑 Configurar keys de Stripe en `.env`
2. 🗄️ Ejecutar script SQL en Supabase
3. 🔄 Reiniciar servidor
4. 🧪 Probar con tarjeta de prueba

**SIN ESTAS ACCIONES, EL CHECKOUT NO FUNCIONARÁ**

---

**Última actualización:** 3 de Octubre, 2025
