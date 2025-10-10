# 🧪 GUÍA DE TESTING - AMCI E-Commerce

**Última actualización:** 3 de Octubre, 2025
**Versión:** 1.0.0

---

## 🎯 OBJETIVO

Esta guía te ayudará a probar **todas las funcionalidades** del sistema AMCI E-Commerce de forma ordenada y completa.

---

## ✅ PRE-REQUISITOS

Antes de comenzar, asegúrate de:

1. ✅ Servidor corriendo: `npm run dev`
2. ✅ Base de datos configurada en Supabase
3. ✅ Variables de entorno configuradas (.env)
4. ✅ Tener al menos:
   - 1 usuario ADMIN
   - 1 usuario PROVEEDOR
   - 1 usuario CLIENTE
   - Algunos productos creados y aprobados

---

## 📝 TABLA DE PRUEBAS

| # | Módulo | Descripción | Estado |
|---|--------|-------------|--------|
| 1 | Autenticación | Login/Registro/Logout | ⬜ |
| 2 | Catálogo | Ver productos | ⬜ |
| 3 | Carrito | Agregar/Quitar productos | ⬜ |
| 4 | Checkout | Proceso completo de compra | ⬜ |
| 5 | Órdenes | Ver mis órdenes | ⬜ |
| 6 | Panel Proveedor | Dashboard y tracking | ⬜ |
| 7 | Panel Admin | Gestión completa | ⬜ |

---

## 🧪 TEST #1: AUTENTICACIÓN

### Objetivo: Verificar login, registro y roles

### Pasos:

#### 1.1 Registro de Cliente
```
1. Ir a: http://localhost:3000/registro
2. Llenar formulario:
   - Nombre: "Juan Pérez"
   - Email: "juan.cliente@test.com"
   - Contraseña: "Test123!"
   - Confirmar contraseña: "Test123!"
3. Click "Registrarse"
4. ✅ Verificar: Redirige a login
```

#### 1.2 Login como Cliente
```
1. Ir a: http://localhost:3000/login
2. Ingresar:
   - Email: "juan.cliente@test.com"
   - Contraseña: "Test123!"
3. Click "Iniciar Sesión"
4. ✅ Verificar: Redirige a home y muestra nombre en header
```

#### 1.3 Login como Proveedor
```
1. Logout del cliente
2. Ir a: http://localhost:3000/login
3. Ingresar credenciales de proveedor
4. ✅ Verificar: Puede acceder a /panel/proveedor
5. ✅ Verificar: NO puede acceder a /panel/admin (debe redirigir)
```

#### 1.4 Login como Admin
```
1. Logout del proveedor
2. Ir a: http://localhost:3000/login
3. Ingresar: teseodata@gmail.com
4. ✅ Verificar: Puede acceder a /panel/admin
5. ✅ Verificar: Puede acceder a /reportes
```

---

## 🧪 TEST #2: CATÁLOGO Y PRODUCTOS

### Objetivo: Verificar visualización de productos

### Pasos:

#### 2.1 Ver Catálogo
```
1. Ir a: http://localhost:3000/catalogo
2. ✅ Verificar: Se muestran productos aprobados
3. ✅ Verificar: Cada producto muestra:
   - Imagen
   - Nombre
   - Precio
   - Proveedor
   - Botón "Ver detalles"
```

#### 2.2 Filtrar Productos
```
1. En /catalogo, usar filtros:
   - Filtrar por categoría
   - Ordenar por precio
2. ✅ Verificar: Filtros funcionan correctamente
```

#### 2.3 Ver Detalle de Producto
```
1. Click en un producto
2. ✅ Verificar: Muestra página /producto/[slug]
3. ✅ Verificar: Muestra:
   - Imágenes
   - Descripción completa
   - Precio
   - Stock disponible
   - Información del proveedor
   - Botón "Agregar al carrito"
```

---

## 🧪 TEST #3: CARRITO DE COMPRAS

### Objetivo: Verificar gestión del carrito

### Pasos:

#### 3.1 Agregar al Carrito
```
1. Estar logueado como CLIENTE
2. Ir a un producto
3. Click "Agregar al carrito"
4. ✅ Verificar: Icono del carrito muestra cantidad (badge)
5. ✅ Verificar: Mensaje de confirmación
```

#### 3.2 Ver Carrito
```
1. Click en icono del carrito
2. Ir a: http://localhost:3000/carrito
3. ✅ Verificar: Muestra productos agregados
4. ✅ Verificar: Muestra:
   - Imagen del producto
   - Nombre
   - Precio unitario
   - Cantidad (con botones +/-)
   - Subtotal
   - Total general
```

#### 3.3 Modificar Cantidad
```
1. En /carrito, cambiar cantidad:
   - Click en "+" para aumentar
   - Click en "-" para disminuir
2. ✅ Verificar: Subtotal se actualiza
3. ✅ Verificar: Total general se actualiza
```

#### 3.4 Eliminar Producto
```
1. Click en "Eliminar" en un producto
2. ✅ Verificar: Producto se elimina del carrito
3. ✅ Verificar: Total se actualiza
4. ✅ Verificar: Si carrito queda vacío, muestra mensaje
```

---

## 🧪 TEST #4: CHECKOUT Y PAGO (CRÍTICO)

### Objetivo: ⭐ Verificar flujo completo de compra

### Pasos:

#### 4.1 Preparación
```
1. Tener al menos 1 producto en el carrito
2. Verificar stock del producto en BD (ej: 10 unidades)
3. Ir a: http://localhost:3000/carrito
4. Click "Proceder al checkout"
```

#### 4.2 Llenar Formulario de Checkout
```
1. En /checkout, llenar:

   INFORMACIÓN PERSONAL:
   - Nombre: "Juan Pérez Test"
   - Email: "juan@test.com"
   - Teléfono: "5512345678"

   DIRECCIÓN DE ENVÍO:
   - Calle: "Av. Insurgentes"
   - Número: "123"
   - Colonia: "Roma Norte"
   - Código Postal: "06700"
   - Ciudad: "CDMX"
   - Estado: "Ciudad de México"

   TÉRMINOS:
   - ✅ Acepto términos y condiciones
   - ✅ Acepto política de privacidad

2. Click "Continuar al pago"
3. ✅ Verificar: Muestra formulario de Stripe
```

#### 4.3 Procesar Pago con Stripe
```
TARJETA DE PRUEBA:
- Número: 4242 4242 4242 4242
- Fecha: 12/25 (cualquier fecha futura)
- CVC: 123
- Nombre: Test User
- Código Postal: 12345

1. Ingresar datos de tarjeta
2. Click "Pagar"
3. ✅ Verificar: Muestra "Procesando..."
4. ✅ Verificar: Redirige a /orden/[id]?success=true
```

#### 4.4 Verificar Orden Creada ⭐ IMPORTANTE
```
1. En página /orden/[id], verificar:
   ✅ Muestra mensaje "¡Gracias por tu compra!"
   ✅ Muestra número de orden (ej: #A1B2C3D4)
   ✅ Muestra estado: "RECIBIDO"
   ✅ Muestra estado de pago: "Pagado" (badge verde)
   ✅ Muestra fecha y hora de compra
   ✅ Lista todos los productos comprados
   ✅ Muestra dirección de envío completa
   ✅ Muestra totales:
      - Subtotal
      - Envío
      - IVA (16%)
      - Total
```

#### 4.5 Verificar en Base de Datos ⭐ CRÍTICO
```
Ir a Supabase > Table Editor:

1. Tabla "orders":
   ✅ Existe nueva orden
   ✅ payment_id contiene el PaymentIntent de Stripe
   ✅ payment_status = "paid"
   ✅ estado = "RECIBIDO"
   ✅ Todos los campos llenos correctamente

2. Tabla "order_items":
   ✅ Existen items relacionados a la orden
   ✅ Cantidad correcta
   ✅ Precios correctos

3. Tabla "addresses":
   ✅ Dirección guardada correctamente

4. Tabla "products":
   ✅ STOCK SE REDUJO (ej: era 10, ahora es 9) ⭐
```

#### 4.6 Verificar Carrito Vacío
```
1. Ir a: http://localhost:3000/carrito
2. ✅ Verificar: Carrito está vacío
3. ✅ Verificar: Badge del carrito muestra "0"
```

---

## 🧪 TEST #5: MIS ÓRDENES (CLIENTE)

### Objetivo: Verificar visualización de órdenes

### Pasos:

#### 5.1 Ver Lista de Órdenes
```
1. Estar logueado como CLIENTE
2. Ir a: http://localhost:3000/ordenes
3. ✅ Verificar: Muestra tabla con órdenes del usuario
4. ✅ Verificar: Muestra:
   - Número de orden
   - Fecha
   - Total
   - Estado (badge con color)
   - Botón "Ver detalles"
```

#### 5.2 Ver Detalle de Orden
```
1. Click en "Ver detalles" de una orden
2. ✅ Verificar: Redirige a /orden/[id]
3. ✅ Verificar: Muestra toda la información
4. ✅ Verificar: Si hay tracking, lo muestra
```

---

## 🧪 TEST #6: PANEL PROVEEDOR

### Objetivo: Verificar dashboard y tracking

### Pasos:

#### 6.1 Ver Dashboard
```
1. Login como PROVEEDOR
2. Ir a: http://localhost:3000/panel/proveedor
3. ✅ Verificar: Muestra estadísticas:
   - Total productos
   - Productos activos
   - Productos pendientes
   - Total órdenes
   - Ventas totales (MXN)
```

#### 6.2 Ver Órdenes del Proveedor
```
1. Scroll a sección "Mis Órdenes"
2. ✅ Verificar: Muestra solo órdenes con productos del proveedor
3. ✅ Verificar: Cada orden muestra:
   - Cliente
   - Total
   - Estado
   - Fecha
   - Acciones según estado
```

#### 6.3 Registrar Tracking de Envío ⭐ NUEVO
```
Seleccionar una orden en estado "RECIBIDO" o "CONFIRMADO":

1. Click en botón "Enviar" (ícono de camión)
2. ✅ Verificar: Abre modal con formulario
3. Llenar datos:
   - Paquetería: "DHL"
   - Número de guía: "1234567890"
   - URL de tracking: "https://www.dhl.com/tracking?id=1234567890"
4. Click "Registrar envío"
5. ✅ Verificar: Modal se cierra
6. ✅ Verificar: Estado de orden cambia a "ENVIADO"
7. ✅ Verificar: Aparece mensaje de éxito
```

#### 6.4 Verificar Tracking en Base de Datos
```
Ir a Supabase > Table Editor > shippings:

1. ✅ Verificar: Existe nuevo registro
2. ✅ Verificar: order_id corresponde a la orden
3. ✅ Verificar: carrier = "DHL"
4. ✅ Verificar: tracking = "1234567890"
5. ✅ Verificar: tracking_url guardada
6. ✅ Verificar: fecha_envio tiene timestamp
```

#### 6.5 Verificar Tracking en Vista del Cliente
```
1. Logout proveedor
2. Login como CLIENTE (dueño de la orden)
3. Ir a /orden/[id] de la orden enviada
4. ✅ Verificar: Muestra sección "Información de Envío"
5. ✅ Verificar: Muestra:
   - Paquetería: DHL
   - Número de Guía: 1234567890
   - Botón "Rastrear Envío" (con link)
6. Click en "Rastrear Envío"
7. ✅ Verificar: Abre nueva pestaña con URL de tracking
```

---

## 🧪 TEST #7: PANEL ADMIN

### Objetivo: Verificar gestión administrativa

### Pasos:

#### 7.1 Ver Dashboard Admin
```
1. Login como ADMIN
2. Ir a: http://localhost:3000/panel/admin
3. ✅ Verificar: Muestra estadísticas globales:
   - Órdenes totales
   - Productos pendientes (con badge)
   - Productos activos
   - Ventas totales
```

#### 7.2 Gestión de Productos
```
1. En /panel/admin, ir a pestaña "Productos"
2. ✅ Verificar: Muestra todos los productos del sistema
3. Filtrar por "Pendientes"
4. ✅ Verificar: Muestra solo productos pendientes
5. Click "Aprobar" en un producto
6. ✅ Verificar: Estado cambia a "Aprobado"
7. ✅ Verificar: Producto aparece en catálogo público
```

#### 7.3 Gestión de Órdenes
```
1. Ir a pestaña "Órdenes"
2. ✅ Verificar: Muestra todas las órdenes del sistema
3. ✅ Verificar: Cada orden muestra:
   - ID
   - Cliente
   - Proveedor(es)
   - Total
   - Estado
   - Fecha
4. Click en una orden
5. ✅ Verificar: Muestra detalles completos
```

#### 7.4 Gestión de Proveedores
```
1. Ir a pestaña "Proveedores"
2. ✅ Verificar: Muestra todos los proveedores
3. ✅ Verificar: Badge muestra proveedores pendientes
4. Filtrar "Pendientes"
5. Click "Aprobar" en un proveedor
6. ✅ Verificar: Estado cambia a "Aprobado"
7. ✅ Verificar: Proveedor puede crear productos
```

#### 7.5 Reportes
```
1. Ir a: http://localhost:3000/reportes
2. Seleccionar "Ventas por Proveedor"
3. ✅ Verificar: Muestra tabla con:
   - Nombre del proveedor
   - Total de órdenes
   - Total de ventas
4. Click "Exportar CSV"
5. ✅ Verificar: Descarga archivo CSV

Repetir con:
- "Productos Más Vendidos"
- "Comisiones"
```

---

## 🔄 TEST #8: FLUJO COMPLETO END-TO-END

### Objetivo: Probar flujo completo desde compra hasta entrega

### Pasos:

```
PASO 1: COMPRA (Cliente)
1. Login como cliente
2. Agregar producto al carrito
3. Hacer checkout completo
4. Pagar con Stripe (tarjeta de prueba)
5. ✅ Verificar: Orden creada con estado "RECIBIDO"

PASO 2: CONFIRMACIÓN (Proveedor - Opcional)
1. Logout cliente
2. Login como proveedor (dueño del producto)
3. Ir a /panel/proveedor
4. Ver orden nueva
5. Click "Confirmar"
6. ✅ Verificar: Estado cambia a "CONFIRMADO"

PASO 3: ENVÍO (Proveedor)
1. En mismo panel proveedor
2. Click "Enviar" en la orden
3. Registrar tracking:
   - Paquetería: FedEx
   - Guía: 9876543210
4. ✅ Verificar: Estado cambia a "ENVIADO"

PASO 4: SEGUIMIENTO (Cliente)
1. Logout proveedor
2. Login como cliente
3. Ir a /ordenes
4. Click en la orden
5. ✅ Verificar:
   - Estado "ENVIADO"
   - Información de tracking visible
   - Link de rastreo funcional

PASO 5: VERIFICACIÓN (Admin)
1. Logout cliente
2. Login como admin
3. Ir a /panel/admin > Órdenes
4. Buscar la orden
5. ✅ Verificar: Todo el historial visible
6. Ir a /reportes
7. ✅ Verificar: Venta aparece en reportes
```

---

## 📊 CHECKLIST DE VALIDACIÓN FINAL

Antes de dar por completo el testing, verifica:

### Base de Datos:
- [ ] Órdenes se crean correctamente
- [ ] Items de orden se guardan
- [ ] Direcciones se guardan
- [ ] Stock se reduce automáticamente
- [ ] Tracking se guarda en tabla shippings
- [ ] Historial de estados se registra

### Frontend:
- [ ] No hay errores en consola del navegador
- [ ] Todas las rutas cargan correctamente
- [ ] Protección de rutas funciona
- [ ] Redirecciones funcionan
- [ ] Formularios validan correctamente
- [ ] Mensajes de error son claros

### APIs:
- [ ] /api/orders/create funciona
- [ ] /api/orders/[id] devuelve datos
- [ ] /api/provider/shipping funciona
- [ ] /api/admin/* funcionan
- [ ] Manejo de errores apropiado

### Integraciones:
- [ ] Stripe procesa pagos
- [ ] Supabase guarda datos
- [ ] Autenticación funciona
- [ ] Sesiones persisten

---

## 🐛 REPORTE DE BUGS

Si encuentras algún problema, documentalo así:

```markdown
### Bug #X: [Título del bug]

**Descripción:**
Descripción breve del problema

**Pasos para reproducir:**
1. Ir a página X
2. Hacer click en Y
3. ...

**Resultado esperado:**
Lo que debería pasar

**Resultado actual:**
Lo que realmente pasa

**Screenshot/Error:**
(Adjuntar si es posible)

**Prioridad:**
- [ ] Crítico (bloquea funcionalidad)
- [ ] Alta (afecta experiencia)
- [ ] Media (mejora)
- [ ] Baja (cosmético)
```

---

## 📈 MÉTRICAS DE ÉXITO

El testing es exitoso si:

✅ **100%** de los casos de prueba pasan
✅ **0** errores críticos
✅ **Órdenes** se crean correctamente
✅ **Stock** se reduce automáticamente
✅ **Tracking** funciona end-to-end
✅ **Pagos** se procesan con Stripe
✅ **Datos** se guardan en Supabase

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DEL TESTING

Una vez completado el testing manual:

1. ✅ Corregir bugs encontrados
2. ✅ Documentar edge cases
3. ✅ Implementar tests automatizados (opcional)
4. ✅ Preparar para producción
5. ✅ Configurar Stripe en modo live
6. ✅ Deploy a Vercel/servidor

---

## 📞 SOPORTE

Si tienes dudas durante el testing:

1. Revisa logs del servidor (terminal)
2. Revisa consola del navegador (F12)
3. Verifica Supabase Table Editor
4. Consulta `PROYECTO-STATUS.md`
5. Consulta `COMPLETADO-HOY.md`

---

**Happy Testing! 🎉**

**Última actualización:** 3 de Octubre, 2025
