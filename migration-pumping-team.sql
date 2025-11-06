-- =====================================================
-- MIGRACIÓN: Soporte para Pumping Team
-- Fecha: 2025-11-03
-- Descripción: Agrega campos y tablas necesarias para
--              servicios de bombeo y cotizaciones
-- =====================================================

-- =====================================================
-- 1. CREAR NUEVOS ENUMS
-- =====================================================

-- Enum para modelo de movilización
DO $$ BEGIN
    CREATE TYPE "MovilizacionModel" AS ENUM ('ZONA', 'KM', 'FIJA', 'MIXTO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para tipo de bomba
DO $$ BEGIN
    CREATE TYPE "TipoBomba" AS ENUM ('LINEA', 'PLUMA', 'OTRA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para estados de cotización
DO $$ BEGIN
    CREATE TYPE "QuotationStatus" AS ENUM ('SOLICITADA', 'PRESUPUESTADA', 'ACEPTADA', 'RECHAZADA', 'VENCIDA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 2. EXTENDER TABLA PROVIDERS
-- =====================================================

-- Agregar nuevas columnas a providers
ALTER TABLE providers
ADD COLUMN IF NOT EXISTS "contactoProgramacion" TEXT,
ADD COLUMN IF NOT EXISTS "coberturaServicio" TEXT,
ADD COLUMN IF NOT EXISTS "correosNotificaciones" JSONB,
ADD COLUMN IF NOT EXISTS "observaciones" TEXT;

-- Comentarios para documentación
COMMENT ON COLUMN providers."contactoProgramacion" IS 'Contacto de programación/agenda (nombre / correo / teléfono)';
COMMENT ON COLUMN providers."coberturaServicio" IS 'Cobertura de servicio (ciudades/estados y radio en km)';
COMMENT ON COLUMN providers."correosNotificaciones" IS 'Array de correos para notificaciones de órdenes/agenda';
COMMENT ON COLUMN providers."observaciones" IS 'Observaciones generales del proveedor';

-- =====================================================
-- 3. CREAR TABLA: PROVIDER SERVICE POLICIES
-- =====================================================

CREATE TABLE IF NOT EXISTS provider_service_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "providerId" UUID NOT NULL UNIQUE REFERENCES providers(id) ON DELETE CASCADE,
    "modeloMovilizacion" "MovilizacionModel" NOT NULL DEFAULT 'FIJA',
    "tiempoMinimoFacturable" INTEGER,
    "precioHorasExtra" DOUBLE PRECISION,
    "ventanaCancelacion" INTEGER,
    "penalizacionMonto" DOUBLE PRECISION,
    "penalizacionTipo" TEXT,
    "requerimientosSeguridad" TEXT,
    "responsableSitio" TEXT,
    "seguroResponsabilidad" TEXT,
    observaciones TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios para documentación
COMMENT ON TABLE provider_service_policies IS 'Políticas de servicio: movilización, cancelaciones, garantías';
COMMENT ON COLUMN provider_service_policies."tiempoMinimoFacturable" IS 'Tiempo mínimo facturable en horas';
COMMENT ON COLUMN provider_service_policies."precioHorasExtra" IS 'Precio por hora extra ($/h)';
COMMENT ON COLUMN provider_service_policies."ventanaCancelacion" IS 'Ventana de cancelación sin cargo (horas)';
COMMENT ON COLUMN provider_service_policies."penalizacionTipo" IS 'PORCENTAJE o FIJO';
COMMENT ON COLUMN provider_service_policies."requerimientosSeguridad" IS 'EPP, señalización, permisos requeridos';

-- =====================================================
-- 4. CREAR TABLA: BOMBEO SERVICE DETAILS
-- =====================================================

CREATE TABLE IF NOT EXISTS bombeo_service_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    "tipoBomba" "TipoBomba" NOT NULL,
    "capacidadNominal" DOUBLE PRECISION,
    presion DOUBLE PRECISION,
    "alcanceHorizontal" DOUBLE PRECISION,
    "alcanceVertical" DOUBLE PRECISION,
    "longitudManguera" DOUBLE PRECISION,
    "diametroManguera" DOUBLE PRECISION,
    "tamanoMaxAgregado" DOUBLE PRECISION,
    "asentamientoSlump" DOUBLE PRECISION,
    "incluyeOperador" BOOLEAN NOT NULL DEFAULT true,
    "incluyeManguera" BOOLEAN NOT NULL DEFAULT true,
    "noIncluye" TEXT,
    "requerimientosSitio" JSONB,
    "documentacionUrls" JSONB,
    "notasComerciales" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios para documentación
COMMENT ON TABLE bombeo_service_details IS 'Especificaciones técnicas de servicios de bombeo';
COMMENT ON COLUMN bombeo_service_details."capacidadNominal" IS 'Capacidad nominal en m³/h o l/min';
COMMENT ON COLUMN bombeo_service_details.presion IS 'Presión en bar/psi';
COMMENT ON COLUMN bombeo_service_details."alcanceHorizontal" IS 'Alcance horizontal en metros';
COMMENT ON COLUMN bombeo_service_details."alcanceVertical" IS 'Alcance vertical en metros';
COMMENT ON COLUMN bombeo_service_details."tamanoMaxAgregado" IS 'Tamaño máximo de agregado en mm';
COMMENT ON COLUMN bombeo_service_details."asentamientoSlump" IS 'Asentamiento (slump) en pulgadas';
COMMENT ON COLUMN bombeo_service_details."noIncluye" IS 'Exclusiones del servicio (ej: colocación final, vibrado, limpieza)';
COMMENT ON COLUMN bombeo_service_details."requerimientosSitio" IS 'JSON con requisitos: superficie, altura libre, accesos, agua/energía';
COMMENT ON COLUMN bombeo_service_details."documentacionUrls" IS 'Array de URLs de PDFs: manuales, fichas seguridad, pólizas';

-- =====================================================
-- 5. CREAR TABLA: QUOTATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL REFERENCES products(id),
    "clienteId" UUID NOT NULL REFERENCES users(id),
    status "QuotationStatus" NOT NULL DEFAULT 'SOLICITADA',
    "datosServicio" JSONB NOT NULL,
    presupuesto DOUBLE PRECISION,
    "validoHasta" TIMESTAMP(3),
    "notasProveedor" TEXT,
    "notasCliente" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondidaAt" TIMESTAMP(3),
    "aceptadaAt" TIMESTAMP(3)
);

-- Comentarios para documentación
COMMENT ON TABLE quotations IS 'Cotizaciones solicitadas por clientes para servicios bajo modalidad COTIZAR';
COMMENT ON COLUMN quotations."datosServicio" IS 'JSON con datos técnicos: ubicación, fecha, volumen, condiciones sitio';
COMMENT ON COLUMN quotations.presupuesto IS 'Precio propuesto por el proveedor';
COMMENT ON COLUMN quotations."validoHasta" IS 'Fecha de validez del presupuesto';
COMMENT ON COLUMN quotations."respondidaAt" IS 'Timestamp cuando el proveedor respondió la cotización';
COMMENT ON COLUMN quotations."aceptadaAt" IS 'Timestamp cuando el cliente aceptó el presupuesto';

-- =====================================================
-- 6. CREAR ÍNDICES
-- =====================================================

-- Índices para quotations (mejora rendimiento de consultas)
CREATE INDEX IF NOT EXISTS "quotations_clienteId_idx" ON quotations("clienteId");
CREATE INDEX IF NOT EXISTS "quotations_productId_idx" ON quotations("productId");
CREATE INDEX IF NOT EXISTS "quotations_status_idx" ON quotations(status);
CREATE INDEX IF NOT EXISTS "quotations_createdAt_idx" ON quotations("createdAt" DESC);

-- =====================================================
-- 7. TRIGGERS PARA UPDATED_AT
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para provider_service_policies
DROP TRIGGER IF EXISTS update_provider_service_policies_updated_at ON provider_service_policies;
CREATE TRIGGER update_provider_service_policies_updated_at
    BEFORE UPDATE ON provider_service_policies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para bombeo_service_details
DROP TRIGGER IF EXISTS update_bombeo_service_details_updated_at ON bombeo_service_details;
CREATE TRIGGER update_bombeo_service_details_updated_at
    BEFORE UPDATE ON bombeo_service_details
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para quotations
DROP TRIGGER IF EXISTS update_quotations_updated_at ON quotations;
CREATE TRIGGER update_quotations_updated_at
    BEFORE UPDATE ON quotations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Habilitar RLS en las nuevas tablas
ALTER TABLE provider_service_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bombeo_service_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 8.1 POLÍTICAS PARA: provider_service_policies
-- =====================================================

-- Proveedores pueden ver y editar sus propias políticas
DROP POLICY IF EXISTS "Proveedores pueden ver sus políticas" ON provider_service_policies;
CREATE POLICY "Proveedores pueden ver sus políticas"
    ON provider_service_policies
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM providers p
            WHERE p.id = provider_service_policies."providerId"
            AND p."userId" = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Proveedores pueden crear sus políticas" ON provider_service_policies;
CREATE POLICY "Proveedores pueden crear sus políticas"
    ON provider_service_policies
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM providers p
            WHERE p.id = provider_service_policies."providerId"
            AND p."userId" = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Proveedores pueden actualizar sus políticas" ON provider_service_policies;
CREATE POLICY "Proveedores pueden actualizar sus políticas"
    ON provider_service_policies
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM providers p
            WHERE p.id = provider_service_policies."providerId"
            AND p."userId" = auth.uid()
        )
    );

-- Administradores pueden ver todas las políticas
DROP POLICY IF EXISTS "Admins pueden ver todas las políticas" ON provider_service_policies;
CREATE POLICY "Admins pueden ver todas las políticas"
    ON provider_service_policies
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 8.2 POLÍTICAS PARA: bombeo_service_details
-- =====================================================

-- Todos pueden ver detalles de productos aprobados y visibles
DROP POLICY IF EXISTS "Todos pueden ver detalles de productos públicos" ON bombeo_service_details;
CREATE POLICY "Todos pueden ver detalles de productos públicos"
    ON bombeo_service_details
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = bombeo_service_details."productId"
            AND p.visible = true
            AND p.approved = true
        )
    );

-- Proveedores pueden crear detalles para sus productos
DROP POLICY IF EXISTS "Proveedores pueden crear detalles de sus productos" ON bombeo_service_details;
CREATE POLICY "Proveedores pueden crear detalles de sus productos"
    ON bombeo_service_details
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM products p
            INNER JOIN providers prov ON p."providerId" = prov.id
            WHERE p.id = bombeo_service_details."productId"
            AND prov."userId" = auth.uid()
        )
    );

-- Proveedores pueden actualizar detalles de sus productos
DROP POLICY IF EXISTS "Proveedores pueden actualizar detalles de sus productos" ON bombeo_service_details;
CREATE POLICY "Proveedores pueden actualizar detalles de sus productos"
    ON bombeo_service_details
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM products p
            INNER JOIN providers prov ON p."providerId" = prov.id
            WHERE p.id = bombeo_service_details."productId"
            AND prov."userId" = auth.uid()
        )
    );

-- Administradores tienen acceso completo
DROP POLICY IF EXISTS "Admins pueden gestionar todos los detalles de bombeo" ON bombeo_service_details;
CREATE POLICY "Admins pueden gestionar todos los detalles de bombeo"
    ON bombeo_service_details
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 8.3 POLÍTICAS PARA: quotations
-- =====================================================

-- Clientes pueden ver sus propias cotizaciones
DROP POLICY IF EXISTS "Clientes pueden ver sus cotizaciones" ON quotations;
CREATE POLICY "Clientes pueden ver sus cotizaciones"
    ON quotations
    FOR SELECT
    USING (quotations."clienteId" = auth.uid());

-- Clientes pueden crear cotizaciones
DROP POLICY IF EXISTS "Clientes pueden crear cotizaciones" ON quotations;
CREATE POLICY "Clientes pueden crear cotizaciones"
    ON quotations
    FOR INSERT
    WITH CHECK (quotations."clienteId" = auth.uid());

-- Clientes pueden actualizar sus cotizaciones (solo si están en estado SOLICITADA o PRESUPUESTADA)
DROP POLICY IF EXISTS "Clientes pueden actualizar sus cotizaciones" ON quotations;
CREATE POLICY "Clientes pueden actualizar sus cotizaciones"
    ON quotations
    FOR UPDATE
    USING (
        quotations."clienteId" = auth.uid()
        AND quotations.status IN ('SOLICITADA', 'PRESUPUESTADA')
    );

-- Proveedores pueden ver cotizaciones de sus productos
DROP POLICY IF EXISTS "Proveedores pueden ver cotizaciones de sus productos" ON quotations;
CREATE POLICY "Proveedores pueden ver cotizaciones de sus productos"
    ON quotations
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM products p
            INNER JOIN providers prov ON p."providerId" = prov.id
            WHERE p.id = quotations."productId"
            AND prov."userId" = auth.uid()
        )
    );

-- Proveedores pueden responder cotizaciones de sus productos
DROP POLICY IF EXISTS "Proveedores pueden responder cotizaciones" ON quotations;
CREATE POLICY "Proveedores pueden responder cotizaciones"
    ON quotations
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM products p
            INNER JOIN providers prov ON p."providerId" = prov.id
            WHERE p.id = quotations."productId"
            AND prov."userId" = auth.uid()
        )
    );

-- Administradores tienen acceso completo a cotizaciones
DROP POLICY IF EXISTS "Admins pueden gestionar todas las cotizaciones" ON quotations;
CREATE POLICY "Admins pueden gestionar todas las cotizaciones"
    ON quotations
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'ADMIN'
        )
    );

-- =====================================================
-- 9. VERIFICACIÓN Y RESUMEN
-- =====================================================

-- Verificar que las tablas se crearon correctamente
DO $$
DECLARE
    tabla_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO tabla_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('provider_service_policies', 'bombeo_service_details', 'quotations');

    RAISE NOTICE '✅ Tablas creadas: %/3', tabla_count;

    IF tabla_count = 3 THEN
        RAISE NOTICE '✅ Migración completada exitosamente!';
        RAISE NOTICE '📊 Nuevas tablas: provider_service_policies, bombeo_service_details, quotations';
        RAISE NOTICE '🔧 Nuevas columnas en providers: contactoProgramacion, coberturaServicio, correosNotificaciones, observaciones';
        RAISE NOTICE '🔒 Políticas RLS aplicadas correctamente';
    ELSE
        RAISE WARNING '⚠️  Solo se crearon % de 3 tablas esperadas', tabla_count;
    END IF;
END $$;
