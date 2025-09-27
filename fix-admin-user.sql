-- ============================================
-- Script para corregir problemas de usuarios y roles
-- Ejecuta esto en el SQL Editor de Supabase
-- ============================================

-- 1. Ver todos los usuarios registrados
SELECT id, email, name, role, created_at
FROM users
ORDER BY created_at DESC;

-- 2. IMPORTANTE: Actualiza el email aquí con el tuyo
-- Cambia 'tu-email@ejemplo.com' por el email con el que te registraste
UPDATE users
SET role = 'ADMIN'
WHERE email = 'tu-email@ejemplo.com';

-- 3. Verificar que el cambio se aplicó correctamente
SELECT id, email, name, role
FROM users
WHERE email = 'tu-email@ejemplo.com';

-- 4. Si no aparece tu usuario, probablemente no se creó el perfil
-- En ese caso, primero verifica en auth.users de Supabase
-- y luego crea el perfil manualmente:

/*
-- Descomenta y ejecuta esto si necesitas crear el perfil manualmente
-- Reemplaza los valores con tus datos

INSERT INTO users (id, email, name, role, created_at, updated_at)
VALUES (
  'ID-DEL-USUARIO-EN-AUTH', -- Obtén este ID de la tabla auth.users en Supabase
  'tu-email@ejemplo.com',
  'Tu Nombre',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET role = 'ADMIN';
*/

-- 5. Para ver los IDs de usuarios en auth (tabla de Supabase)
-- Ve al Authentication > Users en el dashboard de Supabase
-- y copia el UUID del usuario que quieres hacer admin