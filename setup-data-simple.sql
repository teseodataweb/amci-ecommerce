-- Script simplificado para crear datos de prueba
-- Ejecuta cada sección por separado si hay errores

-- ========================================
-- SECCIÓN 1: HACER TU USUARIO ADMIN
-- ========================================
-- IMPORTANTE: Cambia el email por el tuyo
UPDATE users SET role = 'ADMIN' WHERE email = 'TU_EMAIL_AQUI@ejemplo.com';

-- ========================================
-- SECCIÓN 2: CREAR CATEGORÍAS
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
-- SECCIÓN 3: CREAR UN PROVEEDOR DE PRUEBA
-- ========================================
-- Primero crear usuario proveedor
INSERT INTO users (email, name, role)
VALUES ('proveedor.prueba@test.com', 'Proveedor de Prueba', 'PROVEEDOR')
ON CONFLICT (email) DO NOTHING;

-- Luego crear el registro de proveedor
INSERT INTO providers (user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
SELECT id, 'Empresa de Prueba S.A. de C.V.', 'EMP123456789', 'contacto@prueba.com', 'PROVEEDOR', true
FROM users
WHERE email = 'proveedor.prueba@test.com'
ON CONFLICT (rfc) DO NOTHING;

-- ========================================
-- SECCIÓN 4: CREAR PRODUCTOS DE EJEMPLO
-- ========================================
-- Productos de Seguridad Industrial
INSERT INTO products (
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
SELECT
    p.id as provider_id,
    c.id as category_id,
    'Kit EPP Básico - 5 Personas' as nombre,
    'kit-epp-basico-5' as slug,
    'Kit completo de equipo de protección personal para 5 trabajadores. Incluye: cascos, lentes, guantes, chalecos.' as descripcion,
    2500.00 as precio,
    'PRECIO' as pricing_mode,
    'PROVEEDOR' as emisor_factura,
    true as visible,
    true as approved,
    50 as stock
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'seguridad-industrial'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Casco de Seguridad Industrial',
    'casco-seguridad-industrial',
    'Casco de seguridad con suspensión de 4 puntos, resistente a impactos.',
    180.00,
    'PRECIO',
    'PROVEEDOR',
    true,
    true,
    200
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'seguridad-industrial'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Guantes de Seguridad Nivel 5',
    'guantes-seguridad-nivel-5',
    'Guantes anticorte nivel 5, ideales para manejo de materiales peligrosos.',
    320.00,
    'PRECIO',
    'PROVEEDOR',
    true,
    true,
    150
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'seguridad-industrial'
ON CONFLICT (slug) DO NOTHING;

-- Productos de Hidráulica
INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Manguera Hidráulica SAE 100 R2',
    'manguera-hidraulica-sae-100-r2',
    'Manguera hidráulica de alta presión, 1/2", rollo de 50 metros.',
    4500.00,
    'PRECIO',
    'PROVEEDOR',
    true,
    true,
    30
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'hidraulica'
ON CONFLICT (slug) DO NOTHING;

-- Productos de Bombas
INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Bomba Sumergible 5HP',
    'bomba-sumergible-5hp',
    'Bomba sumergible de 5HP para aguas residuales, flujo máximo 250 GPM.',
    NULL,
    'COTIZAR',
    'AMCI',
    true,
    true,
    0
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'bombas-sistemas'
ON CONFLICT (slug) DO NOTHING;

-- Productos de Iluminación LED
INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Plafón LED Industrial 100W',
    'plafon-led-industrial-100w',
    'Plafón LED de alta potencia para naves industriales, 100W, luz fría.',
    1200.00,
    'PRECIO',
    'PROVEEDOR',
    true,
    true,
    80
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'iluminacion-led'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
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
SELECT
    p.id,
    c.id,
    'Pack 10 Tubos LED T8',
    'pack-10-tubos-led-t8',
    'Paquete de 10 tubos LED T8 de 18W, ideal para oficinas y almacenes.',
    850.00,
    'PRECIO',
    'PROVEEDOR',
    true,
    true,
    120
FROM providers p, categories c
WHERE p.rfc = 'EMP123456789'
AND c.slug = 'iluminacion-led'
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- SECCIÓN 5: AGREGAR IMÁGENES A PRODUCTOS
-- ========================================
INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800', 'Kit EPP Básico', 1
FROM products p WHERE p.slug = 'kit-epp-basico-5'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', 'Casco de Seguridad', 1
FROM products p WHERE p.slug = 'casco-seguridad-industrial'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1604762512326-af60d49a3b2f?w=800', 'Guantes de Seguridad', 1
FROM products p WHERE p.slug = 'guantes-seguridad-nivel-5'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800', 'Manguera Hidráulica', 1
FROM products p WHERE p.slug = 'manguera-hidraulica-sae-100-r2'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'Bomba Sumergible', 1
FROM products p WHERE p.slug = 'bomba-sumergible-5hp'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, url, alt, "order")
SELECT p.id, 'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5?w=800', 'Plafón LED Industrial', 1
FROM products p WHERE p.slug = 'plafon-led-industrial-100w'
ON CONFLICT DO NOTHING;

-- ========================================
-- VERIFICAR QUE TODO SE CREÓ
-- ========================================
SELECT 'Categorías:' as tipo, COUNT(*) as total FROM categories
UNION ALL
SELECT 'Proveedores activos:' as tipo, COUNT(*) as total FROM providers WHERE active = true
UNION ALL
SELECT 'Productos visibles:' as tipo, COUNT(*) as total FROM products WHERE visible = true
UNION ALL
SELECT 'Productos con imagen:' as tipo, COUNT(DISTINCT product_id) as total FROM product_images;

-- ¡Listo! Los datos de prueba han sido creados.