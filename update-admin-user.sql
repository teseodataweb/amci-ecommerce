-- Script para actualizar un usuario existente a rol ADMIN
-- Ejecuta esto en el SQL Editor de Supabase

-- Cambia este email por el tuyo
UPDATE users
SET role = 'ADMIN'
WHERE email = 'tu-email@ejemplo.com';

-- Verificar el cambio
SELECT id, email, name, role FROM users WHERE email = 'tu-email@ejemplo.com';