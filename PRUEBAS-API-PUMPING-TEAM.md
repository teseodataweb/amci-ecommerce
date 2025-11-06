# 🧪 GUÍA DE PRUEBAS - APIs PUMPING TEAM

Esta guía contiene ejemplos completos para probar todas las APIs de cotización usando **curl** o **Postman**.

---

## 📋 PRE-REQUISITOS

Antes de ejecutar las pruebas:

1. ✅ Migración aplicada en Supabase
2. ✅ Datos de prueba cargados
3. ✅ Servidor en ejecución: `npm run dev`
4. ✅ URL base: `http://localhost:3000`

---

## 🔑 IDs de Prueba

Después de cargar los datos de prueba, usa estos IDs:

```javascript
// Usuarios
const CLIENT_ID = "user-cliente-test-001";
const PROVIDER_ID = "provider-pumping-team-001";

// Productos
const PRODUCTO_LINEA = "prod-bomba-linea-001";
const PRODUCTO_PLUMA = "prod-bomba-pluma-001";
const PRODUCTO_COMPACTA = "prod-bomba-compacta-001";
```

---

## 🧪 PRUEBA 1: Solicitar Cotización (Cliente)

### Con curl:

```bash
curl -X POST http://localhost:3000/api/quotations/request \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod-bomba-linea-001",
    "clienteId": "user-cliente-test-001",
    "datosServicio": {
      "ubicacion": "Av. Reforma 123, Polanco, CDMX",
      "fechaRequerida": "2025-11-25T09:00:00",
      "volumenEstimado": 45,
      "duracionEstimada": 4,
      "condicionesSitio": {
        "tipoObra": "Losa de cimentación",
        "accesoVehicular": "Calle pavimentada, ancho 4m",
        "aguaDisponible": true,
        "condicionesAdicionales": "Sin obstáculos aéreos, terreno nivelado"
      }
    },
    "notasCliente": "Urgente: necesitamos confirmar disponibilidad pronto"
  }'
```

### Con Postman:

**Método:** `POST`
**URL:** `http://localhost:3000/api/quotations/request`
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "productId": "prod-bomba-linea-001",
  "clienteId": "user-cliente-test-001",
  "datosServicio": {
    "ubicacion": "Av. Reforma 123, Polanco, CDMX",
    "fechaRequerida": "2025-11-25T09:00:00",
    "volumenEstimado": 45,
    "duracionEstimada": 4,
    "condicionesSitio": {
      "tipoObra": "Losa de cimentación",
      "accesoVehicular": "Calle pavimentada, ancho 4m",
      "aguaDisponible": true,
      "condicionesAdicionales": "Sin obstáculos aéreos, terreno nivelado"
    }
  },
  "notasCliente": "Urgente: necesitamos confirmar disponibilidad pronto"
}
```

### Respuesta Esperada:

```json
{
  "message": "Cotización solicitada exitosamente",
  "quotation": {
    "id": "uuid-generado-aqui",
    "status": "SOLICITADA",
    "producto": "Servicio de Bombeo - Bomba de Línea Estacionaria",
    "proveedor": "Pumping Team S.A. de C.V.",
    "datosServicio": { ... },
    "createdAt": "2025-11-03T..."
  },
  "nextSteps": [
    "El proveedor revisará tu solicitud",
    "Recibirás un presupuesto en las próximas 24-48 horas",
    "Podrás aceptar o rechazar el presupuesto desde tu panel"
  ]
}
```

**📝 IMPORTANTE:** Guarda el `quotation.id` para las siguientes pruebas.

---

## 🧪 PRUEBA 2: Listar Cotizaciones (Cliente)

### Con curl:

```bash
curl "http://localhost:3000/api/quotations?userId=user-cliente-test-001&role=CLIENTE"
```

### Con Postman:

**Método:** `GET`
**URL:** `http://localhost:3000/api/quotations`
**Query Params:**
```
userId = user-cliente-test-001
role = CLIENTE
```

### Respuesta Esperada:

```json
{
  "quotations": [
    {
      "id": "...",
      "status": "SOLICITADA",
      "presupuesto": null,
      "validoHasta": null,
      "createdAt": "...",
      "producto": {
        "id": "prod-bomba-linea-001",
        "nombre": "Servicio de Bombeo - Bomba de Línea Estacionaria",
        "proveedor": "Pumping Team S.A. de C.V."
      },
      "servicio": { ... },
      "estaVencida": false,
      "puedeAceptar": false,
      "puedeResponder": false
    }
  ],
  "stats": {
    "total": 1,
    "solicitadas": 1,
    "presupuestadas": 0,
    "aceptadas": 0,
    "rechazadas": 0,
    "vencidas": 0
  }
}
```

---

## 🧪 PRUEBA 3: Responder Cotización (Proveedor)

**IMPORTANTE:** Reemplaza `{quotationId}` con el ID de la prueba 1.

### Con curl:

```bash
curl -X PATCH "http://localhost:3000/api/quotations/{quotationId}/respond" \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "provider-pumping-team-001",
    "presupuesto": 18500.00,
    "validoHasta": "2025-11-10T23:59:59",
    "notasProveedor": "Incluye operador certificado y 150m de manguera. Servicio programado para las 09:00 AM. Tiempo estimado: 4 horas."
  }'
```

### Con Postman:

**Método:** `PATCH`
**URL:** `http://localhost:3000/api/quotations/{quotationId}/respond`
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "providerId": "provider-pumping-team-001",
  "presupuesto": 18500.00,
  "validoHasta": "2025-11-10T23:59:59",
  "notasProveedor": "Incluye operador certificado y 150m de manguera. Servicio programado para las 09:00 AM. Tiempo estimado: 4 horas."
}
```

### Respuesta Esperada:

```json
{
  "message": "Presupuesto enviado exitosamente",
  "quotation": {
    "id": "...",
    "status": "PRESUPUESTADA",
    "presupuesto": 18500.00,
    "validoHasta": "2025-11-10T23:59:59.000Z",
    "notasProveedor": "Incluye operador certificado y 150m de manguera...",
    "respondidaAt": "2025-11-03T..."
  },
  "nextSteps": [
    "El cliente recibirá una notificación por correo",
    "El cliente puede aceptar o rechazar tu presupuesto",
    "El presupuesto es válido hasta 10/11/2025"
  ]
}
```

---

## 🧪 PRUEBA 4: Listar Cotizaciones (Proveedor)

### Con curl:

```bash
curl "http://localhost:3000/api/quotations?userId=user-pumping-team-001&role=PROVEEDOR&providerId=provider-pumping-team-001"
```

### Con Postman:

**Método:** `GET`
**URL:** `http://localhost:3000/api/quotations`
**Query Params:**
```
userId = user-pumping-team-001
role = PROVEEDOR
providerId = provider-pumping-team-001
```

### Respuesta Esperada:

```json
{
  "quotations": [
    {
      "id": "...",
      "status": "PRESUPUESTADA",
      "presupuesto": 18500.00,
      "validoHasta": "2025-11-10T23:59:59.000Z",
      "cliente": {
        "id": "user-cliente-test-001",
        "nombre": "Juan Pérez",
        "email": "cliente.test@ejemplo.com",
        "telefono": "55-9999-8888"
      },
      "producto": { ... },
      "servicio": { ... },
      "puedeAceptar": true,
      "puedeResponder": false
    }
  ],
  "stats": { ... }
}
```

---

## 🧪 PRUEBA 5: Aceptar Cotización (Cliente)

**IMPORTANTE:** Esto genera una orden automáticamente.

### Con curl:

```bash
curl -X POST "http://localhost:3000/api/quotations/{quotationId}/accept" \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "user-cliente-test-001"
  }'
```

### Con Postman:

**Método:** `POST`
**URL:** `http://localhost:3000/api/quotations/{quotationId}/accept`
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "clienteId": "user-cliente-test-001"
}
```

### Respuesta Esperada:

```json
{
  "message": "Cotización aceptada y orden creada exitosamente",
  "order": {
    "id": "uuid-de-orden-generado",
    "total": 21460.00,
    "estado": "RECIBIDO",
    "createdAt": "2025-11-03T..."
  },
  "quotation": {
    "id": "...",
    "status": "ACEPTADA",
    "presupuesto": 18500.00
  },
  "nextSteps": [
    "Tu orden ha sido enviada al proveedor",
    "El proveedor confirmará la fecha y hora del servicio",
    "Recibirás notificaciones del estado de tu orden",
    "Puedes ver los detalles en /orden/{orderId}"
  ]
}
```

**📝 NOTA:** El total incluye IVA (16%): $18,500 + $2,960 = $21,460

---

## 🧪 PRUEBA 6: Filtrar Cotizaciones por Estado

### Cotizaciones Pendientes de Respuesta:

```bash
curl "http://localhost:3000/api/quotations?userId=user-pumping-team-001&role=PROVEEDOR&providerId=provider-pumping-team-001&status=SOLICITADA"
```

### Cotizaciones Presupuestadas:

```bash
curl "http://localhost:3000/api/quotations?userId=user-cliente-test-001&role=CLIENTE&status=PRESUPUESTADA"
```

### Cotizaciones Aceptadas:

```bash
curl "http://localhost:3000/api/quotations?userId=user-cliente-test-001&role=CLIENTE&status=ACEPTADA"
```

---

## 🧪 PRUEBA 7: Escenarios de Error

### Error: Producto no requiere cotización

```bash
curl -X POST http://localhost:3000/api/quotations/request \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "kit-epp-basico-1-persona",
    "clienteId": "user-cliente-test-001",
    "datosServicio": {
      "ubicacion": "Test",
      "fechaRequerida": "2025-12-01T10:00:00"
    }
  }'
```

**Respuesta Esperada:**
```json
{
  "error": "Este producto no requiere cotización",
  "pricing_mode": "precio"
}
```

### Error: Cotización ya respondida

Intenta responder la misma cotización 2 veces:

```bash
curl -X PATCH "http://localhost:3000/api/quotations/{quotationId}/respond" \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "provider-pumping-team-001",
    "presupuesto": 20000.00
  }'
```

**Respuesta Esperada:**
```json
{
  "error": "Esta cotización ya fue respondida",
  "currentStatus": "PRESUPUESTADA"
}
```

### Error: Presupuesto vencido

Aceptar una cotización con `validoHasta` en el pasado:

**Respuesta Esperada:**
```json
{
  "error": "El presupuesto ha expirado",
  "validoHasta": "2025-10-01T..."
}
```

---

## 📊 VERIFICACIÓN EN SUPABASE

### Ver todas las cotizaciones:

```sql
SELECT
    q.id,
    q.status,
    q.presupuesto,
    p.nombre as producto,
    u.name as cliente,
    q.created_at
FROM quotations q
JOIN products p ON q.product_id = p.id
JOIN users u ON q.cliente_id = u.id
ORDER BY q.created_at DESC;
```

### Ver órdenes generadas desde cotizaciones:

```sql
SELECT
    o.id,
    o.total,
    o.estado,
    o.notes,
    o.created_at
FROM orders o
WHERE o.notes LIKE '%cotización%'
ORDER BY o.created_at DESC;
```

---

## 🎯 FLUJO COMPLETO DE PRUEBA

Ejecuta en orden:

1. ✅ **Solicitar cotización** (Cliente)
   - Guarda el `quotationId`

2. ✅ **Listar cotizaciones** (Cliente)
   - Verifica status = SOLICITADA

3. ✅ **Listar cotizaciones** (Proveedor)
   - Verifica que aparece la cotización

4. ✅ **Responder cotización** (Proveedor)
   - Verifica status = PRESUPUESTADA

5. ✅ **Listar cotizaciones** (Cliente)
   - Verifica presupuesto visible

6. ✅ **Aceptar cotización** (Cliente)
   - Verifica orden creada

7. ✅ **Verificar en Supabase**
   - Revisa tabla `quotations`
   - Revisa tabla `orders`
   - Revisa tabla `order_items`

---

## 📦 COLECCIÓN DE POSTMAN

Importa esta colección JSON en Postman:

```json
{
  "info": {
    "name": "Pumping Team - Cotizaciones",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Solicitar Cotización",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "url": "http://localhost:3000/api/quotations/request",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"productId\": \"prod-bomba-linea-001\",\n  \"clienteId\": \"user-cliente-test-001\",\n  \"datosServicio\": {\n    \"ubicacion\": \"Av. Reforma 123, Polanco, CDMX\",\n    \"fechaRequerida\": \"2025-11-25T09:00:00\",\n    \"volumenEstimado\": 45,\n    \"duracionEstimada\": 4\n  }\n}"
        }
      }
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module QuotationForm"
```bash
# Verifica que el componente existe:
ls src/components/quotations/QuotationForm.tsx

# Reinicia el servidor:
npm run dev
```

### Error: "User not found"
```sql
-- Verifica que el usuario existe:
SELECT * FROM users WHERE email = 'cliente.test@ejemplo.com';
```

### Error: "Product not found"
```sql
-- Verifica que los productos existen:
SELECT id, nombre FROM products WHERE pricing_mode = 'COTIZAR';
```

---

**Última actualización:** 2025-11-03
