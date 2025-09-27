# 📋 GUÍA: ALTA DE PROVEEDORES Y PRODUCTOS

## 🎯 Objetivo
Esta guía te ayudará a dar de alta proveedores, productos y órdenes de prueba en tu base de datos de Supabase para probar el sistema completo.

---

## 1️⃣ ALTA DE PROVEEDOR

### Opción A: Usando el formulario de registro (Recomendado)

1. Ve a `http://localhost:3002/registro-proveedor`
2. Llena el formulario con:
   - Email del proveedor
   - Contraseña
   - Nombre de contacto
   - Teléfono
   - Razón Social
   - RFC (13 caracteres)
   - Contacto operativo
   - Contacto de facturación
   - CLABE (18 dígitos)
3. Haz click en "Registrar Proveedor"

### Opción B: Directamente en SQL (Para pruebas rápidas)

Ejecuta este script en el SQL Editor de Supabase:

```sql
-- PASO 1: Crear usuario en auth.users (usa el dashboard de Supabase)
-- Ve a Authentication > Users > Add user
-- Email: proveedor@test.com
-- Password: (tu elección)
-- Copia el UUID del usuario creado

-- PASO 2: Crear registro en tabla users
INSERT INTO users (id, email, name, phone, role, created_at, updated_at)
VALUES (
  'UUID-DEL-USUARIO-AUTH', -- Reemplaza con el UUID del paso 1
  'proveedor@test.com',
  'Proveedor de Prueba',
  '5512345678',
  'PROVEEDOR',
  NOW(),
  NOW()
);

-- PASO 3: Crear registro en tabla providers
INSERT INTO providers (
  id,
  user_id,
  razon_social,
  rfc,
  contacto_operativo,
  contacto_facturacion,
  clabe,
  emisor_factura_default,
  active,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'UUID-DEL-USUARIO-AUTH', -- El mismo UUID del paso 1
  'Proveedor de Prueba S.A. de C.V.',
  'PPR123456XXX',
  'Juan Pérez - juan@proveedor.com',
  'Maria Lopez - maria@proveedor.com',
  '012345678901234567',
  'PROVEEDOR',
  true, -- IMPORTANTE: true para activar al proveedor
  NOW(),
  NOW()
);
```

---

## 2️⃣ ALTA DE CATEGORÍAS

Las categorías son necesarias para crear productos.

```sql
-- Crear categorías de prueba
INSERT INTO categories (id, name, slug, description, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'Seguridad Industrial', 'seguridad-industrial', 'Equipo de protección personal y seguridad', NOW(), NOW()),
  (gen_random_uuid(), 'Equipos', 'equipos', 'Equipos industriales y maquinaria', NOW(), NOW()),
  (gen_random_uuid(), 'Iluminación', 'iluminacion', 'Sistemas de iluminación LED', NOW(), NOW()),
  (gen_random_uuid(), 'Herramientas', 'herramientas', 'Herramientas eléctricas y manuales', NOW(), NOW());

-- Verificar categorías creadas
SELECT id, name, slug FROM categories;
```

---

## 3️⃣ ALTA DE PRODUCTOS

Para crear productos, necesitas:
- ID del proveedor (obtenido en paso 1)
- ID de categoría (obtenido en paso 2)

```sql
-- Obtener IDs necesarios
SELECT p.id as provider_id, p.razon_social, c.id as category_id, c.name as category_name
FROM providers p
CROSS JOIN categories c
WHERE p.razon_social = 'Proveedor de Prueba S.A. de C.V.'
  AND c.slug = 'seguridad-industrial';

-- Crear producto de prueba
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
  stock,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'PROVIDER_ID_AQUI', -- Reemplaza con el ID del proveedor
  'CATEGORY_ID_AQUI', -- Reemplaza con el ID de la categoría
  'Kit EPP Completo - 1 Persona',
  'kit-epp-completo-1-persona',
  'Kit de equipo de protección personal que incluye: casco, googles, mascarilla, guantes, chaleco reflejante y botas. Cumple con normas NOM-017-STPS.',
  450.00,
  'PRECIO', -- O 'COTIZAR' si no tiene precio fijo
  'PROVEEDOR',
  true, -- visible en catálogo
  false, -- pendiente de aprobación por admin
  100, -- stock disponible
  NOW(),
  NOW()
);

-- Agregar imagen al producto
INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
VALUES (
  gen_random_uuid(),
  'PRODUCT_ID_AQUI', -- Reemplaza con el ID del producto creado arriba
  '/img/products/epp-kit-completo.jpg', -- Ruta de la imagen
  'Kit EPP Completo',
  0,
  NOW()
);
```

### Crear múltiples productos rápidamente:

```sql
-- Script para crear 5 productos de prueba
DO $$
DECLARE
  v_provider_id UUID;
  v_category_id UUID;
  v_product_id UUID;
BEGIN
  -- Obtener IDs del proveedor y categoría
  SELECT id INTO v_provider_id FROM providers WHERE razon_social = 'Proveedor de Prueba S.A. de C.V.' LIMIT 1;
  SELECT id INTO v_category_id FROM categories WHERE slug = 'seguridad-industrial' LIMIT 1;

  -- Producto 1
  v_product_id := gen_random_uuid();
  INSERT INTO products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock, created_at, updated_at)
  VALUES (v_product_id, v_provider_id, v_category_id, 'Kit EPP Básico', 'kit-epp-basico', 'Kit básico de protección personal', 350.00, 'PRECIO', 'PROVEEDOR', true, false, 50, NOW(), NOW());
  INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
  VALUES (gen_random_uuid(), v_product_id, '/img/placeholder-product.jpg', 'Kit EPP Básico', 0, NOW());

  -- Producto 2
  v_product_id := gen_random_uuid();
  INSERT INTO products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock, created_at, updated_at)
  VALUES (v_product_id, v_provider_id, v_category_id, 'Casco Industrial', 'casco-industrial', 'Casco de seguridad certificado', 120.00, 'PRECIO', 'PROVEEDOR', true, true, 200, NOW(), NOW());
  INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
  VALUES (gen_random_uuid(), v_product_id, '/img/placeholder-product.jpg', 'Casco Industrial', 0, NOW());

  -- Producto 3
  v_product_id := gen_random_uuid();
  INSERT INTO products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock, created_at, updated_at)
  VALUES (v_product_id, v_provider_id, v_category_id, 'Guantes de Seguridad', 'guantes-seguridad', 'Guantes industriales reforzados', 85.00, 'PRECIO', 'PROVEEDOR', true, true, 500, NOW(), NOW());
  INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
  VALUES (gen_random_uuid(), v_product_id, '/img/placeholder-product.jpg', 'Guantes de Seguridad', 0, NOW());

  -- Producto 4 (sin precio, para cotización)
  v_product_id := gen_random_uuid();
  INSERT INTO products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock, created_at, updated_at)
  VALUES (v_product_id, v_provider_id, v_category_id, 'Sistema de Seguridad Completo', 'sistema-seguridad-completo', 'Sistema completo personalizado según necesidades', NULL, 'COTIZAR', 'PROVEEDOR', true, true, 0, NOW(), NOW());
  INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
  VALUES (gen_random_uuid(), v_product_id, '/img/placeholder-product.jpg', 'Sistema de Seguridad', 0, NOW());

  -- Producto 5 (pendiente de aprobación)
  v_product_id := gen_random_uuid();
  INSERT INTO products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock, created_at, updated_at)
  VALUES (v_product_id, v_provider_id, v_category_id, 'Botas de Seguridad Premium', 'botas-seguridad-premium', 'Botas con puntera de acero y suela antiderrapante', 650.00, 'PRECIO', 'PROVEEDOR', true, false, 30, NOW(), NOW());
  INSERT INTO product_images (id, product_id, url, alt, "order", created_at)
  VALUES (gen_random_uuid(), v_product_id, '/img/placeholder-product.jpg', 'Botas de Seguridad', 0, NOW());

  RAISE NOTICE 'Productos creados exitosamente!';
END $$;
```

---

## 4️⃣ VERIFICAR DATOS

```sql
-- Ver todos los proveedores
SELECT p.id, p.razon_social, p.rfc, p.active, u.email
FROM providers p
JOIN users u ON p.user_id = u.id;

-- Ver todos los productos con su proveedor y categoría
SELECT
  pr.nombre as producto,
  prov.razon_social as proveedor,
  c.name as categoria,
  pr.precio,
  pr.pricing_mode,
  pr.approved,
  pr.visible,
  pr.stock
FROM products pr
JOIN providers prov ON pr.provider_id = prov.id
JOIN categories c ON pr.category_id = c.id
ORDER BY pr.created_at DESC;

-- Ver productos pendientes de aprobación
SELECT nombre, razon_social as proveedor, precio
FROM products p
JOIN providers prov ON p.provider_id = prov.id
WHERE p.approved = false;
```

---

## 5️⃣ APROBAR PRODUCTOS (Como Admin)

### Opción A: Desde el panel admin
1. Inicia sesión como admin
2. Ve a `http://localhost:3002/panel/admin`
3. En la pestaña "Productos", verás los productos pendientes
4. Click en "Aprobar" para cada producto

### Opción B: Directamente en SQL
```sql
-- Aprobar todos los productos de un proveedor
UPDATE products
SET approved = true, visible = true
WHERE provider_id = 'PROVIDER_ID_AQUI';

-- Aprobar producto específico
UPDATE products
SET approved = true, visible = true
WHERE slug = 'kit-epp-basico';
```

---

## 6️⃣ CREAR ORDEN DE PRUEBA

```sql
-- Crear dirección de envío
INSERT INTO addresses (id, user_id, alias, nombre, calle, numero, colonia, ciudad, estado, codigo_postal, is_default, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'USER_ID_CLIENTE', -- ID del usuario cliente
  'Casa',
  'Juan Pérez',
  'Av. Insurgentes',
  '123',
  'Roma Norte',
  'Ciudad de México',
  'CDMX',
  '06700',
  true,
  NOW(),
  NOW()
);

-- Crear orden
INSERT INTO orders (id, cliente_id, address_id, total, subtotal, envio, impuestos, estado, payment_status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'USER_ID_CLIENTE', -- ID del usuario cliente
  'ADDRESS_ID_AQUI', -- ID de la dirección creada arriba
  580.00, -- total
  500.00, -- subtotal
  80.00, -- envío
  0.00, -- impuestos
  'RECIBIDO',
  'paid',
  NOW(),
  NOW()
);

-- Agregar items a la orden
INSERT INTO order_items (id, order_id, product_id, qty, precio_unit, subtotal, created_at)
VALUES (
  gen_random_uuid(),
  'ORDER_ID_AQUI', -- ID de la orden creada arriba
  'PRODUCT_ID_AQUI', -- ID de un producto
  2, -- cantidad
  250.00, -- precio unitario
  500.00, -- subtotal
  NOW()
);
```

---

## ✅ RESUMEN DEL FLUJO

1. **Crear Proveedor** → Usuario con rol PROVEEDOR + registro en tabla `providers`
2. **Crear Categorías** → Para organizar productos
3. **Crear Productos** → Vinculados a proveedor y categoría
4. **Aprobar Productos** → Admin aprueba desde panel o SQL
5. **Los productos aparecen en el catálogo** → Los clientes pueden comprar
6. **Se generan órdenes** → Al completar compras

---

## 🔍 SOLUCIÓN DE PROBLEMAS

### Problema: "Proveedor no aparece activo"
```sql
UPDATE providers SET active = true WHERE email = 'proveedor@test.com';
```

### Problema: "Productos no aparecen en catálogo"
```sql
UPDATE products SET visible = true, approved = true WHERE provider_id = 'PROVIDER_ID';
```

### Problema: "No puedo acceder al panel de proveedor"
```sql
-- Verificar rol
SELECT email, role FROM users WHERE email = 'proveedor@test.com';

-- Actualizar rol si es necesario
UPDATE users SET role = 'PROVEEDOR' WHERE email = 'proveedor@test.com';
```

---

## 📞 SOPORTE

Si tienes problemas, verifica:
1. ✅ Las políticas RLS están habilitadas (`supabase-rls-policies.sql`)
2. ✅ Las variables de entorno en `.env` están correctas
3. ✅ El servidor está corriendo (`npm run dev`)
4. ✅ Los logs de la consola del navegador (F12)