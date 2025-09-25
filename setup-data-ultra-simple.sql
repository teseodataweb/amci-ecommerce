-- Script ultra simplificado para crear datos de prueba
-- Sin bloques PL/pgSQL, solo INSERTs directos

-- ========================================
-- PASO 1: HACER TU USUARIO ADMIN
-- ========================================
-- IMPORTANTE: Cambia el email por el tuyo
UPDATE users SET role = 'ADMIN' WHERE email = 'TU_EMAIL_AQUI@ejemplo.com';

-- ========================================
-- PASO 2: CREAR CATEGORÍAS
-- ========================================
INSERT INTO categories (name, slug, description, image) VALUES
('Seguridad Industrial', 'seguridad-industrial', 'Equipos de protección personal y seguridad', 'https://images.unsplash.com/photo-1578662996442-48f60103fc27'),
('Hidráulica', 'hidraulica', 'Componentes y sistemas hidráulicos', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758'),
('Bombas y Sistemas', 'bombas-sistemas', 'Bombas industriales y sistemas de bombeo', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'),
('Iluminación LED', 'iluminacion-led', 'Soluciones de iluminación LED industrial', 'https://images.unsplash.com/photo-1565636192335-3b7e78e8f7b5')
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- PASO 3: VERIFICAR QUE SE CREARON
-- ========================================
SELECT 'Categorías creadas:' as info, COUNT(*) as total FROM categories;