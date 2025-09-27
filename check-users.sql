-- ============================================
-- Script para verificar y corregir usuarios
-- Ejecuta esto en el SQL Editor de Supabase
-- ============================================

-- 1. Ver TODOS los usuarios y sus roles
SELECT id, email, name, role, created_at
FROM users
ORDER BY created_at DESC;

-- 2. Si hay usuarios sin rol o con rol NULL, actualízalos a CLIENTE
UPDATE users
SET role = 'CLIENTE'
WHERE role IS NULL;

-- 3. Para hacer un usuario específico ADMIN (cambia el email)
-- UPDATE users
-- SET role = 'ADMIN'
-- WHERE email = 'tu-email-admin@ejemplo.com';

-- 4. Verificar que todos tienen rol asignado
SELECT
  role,
  COUNT(*) as cantidad
FROM users
GROUP BY role;

-- 5. Si necesitas crear un usuario de prueba CLIENTE
-- INSERT INTO users (id, email, name, role, created_at, updated_at)
-- VALUES (
--   gen_random_uuid(),
--   'cliente@test.com',
--   'Cliente Test',
--   'CLIENTE',
--   NOW(),
--   NOW()
-- );

-- 6. Para debugging: Ver usuarios con sus IDs de auth.users
-- Esto te ayudará a vincular usuarios de Supabase Auth con tu tabla users
-- Ve a Authentication > Users en Supabase Dashboard para comparar IDs