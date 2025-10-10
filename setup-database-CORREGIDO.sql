-- ======================================
-- SCRIPT SQL CORREGIDO - Sin errores
-- Base de Datos para AMCI E-Commerce
-- ======================================

-- 1. CREAR TABLA SHIPPINGS
CREATE TABLE IF NOT EXISTS public.shippings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  carrier TEXT NOT NULL,
  tracking TEXT NOT NULL,
  tracking_url TEXT,
  fecha_envio TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id)
);

-- 2. CREAR TABLA ORDER_STATUS_HISTORY
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  estado TEXT NOT NULL,
  reason TEXT,
  user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AGREGAR COLUMNAS A ORDERS (si no existen)
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- 4. HABILITAR RLS
ALTER TABLE public.shippings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- 5. ELIMINAR POLÍTICAS ANTIGUAS (si existen)
DROP POLICY IF EXISTS "Anyone can view shipping info" ON public.shippings;
DROP POLICY IF EXISTS "Providers can manage shipping" ON public.shippings;
DROP POLICY IF EXISTS "Users can view their order history" ON public.order_status_history;
DROP POLICY IF EXISTS "System can insert history" ON public.order_status_history;

-- 6. CREAR POLÍTICAS DE SHIPPINGS
CREATE POLICY "Anyone can view shipping info"
ON public.shippings FOR SELECT
TO authenticated
USING (true);

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

-- 7. CREAR POLÍTICAS DE HISTORY
CREATE POLICY "Users can view their order history"
ON public.order_status_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_status_history.order_id
    AND o.cliente_id = auth.uid()
  )
);

CREATE POLICY "System can insert history"
ON public.order_status_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- 8. CREAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_shippings_order_id ON public.shippings(order_id);
CREATE INDEX IF NOT EXISTS idx_history_order_id ON public.order_status_history(order_id);

-- ✅ VERIFICACIÓN FINAL
SELECT
  'Tabla shippings: ' || CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'shippings'
  ) THEN '✅ OK' ELSE '❌ ERROR' END as status_shippings,

  'Tabla history: ' || CASE WHEN EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'order_status_history'
  ) THEN '✅ OK' ELSE '❌ ERROR' END as status_history,

  'Columna payment_id: ' || CASE WHEN EXISTS (
    SELECT FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'payment_id'
  ) THEN '✅ OK' ELSE '❌ ERROR' END as status_payment_id;
