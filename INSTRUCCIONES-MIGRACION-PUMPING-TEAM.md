# 📋 INSTRUCCIONES: Migración Pumping Team

## 🎯 Objetivo
Aplicar cambios en la base de datos para soportar servicios de bombeo de Pumping Team con:
- Políticas de movilización y cancelación
- Especificaciones técnicas de equipos de bombeo
- Sistema de cotizaciones

---

## ⚠️ IMPORTANTE - Antes de comenzar

### ✅ Checklist Pre-Migración

- [ ] **Hacer backup de la base de datos** (Supabase lo hace automáticamente, pero verifica)
- [ ] **Leer el archivo completo** antes de ejecutar
- [ ] **Verificar que tienes acceso** al Dashboard de Supabase
- [ ] **Opcional:** Realizar la migración en horario de bajo tráfico
- [ ] **Tener abierto** el archivo `migration-pumping-team.sql`

### 📊 Cambios que se aplicarán

1. **Nuevos ENUMs:**
   - `MovilizacionModel` (ZONA, KM, FIJA, MIXTO)
   - `TipoBomba` (LINEA, PLUMA, OTRA)
   - `QuotationStatus` (SOLICITADA, PRESUPUESTADA, ACEPTADA, RECHAZADA, VENCIDA)

2. **Columnas nuevas en `providers`:**
   - `contactoProgramacion` - Contacto de agenda
   - `coberturaServicio` - Ciudades/estados cubiertos
   - `correosNotificaciones` - Array de correos (JSONB)
   - `observaciones` - Notas generales

3. **Nuevas tablas:**
   - `provider_service_policies` - Políticas de servicio
   - `bombeo_service_details` - Especificaciones técnicas
   - `quotations` - Sistema de cotizaciones

4. **Políticas RLS:** Seguridad configurada para cada tabla

---

## 🚀 PASO 1: Acceder al SQL Editor de Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Selecciona tu proyecto AMCI E-commerce
3. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
4. Clic en **"New Query"** (botón superior derecho)

---

## 🚀 PASO 2: Ejecutar la Migración

### Opción A: Copiar y Pegar (Recomendado)

1. Abre el archivo `migration-pumping-team.sql`
2. **Selecciona TODO el contenido** (Ctrl+A)
3. **Copia** (Ctrl+C)
4. En el SQL Editor de Supabase, **pega** el código (Ctrl+V)
5. Haz clic en **"Run"** (o presiona Ctrl+Enter)

### Opción B: Ejecutar por Secciones

Si prefieres mayor control, ejecuta cada sección numerada del SQL por separado:

```sql
-- Primero ejecuta sección 1 (ENUMs)
-- Luego sección 2 (Extender providers)
-- Luego sección 3 (Tabla provider_service_policies)
-- ... y así sucesivamente
```

---

## 🚀 PASO 3: Verificar que todo salió bien

### 3.1 Verificar el mensaje de confirmación

Al final de la ejecución deberías ver:

```
✅ Migración completada exitosamente!
📊 Nuevas tablas: provider_service_policies, bombeo_service_details, quotations
🔧 Nuevas columnas en providers: contactoProgramacion, coberturaServicio...
🔒 Políticas RLS aplicadas correctamente
```

### 3.2 Verificar tablas creadas

En el SQL Editor, ejecuta:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
    'provider_service_policies',
    'bombeo_service_details',
    'quotations'
)
ORDER BY table_name;
```

**Resultado esperado:** 3 filas mostrando las 3 tablas nuevas.

### 3.3 Verificar columnas en providers

Ejecuta:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'providers'
AND column_name IN (
    'contactoProgramacion',
    'coberturaServicio',
    'correosNotificaciones',
    'observaciones'
);
```

**Resultado esperado:** 4 filas mostrando las nuevas columnas.

### 3.4 Verificar ENUMs creados

Ejecuta:

```sql
SELECT typname
FROM pg_type
WHERE typname IN (
    'MovilizacionModel',
    'TipoBomba',
    'QuotationStatus'
);
```

**Resultado esperado:** 3 filas mostrando los ENUMs.

### 3.5 Verificar políticas RLS

En el menú lateral, ve a **"Authentication" → "Policies"**

Deberías ver políticas nuevas para:
- `provider_service_policies`
- `bombeo_service_details`
- `quotations`

---

## ✅ PASO 4: Actualizar Prisma Client localmente

Una vez aplicada la migración en Supabase, actualiza tu código local:

```bash
npx prisma db pull
npx prisma generate
```

Esto sincronizará tu schema local con la base de datos.

---

## 🔄 PASO 5: Reiniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor debe iniciar sin errores.

---

## 🐛 Troubleshooting (Solución de Problemas)

### ❌ Error: "type already exists"

**Solución:** El script ya maneja esto con `DO $$ BEGIN ... EXCEPTION`. Puedes ignorar este mensaje si aparece.

### ❌ Error: "column already exists"

**Solución:** El script usa `ADD COLUMN IF NOT EXISTS`. Si ves este error, la columna ya existe y puedes continuar.

### ❌ Error: "permission denied"

**Problema:** Tu usuario no tiene permisos suficientes.

**Solución:**
1. Verifica que estás usando el proyecto correcto en Supabase
2. Verifica que tu usuario es Owner del proyecto
3. Contacta al administrador de Supabase si el problema persiste

### ❌ Error: "syntax error near..."

**Problema:** Algo se copió incorrectamente.

**Solución:**
1. Descarga nuevamente el archivo `migration-pumping-team.sql`
2. Asegúrate de copiar TODO el contenido completo
3. No modifiques el SQL manualmente

---

## 📊 Datos de Prueba (Opcional)

Una vez aplicada la migración, puedes insertar datos de prueba:

```sql
-- Insertar política de servicio para un proveedor existente
INSERT INTO provider_service_policies (
    "providerId",
    "modeloMovilizacion",
    "tiempoMinimoFacturable",
    "precioHorasExtra",
    "ventanaCancelacion",
    "penalizacionMonto",
    "penalizacionTipo"
)
SELECT
    id,
    'MIXTO',
    4,
    850.00,
    24,
    50.00,
    'PORCENTAJE'
FROM providers
WHERE "razonSocial" ILIKE '%pumping%'
LIMIT 1;
```

---

## 🔙 Rollback (Revertir cambios)

Si algo sale mal y necesitas revertir:

```sql
-- ADVERTENCIA: Esto eliminará las tablas y datos
DROP TABLE IF EXISTS quotations CASCADE;
DROP TABLE IF EXISTS bombeo_service_details CASCADE;
DROP TABLE IF EXISTS provider_service_policies CASCADE;

-- Eliminar columnas de providers
ALTER TABLE providers
DROP COLUMN IF EXISTS "contactoProgramacion",
DROP COLUMN IF EXISTS "coberturaServicio",
DROP COLUMN IF EXISTS "correosNotificaciones",
DROP COLUMN IF EXISTS "observaciones";

-- Eliminar ENUMs
DROP TYPE IF EXISTS "QuotationStatus";
DROP TYPE IF EXISTS "TipoBomba";
DROP TYPE IF EXISTS "MovilizacionModel";
```

⚠️ **ADVERTENCIA:** El rollback eliminará TODOS los datos de las tablas nuevas.

---

## 📞 Contacto y Soporte

Si encuentras problemas:

1. **Revisa los logs** en Supabase Dashboard → Database → Logs
2. **Copia el mensaje de error completo**
3. **Verifica** que el schema de Prisma coincida con la BD

---

## ✅ Checklist Post-Migración

- [ ] ✅ Migración ejecutada sin errores
- [ ] ✅ 3 tablas nuevas creadas
- [ ] ✅ 4 columnas nuevas en `providers`
- [ ] ✅ 3 ENUMs creados
- [ ] ✅ Políticas RLS verificadas
- [ ] ✅ `npx prisma db pull` ejecutado
- [ ] ✅ `npx prisma generate` ejecutado
- [ ] ✅ Servidor de desarrollo reiniciado
- [ ] ✅ Sin errores en consola

---

## 🎉 ¡Listo!

La base de datos ahora está preparada para soportar servicios de Pumping Team.

**Próximos pasos:**
- Continuar con FASE 2: APIs de cotización
- Continuar con FASE 3: Componentes de frontend

---

**Fecha:** 2025-11-03
**Versión:** 1.0
**Autor:** Claude Code
