# 🚀 INSTRUCCIONES FINALES - AMCI E-Commerce

**IMPORTANTE:** El checkout NO funciona actualmente porque faltan configuraciones.

---

## ⚡ RESUMEN RÁPIDO

Para que el sistema funcione al 100%, necesitas hacer **2 cosas**:

1. ✅ **Configurar Stripe** (5 minutos)
2. ✅ **Ejecutar script SQL en Supabase** (2 minutos)

**Total: 7 minutos** ⏱️

---

## 🔑 PASO 1: CONFIGURAR STRIPE (OBLIGATORIO)

### Opción A: Ya tienes cuenta de Stripe

1. Login en: https://dashboard.stripe.com/
2. Ir a: **Developers** > **API Keys**
3. **Asegúrate de estar en modo TEST** (toggle arriba)
4. Copiar:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### Opción B: NO tienes cuenta de Stripe

1. Ir a: https://dashboard.stripe.com/register
2. Crear cuenta (gratis)
3. Seguir pasos de Opción A

### Configurar en el proyecto:

1. Abrir archivo: `.env`
2. Buscar estas líneas (están al final, comentadas):

```env
# Stripe Configuration (para pasarela de pago)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
# STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
```

3. **Descomentar** (quitar el #) y **reemplazar** con tus keys:

```env
# Stripe Configuration (para pasarela de pago)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51XXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_51XXXXXXXXXXXXXXX
```

4. **Guardar archivo**

5. **Reiniciar servidor:**
```bash
# En la terminal, presionar Ctrl+C
# Luego ejecutar de nuevo:
npm run dev
```

---

## 🗄️ PASO 2: EJECUTAR SCRIPT SQL EN SUPABASE (OBLIGATORIO)

### Instrucciones:

1. Ir a: https://supabase.com/dashboard/project/dzgjxrghqyotixqnrexu
2. Click en **"SQL Editor"** (menú izquierdo)
3. Click en **"New Query"**
4. Abrir el archivo: `setup-database-final.sql` (está en la raíz del proyecto)
5. Copiar TODO el contenido del archivo
6. Pegar en el editor de Supabase
7. Click en **"Run"** (o presionar Ctrl+Enter)
8. ✅ Verificar que muestra: **"✅ Database setup completed successfully!"**

### ¿Qué hace este script?

- ✅ Crea tabla `shippings` (para tracking de envíos)
- ✅ Crea tabla `order_status_history` (historial de órdenes)
- ✅ Agrega columnas `payment_id` y `payment_status` a tabla `orders`
- ✅ Configura políticas de seguridad (RLS)
- ✅ Crea índices para mejor performance

---

## 🧪 PASO 3: PROBAR EL SISTEMA

Una vez completados los pasos anteriores:

### Test de Checkout:

```bash
1. Ir a: http://localhost:3000
2. Login como CLIENTE
3. Ir a: /catalogo
4. Agregar un producto al carrito
5. Click en carrito > "Proceder al checkout"
6. Llenar formulario con cualquier información
7. En el pago, usar esta tarjeta de PRUEBA:

   📇 TARJETA DE PRUEBA STRIPE:
   Número:    4242 4242 4242 4242
   Fecha:     12/28 (cualquier fecha futura)
   CVC:       123
   Nombre:    Test User
   ZIP:       12345

8. Click "Pagar"

✅ DEBE PASAR:
- Procesar el pago
- Redirigir a /orden/[id]?success=true
- Mostrar página con: "¡Gracias por tu compra!"
- Mostrar detalles completos de la orden
- Mostrar badge verde "Pagado"

❌ SI FALLA:
- Ver consola del navegador (F12)
- Ver logs del servidor (terminal)
- Revisar archivo: ACCIONES-REQUERIDAS.md
```

### Test de Tracking (Proveedor):

```bash
1. Logout del cliente
2. Login como PROVEEDOR
3. Ir a: /panel/proveedor
4. Buscar la orden recién creada
5. Click en botón "Enviar" (ícono de camión)
6. Llenar modal:
   - Paquetería: DHL
   - Número de guía: 1234567890
   - URL: https://dhl.com/tracking/1234567890
7. Click "Registrar envío"

✅ DEBE PASAR:
- Estado cambia a "ENVIADO"
- Modal se cierra
- Mensaje de éxito

8. Logout proveedor
9. Login como CLIENTE (el que hizo la compra)
10. Ir a: /ordenes
11. Click en la orden
12. ✅ DEBE mostrar información de tracking
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

Antes de contactar soporte, verifica:

### Configuración:
- [ ] Keys de Stripe configuradas en `.env`
- [ ] Keys NO tienen espacios extra
- [ ] Keys empiezan con `pk_test_` y `sk_test_`
- [ ] Servidor reiniciado después de editar `.env`
- [ ] Script SQL ejecutado en Supabase
- [ ] Script SQL mostró "Success"

### Datos:
- [ ] Existe al menos 1 producto con stock > 0
- [ ] Producto está "aprobado"
- [ ] Usuario cliente existe y funciona
- [ ] Usuario proveedor existe (para test de tracking)

### Testing:
- [ ] Carrito funciona (agregar/quitar productos)
- [ ] Checkout muestra formulario de Stripe
- [ ] Formulario de tarjeta se ve correctamente
- [ ] No hay errores en consola (F12)

---

## ❓ PREGUNTAS FRECUENTES

### P: ¿Dónde obtengo las keys de Stripe?
**R:** https://dashboard.stripe.com/test/apikeys (debes crear cuenta gratis)

### P: ¿Las keys de Stripe son gratis?
**R:** Sí, el modo TEST es completamente gratis

### P: ¿Necesito tarjeta de crédito real para probar?
**R:** No, usa la tarjeta de prueba: 4242 4242 4242 4242

### P: ¿El script SQL borra datos existentes?
**R:** No, solo AGREGA tablas/columnas. No borra nada.

### P: ¿Puedo ejecutar el script SQL varias veces?
**R:** Sí, es seguro. Usa `IF NOT EXISTS` para evitar duplicados.

### P: El pago se procesa pero no redirige
**R:** Revisar:
1. Logs del servidor (terminal)
2. Consola del navegador (F12)
3. Que el script SQL se ejecutó correctamente
4. Que las columnas `payment_id` y `payment_status` existen en tabla `orders`

---

## 🆘 SI ALGO FALLA

### Paso 1: Revisar Logs

**Terminal del servidor:**
```bash
# Buscar líneas con:
- "Error"
- "Failed"
- "undefined"
- "null"
```

**Consola del navegador (F12):**
```bash
# Buscar en tab "Console":
- Errores en rojo
- Warnings en amarillo
```

### Paso 2: Verificar Base de Datos

1. Ir a Supabase > Table Editor
2. Verificar que existen:
   - Tabla `shippings`
   - Tabla `order_status_history`
3. Ir a tabla `orders`
4. Verificar columnas:
   - `payment_id` (text)
   - `payment_status` (text)

### Paso 3: Verificar Stripe

1. Ir a: https://dashboard.stripe.com/test/logs
2. Buscar errores de API
3. Verificar que las keys son correctas

---

## 📁 ARCHIVOS DE REFERENCIA

| Archivo | Propósito |
|---------|-----------|
| `ACCIONES-REQUERIDAS.md` | 📋 Lista detallada de todas las acciones |
| `setup-database-final.sql` | 🗄️ Script SQL completo para ejecutar |
| `INSTRUCCIONES-FINALES.md` | 📖 Este archivo (resumen ejecutivo) |
| `GUIA-TESTING.md` | 🧪 Guía completa de testing |
| `COMPLETADO-HOY.md` | ✅ Resumen de lo implementado |

---

## ⏱️ TIEMPO ESTIMADO

```
1. Configurar Stripe:        5 min
2. Ejecutar script SQL:       2 min
3. Reiniciar servidor:        1 min
4. Probar checkout:           5 min
5. Probar tracking:           3 min
──────────────────────────────────
   TOTAL:                    16 min
```

---

## ✅ ORDEN DE EJECUCIÓN

```
PASO 1: Configurar Stripe en .env
   ↓
PASO 2: Reiniciar servidor (Ctrl+C, npm run dev)
   ↓
PASO 3: Ejecutar script SQL en Supabase
   ↓
PASO 4: Verificar que script mostró "Success"
   ↓
PASO 5: Probar checkout con tarjeta de prueba
   ↓
PASO 6: Verificar que orden se creó
   ↓
PASO 7: Probar tracking como proveedor
   ↓
✅ SISTEMA 100% FUNCIONAL
```

---

## 🎯 RESULTADO ESPERADO

Después de completar estos pasos, el sistema estará **100% funcional**:

✅ Checkout completo con Stripe
✅ Órdenes guardadas en BD
✅ Stock gestionado automáticamente
✅ Sistema de tracking operativo
✅ Todos los flujos funcionando

---

## 📞 SOPORTE

Si después de seguir TODOS los pasos sigue sin funcionar:

1. Tomar screenshot del error (consola + terminal)
2. Copiar logs completos
3. Verificar que:
   - Keys de Stripe correctas
   - Script SQL ejecutado
   - Servidor reiniciado
4. Revisar archivo: `ACCIONES-REQUERIDAS.md`

---

**¡Estás a solo 2 pasos de tener el sistema 100% funcional!** 🚀

**Última actualización:** 3 de Octubre, 2025
