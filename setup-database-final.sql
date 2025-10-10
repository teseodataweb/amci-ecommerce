-- ======================================
-- SCRIPT DE CONFIGURACIÓN FINAL
-- Base de Datos para AMCI E-Commerce
-- ======================================
--
-- INSTRUCCIONES:
-- 1. Ir a Supabase Dashboard > SQL Editor
-- 2. Copiar y pegar TODO este script
-- 3. Click en "Run" o presionar Ctrl+Enter
-- 4. Verificar que muestra "Success"
--
-- ======================================

-- ======================================
-- 1. CREAR TABLA SHIPPINGS
-- ======================================

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

COMMENT ON TABLE public.shippings IS 'Información de envío de las órdenes';
COMMENT ON COLUMN public.shippings.carrier IS 'Nombre de la paquetería (DHL, FedEx, etc.)';
COMMENT ON COLUMN public.shippings.tracking IS 'Número de guía de rastreo';
COMMENT ON COLUMN public.shippings.tracking_url IS 'URL para rastrear el envío';

-- ======================================
-- 2. CREAR TABLA ORDER_STATUS_HISTORY
-- ======================================

CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  estado TEXT NOT NULL,
  reason TEXT,
  user_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.order_status_history IS 'Historial de cambios de estado de órdenes';
COMMENT ON COLUMN public.order_status_history.estado IS 'Estado al que cambió (RECIBIDO, ENVIADO, etc.)';
COMMENT ON COLUMN public.order_status_history.reason IS 'Razón del cambio de estado';
COMMENT ON COLUMN public.order_status_history.user_id IS 'Usuario que realizó el cambio';

-- ======================================
-- 3. AGREGAR COLUMNAS A TABLA ORDERS
-- ======================================

-- Agregar columnas para integración con Stripe
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

COMMENT ON COLUMN public.orders.payment_id IS 'ID del PaymentIntent de Stripe';
COMMENT ON COLUMN public.orders.payment_status IS 'Estado del pago: paid, pending, failed';

-- ======================================
-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
-- ======================================

ALTER TABLE public.shippings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- ======================================
-- 5. POLÍTICAS DE SEGURIDAD - SHIPPINGS
-- ======================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Anyone can view shipping info" ON public.shippings;
DROP POLICY IF EXISTS "Providers can manage shipping" ON public.shippings;
DROP POLICY IF EXISTS "Admins can manage all shipping" ON public.shippings;

-- Política 1: Lectura pública para usuarios autenticados
CREATE POLICY "Anyone can view shipping info"
ON public.shippings FOR SELECT
TO authenticated
USING (true);

-- Política 2: Proveedores pueden crear/actualizar envíos de sus productos
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

-- Política 3: Admins pueden gestionar todo
CREATE POLICY "Admins can manage all shipping"
ON public.shippings FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'ADMIN'
  )
);

-- ======================================
-- 6. POLÍTICAS DE SEGURIDAD - HISTORY
-- ======================================

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Users can view their order history" ON public.order_status_history;
DROP POLICY IF EXISTS "System can insert history" ON public.order_status_history;
DROP POLICY IF EXISTS "Admins can view all history" ON public.order_status_history;

-- Política 1: Clientes ven historial de sus órdenes
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

-- Política 2: Admins ven todo el historial
CREATE POLICY "Admins can view all history"
ON public.order_status_history FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'ADMIN'
  )
);

-- Política 3: Sistema puede insertar historial
CREATE POLICY "System can insert history"
ON public.order_status_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- ======================================
-- 7. CREAR ÍNDICES PARA PERFORMANCE
-- ======================================

-- Índices en orders
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_cliente_id ON public.orders(cliente_id);

-- Índices en shippings
CREATE INDEX IF NOT EXISTS idx_shippings_order_id ON public.shippings(order_id);
CREATE INDEX IF NOT EXISTS idx_shippings_tracking ON public.shippings(tracking);

-- Índices en order_status_history
CREATE INDEX IF NOT EXISTS idx_history_order_id ON public.order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_history_created_at ON public.order_status_history(created_at DESC);

-- Índices en order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- ======================================
-- 8. FUNCIÓN PARA ACTUALIZAR TIMESTAMPS
-- ======================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para shippings
DROP TRIGGER IF EXISTS update_shippings_updated_at ON public.shippings;
CREATE TRIGGER update_shippings_updated_at
    BEFORE UPDATE ON public.shippings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ======================================
-- 9. VERIFICACIÓN FINAL
-- ======================================

-- Verificar que las tablas existen
DO $$
DECLARE
    shippings_exists BOOLEAN;
    history_exists BOOLEAN;
    payment_id_exists BOOLEAN;
BEGIN
    -- Verificar tabla shippings
    SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'shippings'
    ) INTO shippings_exists;

    -- Verificar tabla order_status_history
    SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'order_status_history'
    ) INTO history_exists;

    -- Verificar columna payment_id
    SELECT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name = 'orders'
        AND column_name = 'payment_id'
    ) INTO payment_id_exists;

    -- Mostrar resultado
    RAISE NOTICE '================================================';
    RAISE NOTICE 'VERIFICACIÓN DE CONFIGURACIÓN:';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Tabla shippings: %', CASE WHEN shippings_exists THEN '✅ OK' ELSE '❌ FALTA' END;
    RAISE NOTICE 'Tabla order_status_history: %', CASE WHEN history_exists THEN '✅ OK' ELSE '❌ FALTA' END;
    RAISE NOTICE 'Columna payment_id en orders: %', CASE WHEN payment_id_exists THEN '✅ OK' ELSE '❌ FALTA' END;
    RAISE NOTICE '================================================';

    IF shippings_exists AND history_exists AND payment_id_exists THEN
        RAISE NOTICE '✅ CONFIGURACIÓN COMPLETADA EXITOSAMENTE';
    ELSE
        RAISE EXCEPTION '❌ FALTAN ELEMENTOS - Revisa los errores arriba';
    END IF;
END $$;

-- ======================================
-- 10. DATOS DE EJEMPLO (OPCIONAL)
-- ======================================

-- Descomentar si quieres insertar datos de ejemplo

/*
-- Ejemplo de tracking para una orden existente (reemplazar ORDER_ID)
INSERT INTO public.shippings (order_id, carrier, tracking, tracking_url)
VALUES (
    'ORDER_ID_AQUI',  -- Reemplazar con ID real
    'DHL',
    '1234567890',
    'https://www.dhl.com/mx-es/home/rastreo.html?tracking-id=1234567890'
)
ON CONFLICT (order_id) DO NOTHING;

-- Ejemplo de historial de estado
INSERT INTO public.order_status_history (order_id, estado, reason)
VALUES (
    'ORDER_ID_AQUI',  -- Reemplazar con ID real
    'ENVIADO',
    'Orden enviada con DHL'
)
ON CONFLICT DO NOTHING;
*/

-- ======================================
-- ✅ SCRIPT COMPLETADO
-- ======================================

SELECT
    '✅ Database setup completed successfully!' as status,
    'Todas las tablas, columnas, índices y políticas han sido configuradas.' as message,
    'Ahora puedes usar el sistema de checkout y tracking.' as next_step;
