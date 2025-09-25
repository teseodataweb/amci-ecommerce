# Contexto Técnico - E-commerce AMCI

## Arquitectura Actual

### Stack Tecnológico
- **Frontend**: Next.js 13.2.4 + React 18.2.0 + TypeScript
- **Base de datos**: PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth
- **Estilos**: Bootstrap 5 + Sass
- **Template base**: Digitek (limpiado y personalizado)

### Estructura de Base de Datos

```sql
-- Tablas principales
users (id, email, name, role, phone, created_at)
products (id, provider_id, category_id, nombre, slug, descripcion, precio, pricing_mode, emisor_factura, visible, approved, stock)
categories (id, name, slug, description, image)
providers (id, user_id, razon_social, rfc, contacto_operativo, emisor_factura_default, active)
orders (id, numero_orden, cliente_id, provider_id, fecha, subtotal, envio, total, status, factura_emitida, emisor_factura)
order_items (id, order_id, product_id, cantidad, precio_unitario, total)
cart_items (id, user_id, product_id, quantity)
addresses (id, user_id, tipo, calle, numero, colonia, ciudad, estado, cp, pais, default)
product_images (id, product_id, url, alt, order)
order_status_history (id, order_id, status, changed_by, note)
```

### Roles de Usuario
- **CLIENTE**: Usuario normal que puede comprar
- **PROVEEDOR**: Puede gestionar sus productos y órdenes
- **ADMIN**: Acceso total al sistema

### Estados de Orden
- RECIBIDO → CONFIRMADO → ENVIADO → ENTREGADO → CERRADO
- Estados especiales: CANCELADO, DEVUELTO

## Configuración Actual

### Supabase
- URL: `https://dzgjxrghqyotixqnrexu.supabase.co`
- Row Level Security habilitado
- Políticas configuradas para cada tabla
- Email verification activado

### Archivos de Configuración
- `.env.local` - Variables de entorno
- `supabase-init.sql` - Esquema de base de datos
- `enable-rls.sql` - Políticas de seguridad
- `setup-data-simple.sql` - Datos de prueba

## APIs Implementadas

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/session` - Obtener sesión actual

### Productos
- `GET /api/products` - Listar productos con filtros
- `GET /api/products/[slug]` - Detalle de producto
- `POST /api/products` - Crear producto (admin/proveedor)
- `PUT /api/products/[id]` - Actualizar producto
- `DELETE /api/products/[id]` - Eliminar producto

### Categorías
- `GET /api/categories` - Listar todas las categorías

## Componentes Principales

### Layout
- `Layout` - Wrapper principal con header y footer
- `Header` - Navegación con menú de usuario
- `Footer` - Links y información legal
- `Banner` - Hero section reutilizable

### Autenticación
- `LoginForm` - Formulario de inicio de sesión
- `RegisterForm` - Formulario de registro
- `AuthContext` - Context API para estado de autenticación

### Catálogo
- `ProductCard` - Tarjeta de producto
- `ProductFilters` - Filtros laterales
- `ProductGrid` - Grid responsive de productos

## Flujos Implementados

### Registro y Login
1. Usuario se registra → Email de confirmación
2. Confirma email → Puede iniciar sesión
3. Login exitoso → Redirige según rol
4. Sesión persistente con Supabase

### Catálogo
1. Carga productos desde Supabase
2. Filtros por categoría, búsqueda y tipo de precio
3. Muestra productos con imágenes
4. Diferencia entre "Precio" y "Cotizar"

## Datos de Prueba

### Usuario Admin
- Email: Configurado por el usuario en setup SQL
- Role: ADMIN

### Proveedor de Prueba
- Email: proveedor.prueba@test.com
- Razón Social: Empresa de Prueba S.A. de C.V.
- RFC: EMP123456789

### Productos de Ejemplo
- 7 productos en diferentes categorías
- Mix de productos con precio y para cotizar
- Imágenes de Unsplash

## Pendientes Técnicos

### Inmediato
1. **Middleware de autenticación** - Proteger rutas privadas
2. **Context de carrito** - Estado global del carrito
3. **Validación de formularios** - Zod o Yup
4. **Manejo de errores** - Error boundaries y toasts

### Próxima Fase
1. **Optimización de imágenes** - next/image
2. **Cache de queries** - React Query o SWR
3. **Tests** - Jest y React Testing Library
4. **CI/CD** - GitHub Actions

## Notas de Desarrollo

### Problemas Conocidos
- Prisma no conecta directamente con Supabase (usando Supabase client)
- Las imágenes de productos son URLs externas (migrar a storage)

### Convenciones
- Componentes en PascalCase
- Hooks custom con prefijo "use"
- API routes en kebab-case
- Variables de entorno con prefijo NEXT_PUBLIC_ para cliente

### Scripts SQL Disponibles
- `clean-data.sql` - Limpia datos de prueba
- `setup-data-simple.sql` - Crea datos básicos
- `setup-data-ultra-simple.sql` - Versión mínima sin PL/pgSQL

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build
npm run start

# Linting
npm run lint
```

## Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Bootstrap 5](https://getbootstrap.com/docs/5.2)
- [Mercado Pago SDK](https://www.mercadopago.com.mx/developers)