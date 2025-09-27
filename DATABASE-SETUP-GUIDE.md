# 🔧 GUÍA COMPLETA DE CONFIGURACIÓN DE BASE DE DATOS

## ❗ PROBLEMA IDENTIFICADO

Los usuarios no pueden acceder a páginas protegidas (panel admin, checkout, órdenes, reportes) porque **el perfil del usuario no se carga correctamente desde la base de datos**.

## 🚨 PASOS CRÍTICOS PARA RESOLVER

### 1. VERIFICAR USUARIO EN BASE DE DATOS

Ve a tu dashboard de Supabase → SQL Editor y ejecuta:

```sql
-- Ver todos los usuarios en auth.users (tabla de Supabase)
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Ver usuarios en tu tabla personalizada
SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC;
```

**Si no aparece tu usuario en la tabla `users`**: Ahí está el problema principal.

### 2. CREAR TU USUARIO ADMIN

Si no existe tu usuario en la tabla `users`, ejecútalo:

```sql
-- REEMPLAZA 'TU_EMAIL_AQUI' con el email con el que te registraste
INSERT INTO users (id, email, name, role, created_at, updated_at)
SELECT
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', 'Admin User') as name,
    'ADMIN' as role,
    created_at,
    NOW()
FROM auth.users
WHERE email = 'TU_EMAIL_AQUI@ejemplo.com'
ON CONFLICT (id) DO UPDATE
SET role = 'ADMIN', updated_at = NOW();
```

### 3. CONFIGURAR POLÍTICAS RLS

Ejecuta el archivo `supabase-rls-policies.sql` completo en el SQL Editor.

### 4. VERIFICAR CONEXIÓN

Abre el navegador en http://localhost:3002 y:

1. Abre las DevTools (F12) → Console
2. Intenta hacer login
3. Ve a cualquier página protegida (ej: `/panel/admin`)
4. Observa los mensajes de consola

**Mensajes esperados:**
```
AuthContext: Initializing authentication state
AuthContext: User found in session, fetching profile
API: Fetching user profile for ID: [tu-user-id]
AuthContext: User profile loaded successfully: [tu-email] Role: ADMIN
ProtectedRoute: User authorized with role: ADMIN
```

**Si ves estos errores, necesitamos más info:**
- "Error fetching user profile"
- "User not found in database"
- "Profile loading timeout"

---

## 📊 COMANDO DE DIAGNÓSTICO RÁPIDO

Ejecuta esto en el SQL Editor para ver el estado completo:

```sql
-- DIAGNÓSTICO COMPLETO
SELECT 'AUTH USERS' as tabla, COUNT(*) as total FROM auth.users
UNION ALL
SELECT 'CUSTOM USERS', COUNT(*) FROM users
UNION ALL
SELECT 'PROVIDERS', COUNT(*) FROM providers
UNION ALL
SELECT 'PRODUCTS', COUNT(*) FROM products
UNION ALL
SELECT 'CATEGORIES', COUNT(*) FROM categories;

-- VER TUS DATOS ESPECÍFICOS
SELECT
    'En auth.users' as ubicacion,
    id,
    email,
    created_at
FROM auth.users
WHERE email LIKE '%@%' -- Pon parte de tu email aquí
ORDER BY created_at DESC;

SELECT
    'En users table' as ubicacion,
    id,
    email,
    name,
    role,
    created_at
FROM users
WHERE email LIKE '%@%' -- Pon parte de tu email aquí
ORDER BY created_at DESC;
```

---

## 🔧 CORRECCIONES APLICADAS

### ✅ API de usuarios arreglada
- Eliminado el error del `supabaseAdmin()`
- Agregado manejo robusto de errores
- Creación automática de perfiles básicos si no existen

### ✅ AuthContext mejorado
- Mejor manejo de errores de red
- Logs detallados para debugging
- Perfiles de emergencia para evitar bloqueos

### ✅ ProtectedRoute con timeout
- Timeout de 10 segundos para evitar esperas infinitas
- Mejor logging de estados
- Manejo inteligente de roles

### ✅ Carrito arreglado
- Uso de `maybeSingle()` en lugar de `single()`
- Consultas separadas para mejor rendimiento
- Manejo robusto de errores

---

## 🚀 PRÓXIMOS PASOS

1. **Ejecuta los scripts SQL mencionados**
2. **Verifica los logs en la consola del navegador**
3. **Prueba el acceso a páginas protegidas**

Si sigues teniendo problemas después de esto, compárteme:
- Los resultados del diagnóstico SQL
- Los mensajes de la consola del navegador
- Tu email de usuario para verificar la configuración

---

## 📱 ACCESO RÁPIDO

- **Aplicación**: http://localhost:3002
- **Supabase Dashboard**: https://supabase.com/dashboard
- **SQL Editor**: Dashboard → SQL Editor
- **Authentication**: Dashboard → Authentication → Users

---

*Los cambios están aplicados en el código. Solo necesitas configurar la base de datos correctamente.*