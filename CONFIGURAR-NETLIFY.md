# ⚠️ CONFIGURACIÓN OBLIGATORIA DE NETLIFY

## Por qué necesitas configurar variables de entorno

Este proyecto usa:
- **Supabase** (base de datos y autenticación)
- **Stripe** (procesamiento de pagos)

Sin las credenciales de estos servicios, el build fallará con el error:
```
Error: supabaseUrl is required.
```

## Pasos para Configurar en Netlify

### 1. Ve a la configuración de tu sitio en Netlify

1. Abre https://app.netlify.com
2. Selecciona tu sitio (amci-ecommerce)
3. Ve a **Site configuration** → **Environment variables**

### 2. Agrega estas 6 variables de entorno

Haz clic en **Add a variable** y agrega cada una:

```
NEXT_PUBLIC_SUPABASE_URL
Valor: https://tu-proyecto.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...tu_clave_anon_aqui

SUPABASE_SERVICE_ROLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...tu_clave_service_role_aqui

DATABASE_URL
Valor: postgresql://postgres.xxxxx:tu_password@db.xxxxx.supabase.co:5432/postgres

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Valor: pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx

STRIPE_SECRET_KEY
Valor: sk_test_xxxxxxxxxxxxxxxxxxxxxxxxx
```

**📝 Nota:** Obtén tus propias claves desde:
- Supabase: https://app.supabase.com (Project Settings → API)
- Stripe: https://dashboard.stripe.com/test/apikeys

### 3. Redeploy

Una vez agregadas todas las variables:
1. Ve a **Deploys**
2. Haz clic en **Trigger deploy** → **Deploy site**

O simplemente espera a que Netlify detecte tu próximo push a GitHub.

## Alternativa Rápida (Copiar y Pegar)

Si prefieres, puedes usar la API de Netlify o el archivo de configuración, pero la forma más sencilla es agregarlas manualmente en la interfaz web como se describe arriba.

## Verificación

Después de configurar las variables, el build debería completarse exitosamente. Verás este mensaje en los logs:

```
✓ Creating an optimized production build...
✓ Compiled successfully
```

## ⚠️ Importante

- Estas son **claves de prueba** de Stripe (pk_test_ y sk_test_)
- Para producción, deberás usar claves reales de Stripe
- NUNCA compartas las claves `SERVICE_ROLE_KEY` o `SECRET_KEY` públicamente
