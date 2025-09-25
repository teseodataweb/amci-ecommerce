-- Script para crear usuario admin y datos iniciales
-- IMPORTANTE: Cambia el email y el ID del admin según tu usuario

-- ========================================
-- PASO 1: ACTUALIZAR TU USUARIO A ADMIN
-- ========================================
-- Primero, busca tu usuario en la tabla users y copia su ID
-- Luego, descomenta y ejecuta esta línea con TU ID:

-- UPDATE users SET role = 'ADMIN' WHERE email = 'TU_EMAIL_AQUI@ejemplo.com';

-- ========================================
-- PASO 2: CREAR CATEGORÍAS
-- ========================================
INSERT INTO categories (name, slug, description, image) VALUES
('Seguridad Industrial', 'seguridad-industrial', 'Equipos de protección personal y seguridad', 'https://images.unsplash.com/photo-1578662996442-48f60103fc27'),
('Hidráulica', 'hidraulica', 'Componentes y sistemas hidráulicos', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758'),
('Bombas y Sistemas', 'bombas-sistemas', 'Bombas industriales y sistemas de bombeo', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Iluminación LED', 'iluminacion-led', 'Soluciones de iluminación LED industrial', 'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5'),
('Herramientas', 'herramientas', 'Herramientas industriales y especializadas', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407'),
('Refacciones', 'refacciones', 'Refacciones y componentes industriales', 'https://images.unsplash.com/photo-1578662996442-48f60103fc27')
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- PASO 3: CREAR PROVEEDORES DE PRUEBA
-- ========================================

-- Primero necesitamos crear usuarios para los proveedores
-- Estos son usuarios ficticios para prueba
DO $$
DECLARE
    user_ap_safety UUID := gen_random_uuid();
    user_mtm UUID := gen_random_uuid();
    user_pumping UUID := gen_random_uuid();
    user_plasticos UUID := gen_random_uuid();
    provider_ap_safety UUID;
    provider_mtm UUID;
    provider_pumping UUID;
    provider_plasticos UUID;
    cat_seguridad UUID;
    cat_hidraulica UUID;
    cat_bombas UUID;
    cat_iluminacion UUID;
BEGIN
    -- Insertar usuarios proveedores
    INSERT INTO users (id, email, name, role) VALUES
    (user_ap_safety, 'apsafety@proveedor.com', 'AP Safety', 'PROVEEDOR'),
    (user_mtm, 'mtm@proveedor.com', 'MTM Refacciones', 'PROVEEDOR'),
    (user_pumping, 'pumping@proveedor.com', 'Pumping Team', 'PROVEEDOR'),
    (user_plasticos, 'plasticos@proveedor.com', 'Plásticos Torres', 'PROVEEDOR')
    ON CONFLICT (email) DO NOTHING;

    -- Insertar proveedores
    INSERT INTO providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
    VALUES
    (gen_random_uuid(), user_ap_safety, 'AP Safety S.A. de C.V.', 'APS123456789', 'contacto@apsafety.com', 'PROVEEDOR', true),
    (gen_random_uuid(), user_mtm, 'MTM Refacciones Industriales S.A. de C.V.', 'MTM123456789', 'ventas@mtm.com', 'PROVEEDOR', true),
    (gen_random_uuid(), user_pumping, 'Pumping Team México S.A. de C.V.', 'PTM123456789', 'info@pumpingteam.com', 'AMCI', true),
    (gen_random_uuid(), user_plasticos, 'Plásticos Torres S.A. de C.V.', 'PTO123456789', 'ventas@plasticostorres.com', 'PROVEEDOR', true)
    ON CONFLICT DO NOTHING
    RETURNING id INTO provider_ap_safety, provider_mtm, provider_pumping, provider_plasticos;

    -- Obtener IDs de categorías
    SELECT id INTO cat_seguridad FROM categories WHERE slug = 'seguridad-industrial' LIMIT 1;
    SELECT id INTO cat_hidraulica FROM categories WHERE slug = 'hidraulica' LIMIT 1;
    SELECT id INTO cat_bombas FROM categories WHERE slug = 'bombas-sistemas' LIMIT 1;
    SELECT id INTO cat_iluminacion FROM categories WHERE slug = 'iluminacion-led' LIMIT 1;

    -- ========================================
    -- PASO 4: CREAR PRODUCTOS DE EJEMPLO
    -- ========================================

    -- Productos de AP Safety (Seguridad Industrial)
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_seguridad,
        'Kit EPP Básico - 5 Personas',
        'kit-epp-basico-5',
        'Kit completo de equipo de protección personal para 5 trabajadores. Incluye: cascos, lentes, guantes, chalecos.',
        2500.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        50
    FROM providers p WHERE p.razon_social LIKE 'AP Safety%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_seguridad,
        'Casco de Seguridad Industrial',
        'casco-seguridad-industrial',
        'Casco de seguridad con suspensión de 4 puntos, resistente a impactos.',
        180.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        200
    FROM providers p WHERE p.razon_social LIKE 'AP Safety%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_seguridad,
        'Guantes de Seguridad Nivel 5',
        'guantes-seguridad-nivel-5',
        'Guantes anticorte nivel 5, ideales para manejo de materiales peligrosos.',
        320.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        150
    FROM providers p WHERE p.razon_social LIKE 'AP Safety%' LIMIT 1;

    -- Productos de MTM (Hidráulica)
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_hidraulica,
        'Manguera Hidráulica SAE 100 R2',
        'manguera-hidraulica-sae-100-r2',
        'Manguera hidráulica de alta presión, 1/2", rollo de 50 metros.',
        4500.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        30
    FROM providers p WHERE p.razon_social LIKE 'MTM%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_hidraulica,
        'Conector Hidráulico Rápido',
        'conector-hidraulico-rapido',
        'Conector rápido para sistemas hidráulicos, presión máxima 350 bar.',
        450.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        100
    FROM providers p WHERE p.razon_social LIKE 'MTM%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_hidraulica,
        'Filtro Hidráulico Industrial',
        'filtro-hidraulico-industrial',
        'Filtro de alta eficiencia para sistemas hidráulicos industriales.',
        890.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        75
    FROM providers p WHERE p.razon_social LIKE 'MTM%' LIMIT 1;

    -- Productos de Pumping Team (Bombas)
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_bombas,
        'Bomba Sumergible 5HP',
        'bomba-sumergible-5hp',
        'Bomba sumergible de 5HP para aguas residuales, flujo máximo 250 GPM.',
        NULL,
        'COTIZAR',
        'AMCI',
        true,
        true,
        0
    FROM providers p WHERE p.razon_social LIKE 'Pumping Team%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_bombas,
        'Bomba Centrífuga Industrial',
        'bomba-centrifuga-industrial',
        'Bomba centrífuga de alta eficiencia para aplicaciones industriales.',
        NULL,
        'COTIZAR',
        'AMCI',
        true,
        true,
        0
    FROM providers p WHERE p.razon_social LIKE 'Pumping Team%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_bombas,
        'Sistema de Bombeo Completo',
        'sistema-bombeo-completo',
        'Sistema completo de bombeo con control automático y monitoreo remoto.',
        NULL,
        'COTIZAR',
        'AMCI',
        true,
        true,
        0
    FROM providers p WHERE p.razon_social LIKE 'Pumping Team%' LIMIT 1;

    -- Productos de Plásticos Torres (Iluminación)
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_iluminacion,
        'Plafón LED Industrial 100W',
        'plafon-led-industrial-100w',
        'Plafón LED de alta potencia para naves industriales, 100W, luz fría.',
        1200.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        80
    FROM providers p WHERE p.razon_social LIKE 'Plásticos Torres%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_iluminacion,
        'Pack 10 Tubos LED T8',
        'pack-10-tubos-led-t8',
        'Paquete de 10 tubos LED T8 de 18W, ideal para oficinas y almacenes.',
        850.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        120
    FROM providers p WHERE p.razon_social LIKE 'Plásticos Torres%' LIMIT 1;

    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    SELECT
        p.id,
        cat_iluminacion,
        'Reflector LED 200W',
        'reflector-led-200w',
        'Reflector LED de alta potencia para exteriores, 200W, IP65.',
        2800.00,
        'PRECIO',
        'PROVEEDOR',
        true,
        true,
        40
    FROM providers p WHERE p.razon_social LIKE 'Plásticos Torres%' LIMIT 1;

END $$;

-- ========================================
-- PASO 5: AGREGAR IMÁGENES A PRODUCTOS
-- ========================================
INSERT INTO product_images (product_id, url, alt, "order")
SELECT
    p.id,
    'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800',
    'Kit EPP Básico',
    1
FROM products p WHERE p.slug = 'kit-epp-basico-5';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT
    p.id,
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    'Casco de Seguridad',
    1
FROM products p WHERE p.slug = 'casco-seguridad-industrial';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT
    p.id,
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'Bomba Sumergible',
    1
FROM products p WHERE p.slug = 'bomba-sumergible-5hp';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT
    p.id,
    'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5?w=800',
    'Plafón LED Industrial',
    1
FROM products p WHERE p.slug = 'plafon-led-industrial-100w';

-- ========================================
-- MENSAJE FINAL
-- ========================================
-- ¡Datos iniciales creados!
-- IMPORTANTE: No olvides actualizar tu usuario a ADMIN con el primer comando