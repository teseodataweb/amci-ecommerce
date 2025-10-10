# Guía de Despliegue en Netlify

## Requisitos Previos
- Cuenta en Netlify
- Repositorio Git conectado a Netlify

## Pasos para Desplegar

### 1. Configuración Inicial en Netlify

1. Conecta tu repositorio Git a Netlify
2. Configura los siguientes ajustes de build:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18

### 2. Variables de Entorno

Debes configurar las siguientes variables de entorno en Netlify (Settings > Build & deploy > Environment):

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
DATABASE_URL=tu_url_de_base_de_datos
STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=tu_clave_publica_de_stripe
```

### 3. Plugin de Next.js

El proyecto está configurado para usar el plugin `@netlify/plugin-nextjs`. Netlify lo instalará automáticamente gracias al archivo `netlify.toml`.

### 4. Despliegue

Una vez configurado:
1. Haz push de tus cambios al repositorio
2. Netlify detectará automáticamente los cambios
3. El build se ejecutará automáticamente
4. Tu sitio estará disponible en la URL de Netlify

## Notas Importantes

- **Build exitoso**: El proyecto ya ha pasado el build local exitosamente
- **Advertencias ESLint**: Hay algunas advertencias de ESLint (hooks dependencies y uso de <img> en lugar de <Image>), pero no afectan la funcionalidad
- **Base de datos**: Asegúrate de que la base de datos esté configurada y accesible desde Netlify
- **Stripe**: Configura los webhooks de Stripe para apuntar a tu dominio de Netlify

## Errores Corregidos

Durante la preparación del build, se corrigieron los siguientes errores:
1. ✓ Error de TypeScript en `ProtectedRoute.tsx` (variable `timeoutId`)
2. ✓ Error de versión de API de Stripe en `create-payment-intent.ts`
3. ✓ Error de método `supabase.raw()` en `orders/create.ts`

## Verificación Post-Despliegue

Después del despliegue, verifica:
- [ ] Las páginas estáticas cargan correctamente
- [ ] Las rutas API funcionan
- [ ] La conexión a Supabase funciona
- [ ] Los pagos con Stripe funcionan
- [ ] La autenticación funciona correctamente
