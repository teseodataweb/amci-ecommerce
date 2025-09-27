# 📊 ESTADO ACTUAL DEL PROYECTO - AMCI E-COMMERCE

**Última actualización:** 26 de Septiembre, 2025
**Versión:** 1.0.0-beta
**Estado:** En desarrollo - Funcionalidad core completada

---

## 🎯 RESUMEN EJECUTIVO

E-commerce B2B para AMCI que conecta clientes con múltiples proveedores. Sistema de marketplace con gestión de productos, órdenes, comisiones y pagos con Stripe.

### ✅ Completado (80%)
- ✅ Autenticación y autorización (Roles: CLIENTE, PROVEEDOR, ADMIN)
- ✅ Sistema de carrito de compras
- ✅ Pasarela de pago con Stripe (integración básica)
- ✅ Panel de Administrador con gestión completa
- ✅ Panel de Proveedor funcional
- ✅ Sistema de órdenes
- ✅ Sistema de reportes y analytics
- ✅ Sistema de notificaciones para admin
- ✅ Protección de rutas por rol
- ✅ Base de datos con Supabase + RLS

### 🚧 En Proceso / Pendiente (20%)
- ⏳ Confirmación de pago y creación de orden en BD
- ⏳ Sistema de tracking de envíos
- ⏳ Gestión de inventario automático
- ⏳ Notificaciones por email
- ⏳ Sistema de dispersión de pagos a proveedores
- ⏳ Facturación electrónica
- ⏳ Tests unitarios y E2E

---

## 📁 ESTRUCTURA DEL PROYECTO

```
amci-ecommerce/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx       # Componente para proteger rutas por rol
│   │   ├── checkout/
│   │   │   └── CheckoutForm.tsx         # Formulario de Stripe
│   │   └── layout/
│   │       ├── Header.tsx               # Header con notificaciones
│   │       └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx              # Contexto de autenticación (Supabase)
│   │   └── CartContext.tsx              # Contexto del carrito
│   ├── pages/
│   │   ├── api/                         # API Routes (Next.js)
│   │   │   ├── admin/
│   │   │   │   ├── stats.ts            # Estadísticas del admin
│   │   │   │   ├── products.ts         # Gestión de productos
│   │   │   │   ├── orders.ts           # Órdenes del sistema
│   │   │   │   ├── providers.ts        # Gestión de proveedores
│   │   │   │   ├── notifications.ts    # Notificaciones pendientes
│   │   │   │   └── reports.ts          # Reportes (ventas, comisiones)
│   │   │   ├── orders/
│   │   │   │   └── index.ts            # Órdenes por usuario
│   │   │   ├── provider/
│   │   │   │   └── dashboard.ts        # Dashboard del proveedor
│   │   │   ├── users/
│   │   │   │   └── [id].ts             # Perfil de usuario
│   │   │   └── create-payment-intent.ts # Stripe Payment Intent
│   │   ├── panel/
│   │   │   ├── admin.tsx                # Panel de administrador
│   │   │   └── proveedor.tsx            # Panel de proveedor
│   │   ├── carrito.tsx                  # Página del carrito
│   │   ├── catalogo.tsx                 # Catálogo de productos
│   │   ├── checkout.tsx                 # Checkout con Stripe
│   │   ├── login.tsx                    # Login
│   │   ├── registro.tsx                 # Registro de clientes
│   │   ├── registro-proveedor.tsx       # Registro de proveedores
│   │   ├── ordenes.tsx                  # Mis órdenes (cliente)
│   │   ├── reportes.tsx                 # Reportes (admin)
│   │   └── _app.tsx                     # App wrapper con contexts
│   └── styles/
├── .env                                  # Variables de entorno (NO SUBIR A GIT)
├── supabase-init.sql                    # Script de creación de tablas
├── supabase-rls-policies.sql            # Políticas de seguridad RLS
├── DATABASE-SETUP-GUIDE.md              # Guía de setup de BD
├── PROVEEDORES-SETUP.md                 # Guía de alta de proveedores
└── PROYECTO-STATUS.md                   # Este archivo
```

---

## 🗄️ BASE DE DATOS (SUPABASE)

### Tablas Principales

| Tabla | Descripción | Estado |
|-------|-------------|--------|
| `users` | Usuarios del sistema (CLIENTE, PROVEEDOR, ADMIN) | ✅ Completa |
| `providers` | Datos adicionales de proveedores | ✅ Completa |
| `categories` | Categorías de productos | ✅ Completa |
| `products` | Productos del catálogo | ✅ Completa |
| `product_images` | Imágenes de productos | ✅ Completa |
| `cart_items` | Carrito de compras | ✅ Completa |
| `orders` | Órdenes de compra | ✅ Completa |
| `order_items` | Items de cada orden | ✅ Completa |
| `addresses` | Direcciones de envío | ✅ Completa |
| `payments` | Registro de pagos | ⏳ Parcial |
| `shippings` | Información de envíos | ⏳ Pendiente |
| `invoices` | Facturas | ⏳ Pendiente |
| `dispersions` | Dispersión de pagos a proveedores | ⏳ Pendiente |
| `settings` | Configuración del sistema | ✅ Completa |

### 🔒 Seguridad (RLS)

**Row Level Security (RLS) está HABILITADO** en todas las tablas.

**Políticas implementadas:**
- ✅ Usuarios solo leen su propio perfil
- ✅ Admins tienen acceso completo
- ✅ Proveedores solo ven sus productos y órdenes relacionadas
- ✅ Clientes solo ven sus órdenes y carrito
- ✅ Productos visibles y aprobados son públicos

**Archivo:** `supabase-rls-policies.sql`

---

## 🔧 VARIABLES DE ENTORNO

### Archivo `.env` (Configurado)

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dzgjxrghqyotixqnrexu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Pendiente de configurar)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
```

### ⚠️ IMPORTANTE
- **NO subir `.env` a Git** (ya está en `.gitignore`)
- Stripe keys están comentadas, necesitan configurarse para producción

---

## 🚀 CÓMO RETOMAR EL DESARROLLO

### 1. **Setup Inicial** (Si es primera vez o nueva máquina)

```bash
# 1. Clonar repositorio (si aplica)
git clone <repo-url>
cd amci-ecommerce

# 2. Instalar dependencias
npm install

# 3. Verificar variables de entorno
# Asegúrate que .env tenga todas las variables

# 4. Ejecutar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

### 2. **Verificar Estado de la Base de Datos**

```bash
# Ve a Supabase Dashboard
# https://supabase.com/dashboard/project/dzgjxrghqyotixqnrexu

# Ejecuta en SQL Editor (si no lo has hecho):
# 1. supabase-init.sql        (crear tablas)
# 2. supabase-rls-policies.sql (políticas de seguridad)
# 3. check-users.sql          (verificar usuarios)
```

### 3. **Crear Usuario Admin** (Si no existe)

```sql
-- Obtén el ID del usuario de Authentication > Users
-- Luego ejecuta:

UPDATE users
SET role = 'ADMIN'
WHERE email = 'tu-email@ejemplo.com';

-- Verifica:
SELECT id, email, role FROM users WHERE role = 'ADMIN';
```

### 4. **Crear Datos de Prueba**

Sigue la guía completa en: **`PROVEEDORES-SETUP.md`**

Resumen rápido:
1. Crear proveedores (vía formulario o SQL)
2. Crear categorías
3. Crear productos
4. Aprobar productos desde panel admin
5. Realizar compras de prueba

---

## 🔐 USUARIOS Y ROLES

### Roles del Sistema

| Rol | Permisos | Rutas Accesibles |
|-----|----------|------------------|
| **CLIENTE** | Comprar productos, ver sus órdenes | `/catalogo`, `/carrito`, `/checkout`, `/ordenes` |
| **PROVEEDOR** | Gestionar productos, ver órdenes de sus productos | `/panel/proveedor`, `/catalogo` |
| **ADMIN** | Acceso completo al sistema | `/panel/admin`, `/reportes`, todas las demás |

### Usuario Admin Actual

```
Email: teseodata@gmail.com
Role: ADMIN
ID: e1337921-f584-4697-9eba-cb98a7f74353
```

---

## 📄 PÁGINAS Y FUNCIONALIDADES

### 🌐 Páginas Públicas

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Home page | ✅ Completa |
| `/about` | Acerca de | ✅ Completa |
| `/catalogo` | Catálogo de productos | ✅ Completa |
| `/login` | Iniciar sesión | ✅ Completa |
| `/registro` | Registro de cliente | ✅ Completa |
| `/registro-proveedor` | Registro de proveedor | ✅ Completa |

### 🔒 Páginas Protegidas (Requieren Login)

| Ruta | Rol Requerido | Descripción | Estado |
|------|---------------|-------------|--------|
| `/carrito` | CLIENTE | Carrito de compras | ✅ Completa |
| `/checkout` | CLIENTE | Checkout con Stripe | ✅ Funcional (⚠️ sin guardar orden) |
| `/ordenes` | CLIENTE | Mis órdenes | ✅ Completa |
| `/panel/proveedor` | PROVEEDOR | Dashboard del proveedor | ✅ Completa |
| `/panel/admin` | ADMIN | Panel de administración | ✅ Completa |
| `/reportes` | ADMIN | Reportes y analytics | ✅ Completa |

---

## 🎨 FUNCIONALIDADES POR PÁGINA

### 1. **Panel Admin (`/panel/admin`)**

#### Pestañas Disponibles:

**📦 Productos**
- Ver todos los productos del sistema
- Filtrar por estado (pendiente, aprobado, pausado)
- Aprobar productos pendientes
- Pausar productos activos
- Rechazar productos
- Ver detalles (nombre, categoría, proveedor, precio, imagen)

**📋 Órdenes**
- Ver todas las órdenes del sistema
- Ver cliente, proveedor, productos
- Ver estado de cada orden
- Ver total y fecha

**👥 Proveedores** ⭐ **NUEVA**
- Ver todos los proveedores registrados
- Badge rojo muestra proveedores pendientes
- Aprobar proveedores pendientes
- Rechazar proveedores
- Ver datos: Razón social, RFC, contacto, email, teléfono, estado

**⚙️ Configuración**
- Configurar comisión AMCI (%)
- Período de dispersión
- Notificaciones
- Aprobación automática

#### Estadísticas Dashboard:
- Órdenes totales
- Productos pendientes
- Productos activos
- Ventas totales (MXN)

---

### 2. **Panel Proveedor (`/panel/proveedor`)**

**Estadísticas:**
- Total productos
- Productos activos
- Productos pendientes
- Órdenes totales
- Ventas totales (MXN)

**Órdenes:**
- Ver órdenes relacionadas con sus productos
- Ver cliente, total, estado
- Filtrar por estado

**⚠️ NOTA:** Falta implementar:
- Confirmación de órdenes
- Registro de información de envío
- Actualización de estados

---

### 3. **Reportes (`/reportes`)**

#### Tipos de Reportes:

**📊 Ventas por Proveedor**
- Total ventas por cada proveedor
- Número de órdenes
- Totales generales
- Exportar a CSV

**🏆 Productos Más Vendidos**
- Top 10 productos
- Unidades vendidas
- Total de ventas
- Proveedor de cada producto
- Exportar a CSV

**💰 Comisiones**
- Cálculo de comisiones AMCI
- Total ventas por proveedor
- Comisión AMCI (%)
- Neto para proveedor
- Solo órdenes completadas (ENTREGADO, CERRADO)
- Exportar a CSV

---

### 4. **Checkout (`/checkout`)**

**Flujo Actual:**
1. ✅ Usuario llena formulario de dirección
2. ✅ Ve resumen de su orden
3. ✅ Ingresa información de tarjeta (Stripe Elements)
4. ✅ Se crea Payment Intent en Stripe
5. ⚠️ **PENDIENTE:** Guardar orden en base de datos
6. ⚠️ **PENDIENTE:** Vaciar carrito después del pago
7. ⚠️ **PENDIENTE:** Redireccionar a página de confirmación

---

### 5. **Notificaciones (Admin)**

#### Badge en Header:
- Badge rojo en menú "Panel Admin"
- Muestra total de notificaciones pendientes
- Suma: proveedores pendientes + productos pendientes
- Se actualiza cada 30 segundos automáticamente

#### Ejemplo:
```
Panel Admin [5]  ← Badge rojo con el número
```

**API:** `/api/admin/notifications`

---

## 🔗 APIs IMPLEMENTADAS

### Autenticación y Usuarios

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/users/[id]` | GET | Obtener perfil de usuario |

### Admin

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Estadísticas generales |
| `/api/admin/products` | GET | Obtener todos los productos |
| `/api/admin/products` | PATCH | Aprobar/pausar/rechazar producto |
| `/api/admin/orders` | GET | Obtener todas las órdenes |
| `/api/admin/providers` | GET | Obtener todos los proveedores |
| `/api/admin/providers` | PATCH | Aprobar/rechazar proveedor |
| `/api/admin/notifications` | GET | Contador de notificaciones |
| `/api/admin/reports?type=...` | GET | Generar reportes |

Tipos de reporte:
- `sales-by-provider`: Ventas por proveedor
- `top-products`: Productos más vendidos
- `commissions`: Comisiones

### Proveedor

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/provider/dashboard?userId=...` | GET | Dashboard del proveedor |

### Cliente

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/orders?userId=...` | GET | Órdenes del usuario |

### Pagos

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/create-payment-intent` | POST | Crear Payment Intent de Stripe |

---

## 🐛 PROBLEMAS RESUELTOS

### 1. **Redirección infinita al panel admin** ✅ RESUELTO
- **Problema:** Middleware redirigía antes de cargar el perfil
- **Solución:** Deshabilitado `middleware.ts` (renombrado a `.bak`)
- **Alternativa:** ProtectedRoute en cada página

### 2. **Variables de entorno faltantes** ✅ RESUELTO
- **Problema:** `.env` sin configurar Supabase
- **Solución:** Agregadas todas las variables necesarias

### 3. **Usuario admin sin permisos** ✅ RESUELTO
- **Problema:** Usuario no tenía rol ADMIN en BD
- **Solución:** Scripts SQL para actualizar rol

### 4. **Error en ProtectedRoute** ✅ RESUELTO
- **Problema:** `useAuth` fuera del AuthProvider
- **Solución:** Verificar que middleware no interfiera

---

## ⚠️ PROBLEMAS CONOCIDOS / PENDIENTES

### 1. **Confirmación de Pago en Checkout** 🚨 CRÍTICO
**Descripción:** Después de procesar el pago con Stripe, NO se guarda la orden en la base de datos.

**Impacto:** Las órdenes no quedan registradas, el carrito no se vacía.

**Archivos involucrados:**
- `src/pages/checkout.tsx` (líneas 90-140 aprox)
- Necesita crear endpoint: `/api/orders/create`

**Solución propuesta:**
```typescript
// 1. Después del pago exitoso, llamar a:
const response = await fetch('/api/orders/create', {
  method: 'POST',
  body: JSON.stringify({
    userId: user.id,
    cartItems: cart,
    shippingAddress: address,
    paymentIntentId: paymentIntent.id,
    total: calculateTotal()
  })
});

// 2. Si la orden se crea exitosamente:
// - Vaciar carrito
// - Redireccionar a /ordenes o a /orden/[id]
```

---

### 2. **Gestión de Tracking de Envíos** ⏳
**Descripción:** El proveedor puede ver órdenes pero no puede registrar información de envío.

**Archivos involucrados:**
- `src/pages/panel/proveedor.tsx` (modal de tracking existe pero no guarda en BD)
- Necesita endpoint: `/api/provider/shipping`

**Tareas:**
- [ ] Crear API para guardar tracking
- [ ] Actualizar estado de orden a "ENVIADO"
- [ ] Guardar en tabla `shippings`
- [ ] Notificar al cliente por email (opcional)

---

### 3. **Gestión de Inventario** ⏳
**Descripción:** No hay reducción automática de stock al comprar.

**Tareas:**
- [ ] Al crear orden, restar qty de `products.stock`
- [ ] Validar stock disponible antes de checkout
- [ ] Mostrar "Sin stock" en productos agotados

---

### 4. **Stripe Keys para Producción** ⚠️
**Descripción:** Actualmente usando keys comentadas en `.env`

**Tareas:**
- [ ] Obtener Stripe Live Keys
- [ ] Configurar webhooks de Stripe
- [ ] Manejar eventos: `payment_intent.succeeded`, `payment_intent.failed`

---

### 5. **Sistema de Dispersión de Pagos** ⏳
**Descripción:** No hay dispersión automática de pagos a proveedores.

**Archivos involucrados:**
- Tabla `dispersions` existe pero no se usa
- Necesita cron job o script manual

**Tareas:**
- [ ] Crear script de dispersión
- [ ] Calcular comisiones por período
- [ ] Generar registros en `dispersions`
- [ ] Integrar con API de banco (opcional)

---

### 6. **Facturación Electrónica (SAT)** ⏳
**Descripción:** Sistema preparado pero no implementado.

**Tabla:** `invoices` existe con campos para UUID, PDF, XML

**Tareas:**
- [ ] Integrar con PAC (Proveedor Autorizado de Certificación)
- [ ] Generar CFDI después de cada orden
- [ ] Permitir descarga de factura desde `/ordenes`

---

### 7. **Notificaciones por Email** ⏳
**Descripción:** No hay emails automáticos.

**Eventos que deberían enviar email:**
- Registro exitoso (cliente/proveedor)
- Proveedor aprobado
- Producto aprobado
- Orden creada (confirmación de compra)
- Orden enviada (con tracking)
- Orden entregada

**Herramientas sugeridas:**
- SendGrid
- Resend
- Amazon SES

---

### 8. **Testing** ⏳
**Descripción:** No hay tests implementados.

**Tareas:**
- [ ] Tests unitarios (Jest)
- [ ] Tests de integración (APIs)
- [ ] Tests E2E (Cypress o Playwright)

---

## 📝 PRÓXIMOS PASOS RECOMENDADOS

### 🔥 PRIORIDAD ALTA (Hacer primero)

#### 1. **Completar Flujo de Checkout** 🚨
```
Tiempo estimado: 2-4 horas
```

**Pasos:**
1. Crear endpoint `/api/orders/create`
2. Guardar orden en BD después de pago exitoso
3. Crear registros en `order_items`
4. Actualizar stock de productos
5. Vaciar carrito
6. Redireccionar a página de confirmación

**Archivos a modificar:**
- `src/pages/api/orders/create.ts` (nuevo)
- `src/pages/checkout.tsx` (línea ~100-140)

---

#### 2. **Página de Confirmación de Orden**
```
Tiempo estimado: 2-3 horas
```

Crear página: `/orden/[id].tsx`

**Debe mostrar:**
- Número de orden
- Estado
- Productos comprados
- Total pagado
- Dirección de envío
- Información de tracking (cuando esté disponible)
- Botón para descargar factura (futuro)

---

#### 3. **Sistema de Tracking de Envíos**
```
Tiempo estimado: 3-4 horas
```

**Pasos:**
1. Crear endpoint `/api/provider/shipping`
2. Guardar en tabla `shippings`
3. Actualizar estado de orden
4. Mostrar tracking en `/orden/[id]`
5. Permitir al proveedor actualizar estados

---

### ⚡ PRIORIDAD MEDIA

#### 4. **Gestión de Inventario**
```
Tiempo estimado: 2-3 horas
```
- Restar stock al crear orden
- Validar stock en checkout
- Mostrar "Agotado" en productos sin stock
- Permitir al proveedor actualizar stock

#### 5. **Dashboard de Proveedor - Gestión de Productos**
```
Tiempo estimado: 4-6 horas
```
- Permitir crear nuevos productos desde el panel
- Editar productos existentes
- Ver estadísticas de ventas por producto
- Gestionar imágenes

#### 6. **Webhooks de Stripe**
```
Tiempo estimado: 3-4 horas
```
- Configurar endpoint `/api/webhooks/stripe`
- Manejar eventos de pago
- Actualizar estados automáticamente
- Registrar en tabla `payments`

---

### 🌟 PRIORIDAD BAJA (Nice to have)

#### 7. **Sistema de Notificaciones por Email**
```
Tiempo estimado: 6-8 horas
```
- Integrar SendGrid/Resend
- Templates de email
- Envío automático de notificaciones

#### 8. **Facturación Electrónica (SAT)**
```
Tiempo estimado: 10-15 horas
```
- Integrar con PAC
- Generar CFDI
- Permitir descarga de facturas

#### 9. **Tests**
```
Tiempo estimado: 15-20 horas
```
- Setup de Jest
- Tests unitarios de componentes
- Tests de APIs
- Tests E2E

#### 10. **Optimizaciones**
- Imágenes con Next/Image
- Lazy loading de componentes
- Cache de datos
- Mejoras de performance

---

## 📞 CONTACTO Y RECURSOS

### Documentación de Dependencias

- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **React:** https://react.dev/

### Dashboard de Supabase
- **URL:** https://supabase.com/dashboard/project/dzgjxrghqyotixqnrexu
- **SQL Editor:** Para ejecutar queries
- **Table Editor:** Para ver/editar datos
- **Authentication:** Para gestionar usuarios

### Dashboard de Stripe
- **URL:** https://dashboard.stripe.com/
- **Nota:** Configurar webhooks en producción

---

## 🔄 PROCESO DE DEPLOYMENT (Futuro)

### Recomendaciones para Producción:

1. **Frontend (Next.js)**
   - Vercel (recomendado)
   - Netlify
   - AWS Amplify

2. **Base de Datos**
   - Ya está en Supabase (production-ready)
   - Verificar límites del plan actual

3. **Variables de Entorno**
   - Configurar en plataforma de deploy
   - Usar Stripe Live Keys
   - Nunca exponer service_role_key en cliente

4. **Dominio Personalizado**
   - Configurar DNS
   - SSL/TLS automático

5. **Monitoring**
   - Sentry para errores
   - Google Analytics
   - Supabase Analytics

---

## 📊 MÉTRICAS ACTUALES

### Completitud del Proyecto

```
Frontend:        ████████████████████░ 85%
Backend APIs:    ███████████████████░░ 80%
Base de Datos:   ████████████████████░ 95%
Integración:     ████████████░░░░░░░░░ 60%
Testing:         ░░░░░░░░░░░░░░░░░░░░░  0%
Documentación:   █████████████████████ 100%
```

### Líneas de Código Estimadas

```
TypeScript/TSX:  ~8,000 líneas
SQL:            ~800 líneas
CSS/SCSS:       ~2,000 líneas
```

---

## 🎓 GUÍAS RELACIONADAS

1. **`DATABASE-SETUP-GUIDE.md`**
   - Setup inicial de la base de datos
   - Conexión con Supabase

2. **`PROVEEDORES-SETUP.md`**
   - Alta de proveedores paso a paso
   - Creación de productos
   - Scripts SQL listos para usar
   - Solución de problemas comunes

3. **`supabase-rls-policies.sql`**
   - Todas las políticas de seguridad
   - Ejecutar en SQL Editor

---

## ⚠️ NOTAS IMPORTANTES

### Seguridad

- ✅ RLS habilitado en todas las tablas
- ✅ Service role key solo en APIs de servidor
- ✅ Anon key en cliente
- ⚠️ No exponer keys en frontend
- ⚠️ Validar inputs en todas las APIs

### Performance

- ⚠️ Considerar paginación en listados grandes
- ⚠️ Implementar lazy loading de imágenes
- ⚠️ Cache de productos en catálogo
- ⚠️ Optimizar queries SQL con índices

### Git

```bash
# Archivos que NO deben subirse a Git:
.env
.env.local
node_modules/
.next/
```

**NUNCA subir:**
- Credenciales
- API keys
- Service role keys

---

## 🏁 CHECKLIST PARA RETOMAR

Cuando regreses al proyecto:

- [ ] `git pull` (si aplica)
- [ ] `npm install` (por si hay nuevas dependencias)
- [ ] Verificar que `.env` tiene todas las variables
- [ ] `npm run dev` para levantar servidor
- [ ] Revisar esta guía completa
- [ ] Identificar qué tarea de "Próximos Pasos" vas a hacer
- [ ] Consultar `PROVEEDORES-SETUP.md` si necesitas datos de prueba
- [ ] Verificar que Supabase está funcionando
- [ ] Crear branch nueva para tu feature: `git checkout -b feature/nombre`

---

## 📧 SOPORTE

**Si encuentras problemas:**

1. Revisa esta guía primero
2. Revisa logs del servidor (terminal)
3. Revisa console del navegador (F12)
4. Verifica que las variables de entorno estén correctas
5. Verifica que Supabase esté funcionando
6. Consulta documentación oficial de las librerías

---

**✨ Proyecto desarrollado con Next.js, Supabase, Stripe y mucho ☕**

**Última actualización:** 26 de Septiembre, 2025