-- =====================================================
-- DATOS DE PRUEBA: Pumping Team
-- =====================================================
-- Este script crea datos de ejemplo para probar
-- el sistema con Pumping Team
-- =====================================================

-- IMPORTANTE: Ejecuta este script DESPUÉS de aplicar
-- migration-pumping-team.sql

-- =====================================================
-- 1. CREAR USUARIO Y PROVEEDOR PUMPING TEAM
-- =====================================================

-- Verificar si ya existe la categoría de Servicios
INSERT INTO categories (id, name, slug, description)
VALUES (
    'cat-servicios-001',
    'Servicios de Construcción',
    'servicios-construccion',
    'Servicios especializados de construcción: bombeo, excavación, etc.'
)
ON CONFLICT (slug) DO NOTHING;

-- Crear usuario para Pumping Team (si no existe)
-- NOTA: En producción, esto se haría vía registro normal
INSERT INTO users (id, email, name, phone, role)
VALUES (
    'user-pumping-team-001',
    'contacto@pumpingteam.com',
    'Roberto González',
    '55-1234-5678',
    'PROVEEDOR'
)
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone;

-- Crear proveedor Pumping Team
INSERT INTO providers (
    id,
    user_id,
    razon_social,
    rfc,
    contacto_operativo,
    contacto_programacion,
    contacto_facturacion,
    clabe,
    emisor_factura_default,
    cobertura_servicio,
    correos_notificaciones,
    observaciones,
    active
)
VALUES (
    'provider-pumping-team-001',
    'user-pumping-team-001',
    'Pumping Team S.A. de C.V.',
    'PTM850615ABC',
    'Roberto González / contacto@pumpingteam.com / 55-1234-5678',
    'María Sánchez / agenda@pumpingteam.com / 55-9876-5432',
    'facturacion@pumpingteam.com',
    '012345678901234567',
    'PROVEEDOR',
    'Ciudad de México y Área Metropolitana, Estado de México (radio 80km)',
    '["contacto@pumpingteam.com", "operaciones@pumpingteam.com", "agenda@pumpingteam.com"]',
    'Disponibilidad 24/7. Servicio de emergencia disponible con cargo adicional.',
    true -- Aprobado y activo
)
ON CONFLICT (user_id) DO UPDATE SET
    razon_social = EXCLUDED.razon_social,
    active = EXCLUDED.active;

-- =====================================================
-- 2. POLÍTICAS DE SERVICIO
-- =====================================================

INSERT INTO provider_service_policies (
    id,
    provider_id,
    modelo_movilizacion,
    tiempo_minimo_facturable,
    precio_horas_extra,
    ventana_cancelacion,
    penalizacion_monto,
    penalizacion_tipo,
    requerimientos_seguridad,
    responsable_sitio,
    seguro_responsabilidad,
    observaciones
)
VALUES (
    'policy-pumping-team-001',
    'provider-pumping-team-001',
    'MIXTO', -- Combina zona + km
    4, -- Mínimo 4 horas
    850.00, -- $850/hora extra
    24, -- Cancelación con 24h de anticipación
    50.00,
    'PORCENTAJE', -- 50% del total
    'EPP completo obligatorio: casco, chaleco reflectante, botas de seguridad. Señalización de área de trabajo. Permiso de obra vigente.',
    'Cliente debe designar responsable en sitio con celular para coordinación',
    'Póliza de responsabilidad civil vigente por $5,000,000 MXN',
    'Requiere acceso vehicular para camión de 12 toneladas. Superficie firme y nivelada. Altura libre mínima de 4.5m si hay obstáculos aéreos.'
)
ON CONFLICT (provider_id) DO UPDATE SET
    modelo_movilizacion = EXCLUDED.modelo_movilizacion,
    tiempo_minimo_facturable = EXCLUDED.tiempo_minimo_facturable;

-- =====================================================
-- 3. PRODUCTOS/SERVICIOS DE BOMBEO
-- =====================================================

-- Servicio 1: Bomba de Línea Estacionaria
INSERT INTO products (
    id,
    provider_id,
    category_id,
    nombre,
    slug,
    descripcion,
    precio,
    pricing_mode,
    emisor_factura,
    visible,
    approved,
    stock
)
VALUES (
    'prod-bomba-linea-001',
    'provider-pumping-team-001',
    'cat-servicios-001',
    'Servicio de Bombeo - Bomba de Línea Estacionaria',
    'bombeo-linea-estacionaria',
    'Servicio de bombeo de concreto con bomba de línea estacionaria de alta capacidad. Ideal para obras de gran volumen.',
    NULL, -- Sin precio fijo
    'COTIZAR',
    'PROVEEDOR',
    true, -- Visible
    true, -- Aprobado
    999 -- Stock ilimitado para servicios
)
ON CONFLICT (slug) DO NOTHING;

-- Detalles técnicos: Bomba de Línea
INSERT INTO bombeo_service_details (
    id,
    product_id,
    tipo_bomba,
    capacidad_nominal,
    presion,
    alcance_horizontal,
    alcance_vertical,
    longitud_manguera,
    diametro_manguera,
    tamano_max_agregado,
    asentamiento_slump,
    incluye_operador,
    incluye_manguera,
    no_incluye,
    requerimientos_sitio,
    documentacion_urls,
    notas_comerciales
)
VALUES (
    'detail-bomba-linea-001',
    'prod-bomba-linea-001',
    'LINEA',
    80.0, -- 80 m³/h
    85.0, -- 85 bar
    300.0, -- 300 metros horizontal
    80.0, -- 80 metros vertical
    150.0, -- 150 metros de manguera incluida
    125.0, -- 125mm diámetro
    38.0, -- Agregado máx 38mm (1.5")
    18.0, -- Slump hasta 18cm (7")
    true, -- Incluye operador certificado
    true, -- Incluye manguera
    'NO INCLUYE: Colocación final del concreto, vibrado, acabados, cimbras, limpieza posterior, retiro de sobrantes, bombeo de materiales no especificados',
    '{
        "superficie_requerida": "Mínimo 15m² firmes y nivelados para posicionamiento del equipo",
        "altura_libre": "4.5 metros libres de cables, árboles u obstáculos aéreos",
        "acceso_vehicular": "Acceso para camión de 12 toneladas, ancho mínimo 3.5m",
        "agua_disponible": "Requerido: toma de agua para limpieza post-servicio (mínimo 200 litros)",
        "energia": "No requerida - equipo diesel autónomo",
        "distancia_losa": "Máximo 10 metros de distancia entre bomba y punto de colado"
    }',
    '["https://ejemplo.com/manual-bomba-linea.pdf", "https://ejemplo.com/ficha-seguridad.pdf"]',
    'Descuento del 10% para servicios programados con 7+ días de anticipación. Servicio 24/7 disponible con recargo del 35% en horario nocturno.'
)
ON CONFLICT (product_id) DO NOTHING;

-- Imagen para Bomba de Línea
INSERT INTO product_images (product_id, url, alt, "order")
VALUES (
    'prod-bomba-linea-001',
    'https://via.placeholder.com/800x600/1e40af/ffffff?text=Bomba+Linea+Estacionaria',
    'Bomba de línea estacionaria Pumping Team',
    1
)
ON CONFLICT DO NOTHING;

-- Servicio 2: Bomba de Pluma/Boom
INSERT INTO products (
    id,
    provider_id,
    category_id,
    nombre,
    slug,
    descripcion,
    precio,
    pricing_mode,
    emisor_factura,
    visible,
    approved,
    stock
)
VALUES (
    'prod-bomba-pluma-001',
    'provider-pumping-team-001',
    'cat-servicios-001',
    'Servicio de Bombeo - Bomba de Pluma 32m',
    'bombeo-pluma-32m',
    'Servicio de bombeo de concreto con bomba autopropulsada de pluma. Alcance vertical y horizontal superior. Ideal para edificios y estructuras elevadas.',
    NULL,
    'COTIZAR',
    'PROVEEDOR',
    true,
    true,
    999
)
ON CONFLICT (slug) DO NOTHING;

-- Detalles técnicos: Bomba de Pluma
INSERT INTO bombeo_service_details (
    id,
    product_id,
    tipo_bomba,
    capacidad_nominal,
    presion,
    alcance_horizontal,
    alcance_vertical,
    longitud_manguera,
    diametro_manguera,
    tamano_max_agregado,
    asentamiento_slump,
    incluye_operador,
    incluye_manguera,
    no_incluye,
    requerimientos_sitio,
    documentacion_urls,
    notas_comerciales
)
VALUES (
    'detail-bomba-pluma-001',
    'prod-bomba-pluma-001',
    'PLUMA',
    60.0, -- 60 m³/h
    90.0, -- 90 bar
    28.0, -- 28 metros horizontal
    32.0, -- 32 metros vertical (pluma extendida)
    NULL, -- La pluma no usa manguera adicional
    125.0,
    32.0, -- Agregado máx 32mm
    20.0, -- Slump hasta 20cm (8")
    true,
    false, -- Pluma no necesita manguera adicional
    'NO INCLUYE: Colocación final del concreto, vibrado, acabados, cimbras, limpieza posterior, retiro de sobrantes, nivelación de terreno para estabilización del equipo',
    '{
        "superficie_requerida": "Mínimo 20m² firmes para estabilización con gatos hidráulicos",
        "altura_libre": "Verificar espacio aéreo para despliegue de pluma (hasta 32m)",
        "acceso_vehicular": "Acceso para camión de 18 toneladas, ancho mínimo 4m, alto 4.5m",
        "agua_disponible": "Requerido: toma de agua 300 litros",
        "energia": "No requerida - equipo diesel",
        "nivelacion": "Terreno debe soportar 25 ton/m² con gatos desplegados"
    }',
    '["https://ejemplo.com/manual-bomba-pluma.pdf", "https://ejemplo.com/certificacion-operador.pdf"]',
    'Incluye reconocimiento previo del sitio sin costo. Disponible para proyectos de edificación hasta 10 niveles.'
)
ON CONFLICT (product_id) DO NOTHING;

-- Imagen para Bomba de Pluma
INSERT INTO product_images (product_id, url, alt, "order")
VALUES (
    'prod-bomba-pluma-001',
    'https://via.placeholder.com/800x600/d97706/ffffff?text=Bomba+Pluma+32m',
    'Bomba de pluma autopropulsada Pumping Team',
    1
)
ON CONFLICT DO NOTHING;

-- Servicio 3: Bomba de Línea Compacta (para espacios reducidos)
INSERT INTO products (
    id,
    provider_id,
    category_id,
    nombre,
    slug,
    descripcion,
    precio,
    pricing_mode,
    emisor_factura,
    visible,
    approved,
    stock
)
VALUES (
    'prod-bomba-compacta-001',
    'provider-pumping-team-001',
    'cat-servicios-001',
    'Servicio de Bombeo - Bomba Compacta',
    'bombeo-compacta-espacios-reducidos',
    'Servicio de bombeo con bomba compacta para proyectos en espacios reducidos o zonas de difícil acceso. Ideal para remodelaciones y obras residenciales.',
    NULL,
    'COTIZAR',
    'PROVEEDOR',
    true,
    true,
    999
)
ON CONFLICT (slug) DO NOTHING;

-- Detalles técnicos: Bomba Compacta
INSERT INTO bombeo_service_details (
    id,
    product_id,
    tipo_bomba,
    capacidad_nominal,
    presion,
    alcance_horizontal,
    alcance_vertical,
    longitud_manguera,
    diametro_manguera,
    tamano_max_agregado,
    asentamiento_slump,
    incluye_operador,
    incluye_manguera,
    no_incluye,
    requerimientos_sitio,
    documentacion_urls,
    notas_comerciales
)
VALUES (
    'detail-bomba-compacta-001',
    'prod-bomba-compacta-001',
    'LINEA',
    30.0, -- 30 m³/h (menor capacidad)
    70.0, -- 70 bar
    120.0, -- 120 metros horizontal
    40.0, -- 40 metros vertical
    80.0, -- 80 metros de manguera
    100.0, -- 100mm diámetro (más pequeña)
    25.0, -- Agregado máx 25mm (1")
    16.0, -- Slump hasta 16cm (6.5")
    true,
    true,
    'NO INCLUYE: Colocación, vibrado, acabados, limpieza, maniobras especiales en espacios confinados',
    '{
        "superficie_requerida": "Mínimo 8m² para equipo compacto",
        "altura_libre": "3 metros mínimo",
        "acceso_vehicular": "Acceso para camioneta 3.5 toneladas, ancho 2.5m",
        "agua_disponible": "100 litros para limpieza",
        "energia": "No requerida - equipo autónomo",
        "acceso_peatonal": "Opción de ingreso manual con carretilla si no hay acceso vehicular"
    }',
    '["https://ejemplo.com/manual-bomba-compacta.pdf"]',
    'Ideal para proyectos residenciales, ampliaciones, losas de hasta 150m². Tarifa especial para volúmenes menores a 10m³.'
)
ON CONFLICT (product_id) DO NOTHING;

-- Imagen para Bomba Compacta
INSERT INTO product_images (product_id, url, alt, "order")
VALUES (
    'prod-bomba-compacta-001',
    'https://via.placeholder.com/800x600/059669/ffffff?text=Bomba+Compacta',
    'Bomba compacta para espacios reducidos',
    1
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 4. COTIZACIÓN DE EJEMPLO (Opcional)
-- =====================================================

-- Crear un cliente de prueba (opcional)
INSERT INTO users (id, email, name, phone, role)
VALUES (
    'user-cliente-test-001',
    'cliente.test@ejemplo.com',
    'Juan Pérez',
    '55-9999-8888',
    'CLIENTE'
)
ON CONFLICT (email) DO NOTHING;

-- Crear una cotización de ejemplo
INSERT INTO quotations (
    id,
    product_id,
    cliente_id,
    status,
    datos_servicio,
    notas_cliente
)
VALUES (
    'quotation-example-001',
    'prod-bomba-linea-001',
    'user-cliente-test-001',
    'SOLICITADA',
    '{
        "ubicacion": "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX",
        "fechaRequerida": "2025-11-15T08:00:00",
        "volumenEstimado": 45,
        "duracionEstimada": 4,
        "condicionesSitio": {
            "tipoObra": "Losa de cimentación",
            "accesoVehicular": "Disponible, calle pavimentada",
            "alturaLibre": "Sin obstáculos aéreos",
            "aguaDisponible": true,
            "distanciaColado": "5 metros"
        }
    }',
    'Urgente: Proyecto de edificio de 3 niveles. Necesitamos confirmar disponibilidad lo antes posible.'
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

-- Verificar que se crearon los datos
DO $$
DECLARE
    proveedor_count INTEGER;
    productos_count INTEGER;
    detalles_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO proveedor_count FROM providers WHERE razon_social LIKE '%Pumping Team%';
    SELECT COUNT(*) INTO productos_count FROM products WHERE provider_id = 'provider-pumping-team-001';
    SELECT COUNT(*) INTO detalles_count FROM bombeo_service_details
        WHERE product_id IN (
            SELECT id FROM products WHERE provider_id = 'provider-pumping-team-001'
        );

    RAISE NOTICE '==================================================';
    RAISE NOTICE '✅ DATOS DE PRUEBA CREADOS EXITOSAMENTE';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Proveedores Pumping Team: %', proveedor_count;
    RAISE NOTICE 'Productos de bombeo: %', productos_count;
    RAISE NOTICE 'Fichas técnicas: %', detalles_count;
    RAISE NOTICE '==================================================';

    IF proveedor_count > 0 AND productos_count > 0 AND detalles_count > 0 THEN
        RAISE NOTICE '🎉 Pumping Team está listo para recibir cotizaciones!';
    ELSE
        RAISE WARNING '⚠️  Algunos datos no se crearon correctamente';
    END IF;
END $$;

-- Mostrar resumen
SELECT
    'RESUMEN PUMPING TEAM' as info,
    (SELECT razon_social FROM providers WHERE id = 'provider-pumping-team-001') as proveedor,
    (SELECT COUNT(*) FROM products WHERE provider_id = 'provider-pumping-team-001') as total_servicios,
    (SELECT modelo_movilizacion FROM provider_service_policies WHERE provider_id = 'provider-pumping-team-001') as modelo_movilizacion;
