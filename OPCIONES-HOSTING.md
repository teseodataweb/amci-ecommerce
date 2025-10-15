# Opciones de Hosting para el Proyecto

## ⚠️ IMPORTANTE: Este NO es un sitio estático

Tu proyecto **NO puede desplegarse** como un sitio HTML/CSS/JS tradicional porque:

1. **Tiene 20+ rutas API serverless** en `/pages/api/`:
   - `/api/orders/*` - Manejo de órdenes
   - `/api/admin/*` - Panel administrativo
   - `/api/products/*` - Gestión de productos
   - `/api/auth/*` - Autenticación
   - `/api/create-payment-intent` - Pagos con Stripe
   - Y más...

2. **Requiere un servidor Node.js activo** para:
   - Ejecutar las APIs
   - Conectarse a Supabase
   - Procesar pagos con Stripe
   - Server-Side Rendering (SSR)

## Opciones Disponibles

### Opción 1: Netlify/Vercel (RECOMENDADO) ✅

**Ventajas:**
- ✅ Configuración automática de Next.js
- ✅ APIs serverless funcionan sin configuración
- ✅ Deploy automático desde GitHub
- ✅ HTTPS gratis
- ✅ CDN global
- ✅ Variables de entorno seguras
- ✅ GRATIS para proyectos como este

**Configuración:**
- Solo agregar las 6 variables de entorno (ya documentadas)
- Push a GitHub y listo

**URL resultante:**
- `https://tu-sitio.netlify.app`
- Puedes usar dominio custom: `https://store.amci.com.mx`

---

### Opción 2: Hosting Tradicional con Node.js

**Requisitos del servidor:**
- ✅ Node.js 18+
- ✅ npm o yarn
- ✅ PM2 o similar (para mantener el proceso activo)
- ✅ Acceso SSH
- ✅ Proxy reverso (nginx/Apache)

**Configuración:**

1. **Subir archivos al servidor**
   ```bash
   # Todo el proyecto (no solo el build)
   scp -r . usuario@datalpine.mx:/path/to/amci-store
   ```

2. **Instalar dependencias**
   ```bash
   cd /path/to/amci-store
   npm install --production
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en el servidor
   nano .env
   # Pegar las 6 variables de entorno
   ```

4. **Build del proyecto**
   ```bash
   npm run build
   ```

5. **Iniciar con PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "amci-store" -- start
   pm2 save
   pm2 startup
   ```

6. **Configurar nginx como proxy reverso**
   ```nginx
   location /clientsites/prototype/amci-store {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;

       # Importante para subdirectorios
       rewrite ^/clientsites/prototype/amci-store/(.*)$ /$1 break;
   }
   ```

7. **Modificar next.config.js** para subdirectorio
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     basePath: '/clientsites/prototype/amci-store',
     assetPrefix: '/clientsites/prototype/amci-store',
   }
   module.exports = nextConfig
   ```

**Desventajas:**
- ❌ Configuración compleja
- ❌ Mantenimiento manual
- ❌ El servidor debe tener Node.js
- ❌ Necesitas mantener el proceso activo (PM2)
- ❌ Sin deploy automático
- ❌ Actualizaciones manuales

---

### Opción 3: Solo Archivos Estáticos (NO RECOMENDADO) ⚠️

**Solo si eliminas TODAS las funcionalidades:**
- ❌ No funcionarán las APIs
- ❌ No habrá autenticación
- ❌ No se podrán crear órdenes
- ❌ No funcionarán los pagos
- ❌ Solo páginas estáticas sin funcionalidad

Para exportar como estático:
```bash
# En next.config.js
module.exports = {
  output: 'export',
  basePath: '/clientsites/prototype/amci-store'
}

npm run build
# Los archivos estarán en /out
```

**Resultado:** Un sitio sin funcionalidad, solo diseño.

---

## Recomendación

### Para Desarrollo/Testing:
**Usa Netlify** - Es gratis, fácil y funciona perfectamente con Next.js

### Para Producción:
1. **Dominio propio en Netlify**: `https://store.amci.com.mx`
2. **O servidor VPS con Node.js**: Si ya tienes infraestructura

### NO uses hosting compartido tradicional (cPanel)
A menos que tenga soporte para Node.js y puedas configurar PM2

---

## Resumen de Costos

| Opción | Costo | Dificultad | Tiempo Setup |
|--------|-------|------------|--------------|
| Netlify | $0 | Fácil ⭐ | 5 minutos |
| VPS Node.js | $5-20/mes | Media ⭐⭐⭐ | 1-2 horas |
| Hosting compartido | Depende | Difícil ⭐⭐⭐⭐ | 2-4 horas |
| Estático | $0 | Fácil ⭐ | 10 min (pero SIN funcionalidad) |

---

## Mi Recomendación Final

**Usa Netlify por ahora:**
1. Es gratis
2. Ya está configurado (solo faltan las variables de entorno)
3. Deploy automático
4. Perfecto para Next.js
5. Puedes conectar tu dominio después

Si realmente necesitas usar datalpine.mx, necesitas:
- Acceso SSH al servidor
- Node.js 18+ instalado
- Seguir la "Opción 2" completa
