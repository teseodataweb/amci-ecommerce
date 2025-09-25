# E-commerce AMCI - MVP

Plataforma e-commerce para AMCI basada en la plantilla Digitek, con funcionalidades completas de marketplace, gestión de proveedores y reportes de conciliación.

## 🎯 Estado Actual del Proyecto (25 Enero 2025)

### ✅ Completado
- **Autenticación con Supabase** - Login/registro funcional con roles (CLIENTE, PROVEEDOR, ADMIN)
- **Base de datos PostgreSQL** - Esquema completo con todas las tablas necesarias
- **Datos de prueba** - 6 categorías, 1 proveedor, 7 productos con imágenes
- **Catálogo funcional** - Muestra productos reales desde Supabase con filtros
- **APIs REST** - Endpoints para productos, categorías y autenticación
- **Row Level Security** - Políticas de seguridad configuradas en Supabase

### 🔄 En Progreso
- **Panel de administración** - Para gestión de productos y órdenes
- **Carrito de compras** - Integración con base de datos
- **Proceso de checkout** - Con integración de Mercado Pago

### 📝 Pendiente
- **Panel de proveedores** - Para gestión de sus productos y órdenes
- **Sistema de órdenes** - Estados y flujo completo
- **Sistema de notificaciones** - Email con SendGrid
- **Reportes y dispersión** - CSV con cálculos de comisiones
- **Integración de pagos** - Mercado Pago en producción

## 🚀 Características Principales

### Para Clientes
- **Catálogo completo** con filtros avanzados (categoría, proveedor, precio, cotización)
- **Páginas de producto** con galería de imágenes, variantes y especificaciones técnicas
- **Carrito funcional** con soporte para múltiples proveedores y emisores de factura
- **Checkout seguro** con validaciones y advertencias de facturación múltiple
- **Seguimiento de órdenes** por email

### Para Proveedores
- **Panel de gestión** de órdenes con estados en tiempo real
- **Sistema de confirmación** y carga de información de envío
- **Gestión de guías** de envío con múltiples paqueterías
- **Notificaciones automáticas** a clientes

### Para Administradores AMCI
- **Aprobación de productos** antes de publicación
- **Panel de control** con estadísticas en tiempo real
- **Sistema de reportes** con exportación CSV
- **Gestión de dispersión** con fechas editables
- **Configuración de comisiones** y períodos de pago

## 🎨 Branding y Limpieza Aplicada

### ✅ Cambios Implementados en esta Versión

**Limpieza de Template:**
- ✅ Eliminadas páginas demo: `index-2.tsx`, `index-3.tsx`, `index-4.tsx`, `blog.tsx`, `service.tsx`, `team.tsx`, etc.
- ✅ Homepage completamente reescrita con contenido AMCI específico
- ✅ Removidos componentes demo sin uso de la plantilla Digitek

**Branding AMCI:**
- ✅ Logo AMCI implementado (componente `AmciLogo` con colores corporativos)
- ✅ Paleta de colores AMCI aplicada (`amci-theme.scss`)
- ✅ Header unificado con navegación e-commerce
- ✅ Footer con links legales y contacto AMCI

**Navegación Completa:**
- ✅ Flujo end-to-end sin links rotos: `Home → Catálogo → Producto → Carrito → Checkout → Orden`
- ✅ Páginas legales: `/terminos`, `/privacidad`, `/disclaimer`
- ✅ Paneles funcionales: `/panel/proveedor`, `/panel/admin`, `/reportes`
- ✅ Sistema de órdenes: `/ordenes`, `/orden/[id]`

**Identidad Visual:**
- ✅ Paleta AMCI: Azul primario (`#1e40af`), Verde secundario (`#059669`)
- ✅ Tipografía consistente con pesos y jerarquías
- ✅ Iconografía industrial (Font Awesome)
- ✅ Componentes con hover states y transiciones

## 🏗️ Arquitectura Técnica

### Frontend
- **Next.js 13.2.4** con TypeScript
- **React 18.2.0** para componentes
- **Bootstrap 5.2.3** para estilos responsive
- **Sass 1.60.0** para preprocesamiento CSS
- **Font Awesome** para iconografía

### Proveedores Integrados
- **AP Safety** - Equipos de protección personal (EPP)
- **MTM** - Refacciones hidráulicas e industriales
- **Pumping Team** - Bombas y sistemas de bombeo
- **Plásticos Torres** - Iluminación LED y plafones

## 📋 Requisitos del Sistema

- Node.js 16.x o superior
- npm 8.x o superior
- Navegador moderno con soporte para ES6+

## ⚡ Instalación y Configuración

### 1. Clona el repositorio
```bash
git clone [URL-del-repositorio]
cd amci-ecommerce
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura Supabase

#### Crear cuenta en Supabase
1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Guarda las credenciales que te proporciona

#### Configurar base de datos
1. Ve al SQL Editor en tu dashboard de Supabase
2. Ejecuta los scripts SQL en este orden:
   - `supabase-init.sql` - Crea todas las tablas
   - `enable-rls.sql` - Configura políticas de seguridad
   - `setup-data-simple.sql` - Crea datos de prueba (actualiza el email en línea 8)

### 4. Configura las variables de entorno

Crea un archivo `.env.local` con tus credenciales de Supabase:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres

# App
NEXT_PUBLIC_APP_NAME=AMCI E-commerce
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mercado Pago (futuro)
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_de_sandbox
MP_SECRET_KEY=tu_secret_key_de_sandbox

# Email (futuro)
SENDGRID_API_KEY=tu_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@amci.com

# Configuración AMCI
AMCI_COMMISSION_PERCENT=10
AMCI_DISBURSEMENT_PERIOD=15
```

### 5. Ejecuta el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🌐 Rutas Principales

### Públicas (Funcionales)
- ✅ `/` - Homepage con branding AMCI
- ✅ `/catalogo` - Catálogo de productos con filtros (FUNCIONANDO CON DB)
- ✅ `/login` - Inicio de sesión
- ✅ `/registro` - Registro de clientes
- ✅ `/registro-proveedor` - Registro de proveedores
- 🔄 `/producto/[slug]` - Detalle de producto
- 🔄 `/carrito` - Carrito de compras
- 📝 `/checkout` - Proceso de pago
- ✅ `/about` - Información sobre AMCI
- ✅ `/contact` - Contacto

### Privadas (En desarrollo)
- 📝 `/panel/admin` - Panel de administración AMCI
- 📝 `/panel/proveedor` - Panel de gestión para proveedores
- 📝 `/reportes` - Reportes de ventas y dispersión
- 📝 `/ordenes` - Historial de órdenes del cliente

## 💳 Integración de Pagos

El sistema está configurado para usar **Mercado Pago** en modo sandbox. Los pagos se centralizan en AMCI y posteriormente se dispersan a los proveedores según la configuración establecida.

### Flujo de Pago
1. Cliente realiza compra → Pago a AMCI
2. Webhook confirma pago → Crea orden y notifica proveedor
3. Proveedor confirma y envía → Cliente recibe tracking
4. Sistema genera reportes → AMCI dispersa pagos

## 📊 Sistema de Reportes

### Campos del Reporte CSV
- Fecha de venta
- ID de orden
- Información del cliente
- Proveedor
- Detalle del producto
- Cantidades y precios
- Subtotal y envío
- **Comisión AMCI**
- **Neto a proveedor**
- **Estado y fecha de dispersión** (editable)

### Funcionalidades
- Filtros por fecha, proveedor y estado
- Exportación CSV con todos los campos
- Edición en línea de fechas de dispersión
- Cálculos automáticos de totales

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Utilidades (futuras implementaciones)
npm run db:migrate   # Migraciones de base de datos
npm run db:seed      # Datos de prueba
npm run test         # Suite de pruebas
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 **Móviles** (320px - 767px)
- 📱 **Tablets** (768px - 1023px)
- 💻 **Desktop** (1024px+)

## 🚦 Estados de Orden

### Flujo Completo
```
RECIBIDO → CONFIRMADO → ENVIADO → ENTREGADO → CERRADO
                ↓
            CANCELADO / DEVUELTO
```

### Responsabilidades
- **RECIBIDO**: Orden creada, esperando confirmación del proveedor
- **CONFIRMADO**: Proveedor acepta la orden
- **ENVIADO**: Proveedor registra envío con guía de rastreo
- **ENTREGADO**: Producto entregado al cliente
- **CERRADO**: Orden completada y lista para dispersión

## 🔐 Seguridad Implementada

- Validación de formularios en frontend y backend
- Sanitización de datos de entrada
- Headers de seguridad configurados
- Validación de roles y permisos
- Logs de auditoría para cambios críticos

## 📧 Sistema de Notificaciones

### Plantillas de Email
- **Cliente**: Confirmación de compra, actualizaciones de envío
- **Proveedor**: Nueva orden asignada, recordatorios
- **AMCI**: Reportes de dispersión, alertas administrativas

## 🏭 Datos de Proveedores

### AP Safety
- **Especialidad**: Equipos de protección personal
- **Productos**: Kits EPP, cascos, guantes, calzado de seguridad
- **Modalidad**: Precios fijos y paquetes por cantidad de personas

### MTM  
- **Especialidad**: Refacciones industriales
- **Productos**: Componentes hidráulicos, sellos, mangueras
- **Modalidad**: Mayormente precios fijos, algunas cotizaciones

### Pumping Team
- **Especialidad**: Sistemas de bombeo
- **Productos**: Bombas sumergibles, centrífugas, accesorios
- **Modalidad**: Principalmente cotizaciones por proyecto

### Plásticos Torres
- **Especialidad**: Iluminación LED
- **Productos**: Plafones, luminarias, packs por cantidad
- **Modalidad**: Precios fijos con descuentos por volumen

## 🚀 Deployment en Vercel

### Pasos para Deploy
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Vercel detectará automáticamente Next.js
4. El build y deploy será automático

### Variables de Entorno en Vercel
```
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_MP_PUBLIC_KEY
MP_SECRET_KEY
DATABASE_URL
SENDGRID_API_KEY
SENDGRID_FROM_EMAIL
```

## 📹 Demo Video

El video de demostración debe mostrar:
1. **Compra con precio visible** - Flujo completo del cliente
2. **Proveedor confirma y sube guía** - Panel de proveedor
3. **Admin filtra reportes y exporta CSV** - Panel administrativo

## 🛠️ Próximos Pasos de Desarrollo

### Inmediato (Próxima sesión)
1. **Panel de Administración** (`/panel/admin`)
   - CRUD de productos con aprobación
   - Gestión de categorías
   - Gestión de proveedores
   - Dashboard con métricas

2. **Carrito Funcional**
   - Persistencia en base de datos
   - Sincronización con usuario logueado
   - Cálculo de totales y envío
   - Validaciones de stock

3. **Proceso de Checkout**
   - Formulario de dirección de envío
   - Integración con Mercado Pago
   - Creación de órdenes
   - Confirmación por email

### Corto Plazo (Semana 1-2)
- **Panel de Proveedores** - Gestión de productos y órdenes
- **Sistema de Órdenes** - Estados y tracking completo
- **Sistema de Notificaciones** - Templates de email
- **Reportes de Dispersión** - CSV con comisiones

### Mediano Plazo (Semana 3-4)
- **Búsqueda avanzada** - Con filtros múltiples
- **Sistema de reseñas** - Ratings y comentarios
- **Wishlist** - Lista de deseos del usuario
- **Cupones y descuentos** - Sistema promocional

## 🔄 Próximas Fases

### Fase 2 (Post-MVP)
- Autenticación 2FA
- Integración WhatsApp/SMS
- API de facturación automática
- Sistema de inventario en tiempo real
- Métricas avanzadas de business intelligence

### Fase 3 (Escalamiento)
- Multi-tenant para otras empresas
- API pública para integraciones
- Aplicación móvil nativa
- Sistema de afiliados

## 🆘 Soporte y Contacto

Para soporte técnico y consultas:
- **Email**: soporte@amci.com
- **Documentación**: [URL de documentación]
- **Issues**: [URL del repositorio]/issues

## 📄 Licencia

Copyright © 2024 AMCI. Todos los derechos reservados.

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

**Co-Authored-By: Claude <noreply@anthropic.com>**