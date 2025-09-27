# 🛒 AMCI E-Commerce Platform

Plataforma B2B de e-commerce que conecta clientes con múltiples proveedores. Sistema de marketplace con gestión de productos, órdenes, comisiones y pagos.

## 📚 Documentación del Proyecto

| Documento | Descripción |
|-----------|-------------|
| **[PROYECTO-STATUS.md](./PROYECTO-STATUS.md)** | 📊 Estado completo del proyecto, funcionalidades implementadas, pendientes y guía para retomar |
| **[DESARROLLO-SIGUIENTE.md](./DESARROLLO-SIGUIENTE.md)** | 🚀 Guía técnica detallada con código para implementar las siguientes tareas prioritarias |
| **[DATABASE-SETUP-GUIDE.md](./DATABASE-SETUP-GUIDE.md)** | 🗄️ Configuración de la base de datos con Supabase |
| **[PROVEEDORES-SETUP.md](./PROVEEDORES-SETUP.md)** | 👥 Guía paso a paso para dar de alta proveedores y productos |

## 🚀 Quick Start

### 1. Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar .env.example a .env y llenar las variables
cp .env.example .env
```

### 2. Configurar Base de Datos

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Ejecuta los scripts SQL en orden:
   - `supabase-init.sql` (crear tablas)
   - `supabase-rls-policies.sql` (políticas de seguridad)

### 3. Ejecutar Servidor

```bash
npm run dev
# Abrir http://localhost:3000
```

### 4. Crear Usuario Admin

```sql
-- En Supabase SQL Editor:
UPDATE users
SET role = 'ADMIN'
WHERE email = 'tu-email@ejemplo.com';
```

## 🎯 Funcionalidades Principales

### ✅ Implementadas

- **Autenticación Multi-Rol**: Sistema con 3 roles (CLIENTE, PROVEEDOR, ADMIN)
- **Catálogo de Productos**: Navegación y búsqueda de productos
- **Carrito de Compras**: Gestión completa del carrito
- **Checkout con Stripe**: Integración de pasarela de pago
- **Panel de Admin**: Gestión de productos, órdenes, proveedores
- **Panel de Proveedor**: Dashboard con productos y órdenes
- **Sistema de Órdenes**: Tracking de órdenes por usuario
- **Reportes**: Ventas, productos top, comisiones
- **Notificaciones**: Badge de notificaciones para admin

### 🚧 En Desarrollo

- Confirmación de pago y creación de orden en BD
- Sistema de tracking de envíos
- Gestión automática de inventario
- Notificaciones por email
- Dispersión de pagos a proveedores
- Facturación electrónica

Ver detalles completos en: **[PROYECTO-STATUS.md](./PROYECTO-STATUS.md)**

## 🏗️ Stack Tecnológico

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Bootstrap 5, SCSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Stripe
- **Hosting**: Vercel (recomendado)

## 📁 Estructura del Proyecto

```
amci-ecommerce/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── contexts/         # Contextos de React (Auth, Cart)
│   ├── pages/            # Páginas y API routes
│   │   ├── api/         # Backend APIs
│   │   ├── panel/       # Paneles de admin y proveedor
│   │   └── ...
│   └── styles/          # Estilos globales
├── public/              # Assets estáticos
├── .env                 # Variables de entorno (NO subir a Git)
├── supabase-init.sql    # Script de creación de BD
└── README.md            # Este archivo
```

## 🔒 Seguridad

- ✅ Row Level Security (RLS) habilitado en todas las tablas
- ✅ Validación de roles en cada ruta protegida
- ✅ Service Role Key solo en servidor
- ✅ Anon Key en cliente
- ⚠️ NO exponer keys sensibles en frontend

## 🧪 Testing

### Datos de Prueba

Para crear datos de prueba, sigue la guía completa:
**[PROVEEDORES-SETUP.md](./PROVEEDORES-SETUP.md)**

### Tarjeta de Prueba (Stripe)

```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Variables de Entorno Requeridas

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## 📖 Guías Detalladas

### Para Empezar

1. Lee **[PROYECTO-STATUS.md](./PROYECTO-STATUS.md)** para entender el estado actual
2. Configura la base de datos con **[DATABASE-SETUP-GUIDE.md](./DATABASE-SETUP-GUIDE.md)**
3. Crea datos de prueba con **[PROVEEDORES-SETUP.md](./PROVEEDORES-SETUP.md)**

### Para Desarrollar

1. Lee **[DESARROLLO-SIGUIENTE.md](./DESARROLLO-SIGUIENTE.md)** para ver tareas prioritarias
2. Elige una tarea de la lista
3. Crea un branch: `git checkout -b feature/nombre`
4. Desarrolla, prueba y haz commit

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### Error de conexión a Supabase

- Verifica que `.env` tenga las variables correctas
- Verifica que Supabase esté funcionando

### Panel admin no carga

- Verifica que tu usuario tenga rol ADMIN:
  ```sql
  SELECT email, role FROM users WHERE email = 'tu-email';
  ```

### Más problemas

Ver sección "Problemas Conocidos" en **[PROYECTO-STATUS.md](./PROYECTO-STATUS.md)**

## 📞 Soporte

1. Revisa **[PROYECTO-STATUS.md](./PROYECTO-STATUS.md)** primero
2. Verifica logs del servidor (terminal)
3. Verifica console del navegador (F12)
4. Consulta documentación oficial:
   - [Next.js](https://nextjs.org/docs)
   - [Supabase](https://supabase.com/docs)
   - [Stripe](https://stripe.com/docs)

## 📊 Estado del Proyecto

```
Frontend:        ████████████████████░ 85%
Backend APIs:    ███████████████████░░ 80%
Base de Datos:   ████████████████████░ 95%
Integración:     ████████████░░░░░░░░░ 60%
Testing:         ░░░░░░░░░░░░░░░░░░░░░  0%
Documentación:   █████████████████████ 100%
```

## 🎯 Próximos Pasos

1. 🚨 **CRÍTICO**: Completar flujo de checkout (guardar orden en BD)
2. ⚡ Implementar sistema de tracking de envíos
3. ⚡ Gestión automática de inventario
4. 📧 Sistema de notificaciones por email
5. 💰 Dispersión de pagos a proveedores

Ver detalles técnicos en: **[DESARROLLO-SIGUIENTE.md](./DESARROLLO-SIGUIENTE.md)**

## 🤝 Contribución

1. Fork del repositorio
2. Crear branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'Add some AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## ✨ Créditos

Desarrollado con ❤️ usando Next.js, Supabase y Stripe

---

**📚 Para información detallada, consulta: [PROYECTO-STATUS.md](./PROYECTO-STATUS.md)**

**🚀 Para empezar a desarrollar: [DESARROLLO-SIGUIENTE.md](./DESARROLLO-SIGUIENTE.md)**