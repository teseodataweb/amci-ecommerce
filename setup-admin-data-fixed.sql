-- Script corregido para crear usuario admin y datos iniciales
-- IMPORTANTE: Cambia el email según tu usuario

-- ========================================
-- PASO 1: ACTUALIZAR TU USUARIO A ADMIN
-- ========================================
-- Cambia el email por el tuyo y descomenta la siguiente línea:

-- UPDATE users SET role = 'ADMIN' WHERE email = 'TU_EMAIL_AQUI@ejemplo.com';

-- ========================================
-- PASO 2: LIMPIAR DATOS ANTERIORES (Opcional)
-- ========================================
-- Si quieres limpiar datos anteriores, descomenta estas líneas:
-- DELETE FROM product_images;
-- DELETE FROM products;
-- DELETE FROM providers WHERE razon_social IN ('AP Safety S.A. de C.V.', 'MTM Refacciones Industriales S.A. de C.V.', 'Pumping Team México S.A. de C.V.', 'Plásticos Torres S.A. de C.V.');
-- DELETE FROM users WHERE email IN ('apsafety@proveedor.com', 'mtm@proveedor.com', 'pumping@proveedor.com', 'plasticos@proveedor.com');
-- DELETE FROM categories;

-- ========================================
-- PASO 3: CREAR CATEGORÍAS
-- ========================================
INSERT INTO categories (id, name, slug, description, image) VALUES
(gen_random_uuid(), 'Seguridad Industrial', 'seguridad-industrial', 'Equipos de protección personal y seguridad', 'https://images.unsplash.com/photo-1578662996442-48f60103fc27'),
(gen_random_uuid(), 'Hidráulica', 'hidraulica', 'Componentes y sistemas hidráulicos', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758'),
(gen_random_uuid(), 'Bombas y Sistemas', 'bombas-sistemas', 'Bombas industriales y sistemas de bombeo', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
(gen_random_uuid(), 'Iluminación LED', 'iluminacion-led', 'Soluciones de iluminación LED industrial', 'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5'),
(gen_random_uuid(), 'Herramientas', 'herramientas', 'Herramientas industriales y especializadas', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407'),
(gen_random_uuid(), 'Refacciones', 'refacciones', 'Refacciones y componentes industriales', 'https://images.unsplash.com/photo-1578662996442-48f60103fc27')
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- PASO 4: CREAR PROVEEDORES Y PRODUCTOS
-- ========================================

DO $$
DECLARE
    v_user_ap UUID;
    v_user_mtm UUID;
    v_user_pumping UUID;
    v_user_plasticos UUID;
    v_provider_ap UUID;
    v_provider_mtm UUID;
    v_provider_pumping UUID;
    v_provider_plasticos UUID;
    v_cat_seguridad UUID;
    v_cat_hidraulica UUID;
    v_cat_bombas UUID;
    v_cat_iluminacion UUID;
BEGIN
    -- Crear o obtener usuarios proveedores
    INSERT INTO users (id, email, name, role) VALUES
    (gen_random_uuid(), 'apsafety@proveedor.com', 'AP Safety', 'PROVEEDOR')
    ON CONFLICT (email) DO UPDATE SET id = users.id
    RETURNING id INTO v_user_ap;

    INSERT INTO users (id, email, name, role) VALUES
    (gen_random_uuid(), 'mtm@proveedor.com', 'MTM Refacciones', 'PROVEEDOR')
    ON CONFLICT (email) DO UPDATE SET id = users.id
    RETURNING id INTO v_user_mtm;

    INSERT INTO users (id, email, name, role) VALUES
    (gen_random_uuid(), 'pumping@proveedor.com', 'Pumping Team', 'PROVEEDOR')
    ON CONFLICT (email) DO UPDATE SET id = users.id
    RETURNING id INTO v_user_pumping;

    INSERT INTO users (id, email, name, role) VALUES
    (gen_random_uuid(), 'plasticos@proveedor.com', 'Plásticos Torres', 'PROVEEDOR')
    ON CONFLICT (email) DO UPDATE SET id = users.id
    RETURNING id INTO v_user_plasticos;

    -- Crear o obtener proveedores
    INSERT INTO providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
    VALUES (gen_random_uuid(), v_user_ap, 'AP Safety S.A. de C.V.', 'APS123456789', 'contacto@apsafety.com', 'PROVEEDOR', true)
    ON CONFLICT (rfc) DO UPDATE SET id = providers.id
    RETURNING id INTO v_provider_ap;

    INSERT INTO providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
    VALUES (gen_random_uuid(), v_user_mtm, 'MTM Refacciones Industriales S.A. de C.V.', 'MTM123456789', 'ventas@mtm.com', 'PROVEEDOR', true)
    ON CONFLICT (rfc) DO UPDATE SET id = providers.id
    RETURNING id INTO v_provider_mtm;

    INSERT INTO providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
    VALUES (gen_random_uuid(), v_user_pumping, 'Pumping Team México S.A. de C.V.', 'PTM123456789', 'info@pumpingteam.com', 'AMCI', true)
    ON CONFLICT (rfc) DO UPDATE SET id = providers.id
    RETURNING id INTO v_provider_pumping;

    INSERT INTO providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
    VALUES (gen_random_uuid(), v_user_plasticos, 'Plásticos Torres S.A. de C.V.', 'PTO123456789', 'ventas@plasticostorres.com', 'PROVEEDOR', true)
    ON CONFLICT (rfc) DO UPDATE SET id = providers.id
    RETURNING id INTO v_provider_plasticos;

    -- Obtener IDs de categorías
    SELECT id INTO v_cat_seguridad FROM categories WHERE slug = 'seguridad-industrial' LIMIT 1;
    SELECT id INTO v_cat_hidraulica FROM categories WHERE slug = 'hidraulica' LIMIT 1;
    SELECT id INTO v_cat_bombas FROM categories WHERE slug = 'bombas-sistemas' LIMIT 1;
    SELECT id INTO v_cat_iluminacion FROM categories WHERE slug = 'iluminacion-led' LIMIT 1;

    -- Verificar que tenemos las categorías
    IF v_cat_seguridad IS NULL OR v_cat_hidraulica IS NULL OR v_cat_bombas IS NULL OR v_cat_iluminacion IS NULL THEN
        RAISE NOTICE 'Algunas categorías no se encontraron. Verifica que se crearon correctamente.';
        RETURN;
    END IF;

    -- ========================================
    -- CREAR PRODUCTOS
    -- ========================================

    -- Productos de AP Safety
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    VALUES
    (v_provider_ap, v_cat_seguridad, 'Kit EPP Básico - 5 Personas', 'kit-epp-basico-5',
     'Kit completo de equipo de protección personal para 5 trabajadores. Incluye: cascos, lentes, guantes, chalecos.',
     2500.00, 'PRECIO', 'PROVEEDOR', true, true, 50),
    (v_provider_ap, v_cat_seguridad, 'Casco de Seguridad Industrial', 'casco-seguridad-industrial',
     'Casco de seguridad con suspensión de 4 puntos, resistente a impactos.',
     180.00, 'PRECIO', 'PROVEEDOR', true, true, 200),
    (v_provider_ap, v_cat_seguridad, 'Guantes de Seguridad Nivel 5', 'guantes-seguridad-nivel-5',
     'Guantes anticorte nivel 5, ideales para manejo de materiales peligrosos.',
     320.00, 'PRECIO', 'PROVEEDOR', true, true, 150)
    ON CONFLICT (slug) DO NOTHING;

    -- Productos de MTM
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    VALUES
    (v_provider_mtm, v_cat_hidraulica, 'Manguera Hidráulica SAE 100 R2', 'manguera-hidraulica-sae-100-r2',
     'Manguera hidráulica de alta presión, 1/2", rollo de 50 metros.',
     4500.00, 'PRECIO', 'PROVEEDOR', true, true, 30),
    (v_provider_mtm, v_cat_hidraulica, 'Conector Hidráulico Rápido', 'conector-hidraulico-rapido',
     'Conector rápido para sistemas hidráulicos, presión máxima 350 bar.',
     450.00, 'PRECIO', 'PROVEEDOR', true, true, 100),
    (v_provider_mtm, v_cat_hidraulica, 'Filtro Hidráulico Industrial', 'filtro-hidraulico-industrial',
     'Filtro de alta eficiencia para sistemas hidráulicos industriales.',
     890.00, 'PRECIO', 'PROVEEDOR', true, true, 75)
    ON CONFLICT (slug) DO NOTHING;

    -- Productos de Pumping Team
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    VALUES
    (v_provider_pumping, v_cat_bombas, 'Bomba Sumergible 5HP', 'bomba-sumergible-5hp',
     'Bomba sumergible de 5HP para aguas residuales, flujo máximo 250 GPM.',
     NULL, 'COTIZAR', 'AMCI', true, true, 0),
    (v_provider_pumping, v_cat_bombas, 'Bomba Centrífuga Industrial', 'bomba-centrifuga-industrial',
     'Bomba centrífuga de alta eficiencia para aplicaciones industriales.',
     NULL, 'COTIZAR', 'AMCI', true, true, 0),
    (v_provider_pumping, v_cat_bombas, 'Sistema de Bombeo Completo', 'sistema-bombeo-completo',
     'Sistema completo de bombeo con control automático y monitoreo remoto.',
     NULL, 'COTIZAR', 'AMCI', true, true, 0)
    ON CONFLICT (slug) DO NOTHING;

    -- Productos de Plásticos Torres
    INSERT INTO products (provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
    VALUES
    (v_provider_plasticos, v_cat_iluminacion, 'Plafón LED Industrial 100W', 'plafon-led-industrial-100w',
     'Plafón LED de alta potencia para naves industriales, 100W, luz fría.',
     1200.00, 'PRECIO', 'PROVEEDOR', true, true, 80),
    (v_provider_plasticos, v_cat_iluminacion, 'Pack 10 Tubos LED T8', 'pack-10-tubos-led-t8',
     'Paquete de 10 tubos LED T8 de 18W, ideal para oficinas y almacenes.',
     850.00, 'PRECIO', 'PROVEEDOR', true, true, 120),
    (v_provider_plasticos, v_cat_iluminacion, 'Reflector LED 200W', 'reflector-led-200w',
     'Reflector LED de alta potencia para exteriores, 200W, IP65.',
     2800.00, 'PRECIO', 'PROVEEDOR', true, true, 40)
    ON CONFLICT (slug) DO NOTHING;

    RAISE NOTICE 'Productos creados exitosamente';

END $$;

-- ========================================
-- PASO 5: AGREGAR IMÁGENES A PRODUCTOS
-- ========================================

-- Limpiar imágenes anteriores si existen
DELETE FROM product_images WHERE product_id IN (
    SELECT id FROM products WHERE slug IN (
        'kit-epp-basico-5', 'casco-seguridad-industrial', 'guantes-seguridad-nivel-5',
        'manguera-hidraulica-sae-100-r2', 'bomba-sumergible-5hp', 'plafon-led-industrial-100w'
    )
);

-- Agregar nuevas imágenes
INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800', 'Kit EPP Básico', 1
FROM products p WHERE p.slug = 'kit-epp-basico-5';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', 'Casco de Seguridad', 1
FROM products p WHERE p.slug = 'casco-seguridad-industrial';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1604762512326-af60d49a3b2f?w=800', 'Guantes de Seguridad', 1
FROM products p WHERE p.slug = 'guantes-seguridad-nivel-5';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800', 'Manguera Hidráulica', 1
FROM products p WHERE p.slug = 'manguera-hidraulica-sae-100-r2';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'Bomba Sumergible', 1
FROM products p WHERE p.slug = 'bomba-sumergible-5hp';

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5?w=800', 'Plafón LED Industrial', 1
FROM products p WHERE p.slug = 'plafon-led-industrial-100w';

-- ========================================
-- VERIFICAR RESULTADOS
-- ========================================
SELECT 'Categorías creadas:' as info, COUNT(*) as total FROM categories;
SELECT 'Proveedores creados:' as info, COUNT(*) as total FROM providers WHERE active = true;
SELECT 'Productos creados:' as info, COUNT(*) as total FROM products WHERE visible = true;
SELECT 'Imágenes agregadas:' as info, COUNT(*) as total FROM product_images;

-- ========================================
-- MENSAJE FINAL
-- ========================================
-- ¡Datos iniciales creados exitosamente!
-- IMPORTANTE: No olvides actualizar tu usuario a ADMIN con el comando de la línea 9