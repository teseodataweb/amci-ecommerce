# 🚀 INICIO RÁPIDO - PUMPING TEAM

**Tiempo estimado:** 15-20 minutos

---

## ✅ PASO 1: Aplicar Migración en Supabase (5 min)

### 1.1 Abrir SQL Editor

1. Ve a [supabase.com](https://supabase.com)
2. Selecciona tu proyecto AMCI
3. Click en **"SQL Editor"** (menú izquierdo)
4. Click en **"New Query"**

### 1.2 Ejecutar Migración

1. Abre el archivo: `migration-pumping-team.sql`
2. Selecciona **TODO** el contenido (Ctrl+A)
3. Copia (Ctrl+C)
4. Pega en SQL Editor de Supabase (Ctrl+V)
5. Click en **"Run"** o presiona Ctrl+Enter

**✅ Espera ver:**
```
✅ Migración completada exitosamente!
📊 Nuevas tablas: provider_service_policies, bombeo_service_details, quotations
```

---

## ✅ PASO 2: Cargar Datos de Prueba (3 min)

### 2.1 Ejecutar Script de Datos

1. En el mismo SQL Editor, **borra** el contenido anterior
2. Abre el archivo: `datos-prueba-pumping-team.sql`
3. Copia **TODO** el contenido
4. Pega en SQL Editor
5. Click en **"Run"**

**✅ Espera ver:**
```
✅ DATOS DE PRUEBA CREADOS EXITOSAMENTE
Proveedores Pumping Team: 1
Productos de bombeo: 3
Fichas técnicas: 3
🎉 Pumping Team está listo para recibir cotizaciones!
```

---

## ✅ PASO 3: Actualizar Código Local (3 min)

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Sincronizar schema con Supabase
npx prisma db pull

# Generar cliente actualizado
npx prisma generate

# Iniciar servidor
npm run dev
```

**✅ Espera ver:**
```
✔ Generated Prisma Client
ready - started server on 0.0.0.0:3000
```

---

## ✅ PASO 4: Verificar que Funciona (5 min)

### 4.1 Ver Productos de Pumping Team

1. Abre tu navegador en: `http://localhost:3000/catalogo`
2. Deberías ver **3 servicios de bombeo**:
   - ✅ Bomba de Línea Estacionaria
   - ✅ Bomba de Pluma 32m
   - ✅ Bomba Compacta

3. Verifica que todos tengan:
   - Badge **"Cotizar"**
   - Proveedor: **Pumping Team S.A. de C.V.**
   - Botón: **"Solicitar cotización"**

### 4.2 Probar API de Cotización

Usa **Postman**, **Insomnia** o **curl**:

```bash
curl -X POST http://localhost:3000/api/quotations/request \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod-bomba-linea-001",
    "clienteId": "user-cliente-test-001",
    "datosServicio": {
      "ubicacion": "CDMX, Polanco",
      "fechaRequerida": "2025-11-20T09:00:00",
      "volumenEstimado": 30,
      "duracionEstimada": 3
    },
    "notasCliente": "Prueba de cotización"
  }'
```

**✅ Espera recibir:**
```json
{
  "message": "Cotización solicitada exitosamente",
  "quotation": {
    "id": "...",
    "status": "SOLICITADA",
    "producto": "Servicio de Bombeo - Bomba de Línea Estacionaria",
    "proveedor": "Pumping Team S.A. de C.V."
  }
}
```

---

## ✅ PASO 5: Revisar Datos en Supabase (2 min)

### 5.1 Tabla: providers

1. En Supabase, ve a **"Table Editor"**
2. Selecciona tabla **"providers"**
3. Busca: **"Pumping Team S.A. de C.V."**

**✅ Verifica que tiene:**
- contacto_programacion ✓
- cobertura_servicio ✓
- correos_notificaciones (JSON) ✓
- active = `true` ✓

### 5.2 Tabla: bombeo_service_details

1. Selecciona tabla **"bombeo_service_details"**
2. Deberías ver **3 filas**

**✅ Verifica campos:**
- tipo_bomba ✓
- capacidad_nominal ✓
- alcance_horizontal ✓
- requerimientos_sitio (JSON) ✓

### 5.3 Tabla: quotations

1. Selecciona tabla **"quotations"**
2. Si ejecutaste el curl del paso 4.2, deberías ver **2 cotizaciones**:
   - 1 de ejemplo (status: SOLICITADA)
   - 1 de tu prueba (status: SOLICITADA)

---

## 🎉 ¡LISTO!

### ✅ Lo que ya funciona:

1. **Registro de Pumping Team** ✅
   - Todos los campos capturados
   - Políticas de servicio configuradas
   - Productos con especificaciones técnicas completas

2. **Sistema de Cotizaciones** ✅
   - Los clientes pueden solicitar cotizaciones (vía API)
   - Pumping Team puede responder (vía API)
   - Los clientes pueden aceptar y se genera orden automáticamente

3. **Catálogo** ✅
   - Servicios visibles con badge "Cotizar"
   - Información básica mostrada

---

## 🔜 Lo que falta (UI)

### En progreso:
- [ ] Formulario visual para solicitar cotización
- [ ] Panel para que Pumping Team responda cotizaciones
- [ ] Panel para que clientes acepten presupuestos

**Mientras tanto:** Usa las APIs directamente con Postman/Insomnia

---

## 📖 APIs Disponibles

### 1. Solicitar Cotización
```
POST /api/quotations/request
```

### 2. Responder Cotización (Proveedor)
```
PATCH /api/quotations/[id]/respond
Body: { providerId, presupuesto, validoHasta, notasProveedor }
```

### 3. Aceptar Cotización (Cliente)
```
POST /api/quotations/[id]/accept
Body: { clienteId, addressId }
```

### 4. Listar Cotizaciones
```
GET /api/quotations?userId=xxx&role=CLIENTE|PROVEEDOR
```

---

## 🆘 Solución de Problemas

### ❌ Error: "relation does not exist"
**Causa:** No aplicaste la migración
**Solución:** Ejecuta `migration-pumping-team.sql` en Supabase

### ❌ Error: "Prisma Client validation error"
**Causa:** Cliente de Prisma desactualizado
**Solución:**
```bash
npx prisma generate
```

### ❌ No veo los productos en /catalogo
**Causa:** No cargaste los datos de prueba
**Solución:** Ejecuta `datos-prueba-pumping-team.sql`

### ❌ Error 404 en API de cotizaciones
**Causa:** Servidor no reiniciado
**Solución:**
```bash
# Ctrl+C para detener
npm run dev # Reiniciar
```

---

## 📞 Siguiente Paso

Una vez verificado que todo funciona, puedes:

1. **Crear Pumping Team real** (reemplazar datos de prueba)
2. **Probar flujo completo** de cotización
3. **Implementar componentes UI** (opcional)

---

## 📁 Archivos de Referencia

- `migration-pumping-team.sql` - Migración principal
- `datos-prueba-pumping-team.sql` - Datos de ejemplo
- `INSTRUCCIONES-MIGRACION-PUMPING-TEAM.md` - Guía detallada
- `RESUMEN-IMPLEMENTACION-PUMPING-TEAM.md` - Documentación completa

---

**¿Todo funcionó?** ✅ Pumping Team ya está operativo en tu sistema!
**¿Problemas?** Revisa los archivos de instrucciones detalladas.

---

**Última actualización:** 2025-11-03
