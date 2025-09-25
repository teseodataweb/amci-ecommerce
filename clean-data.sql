-- Script para limpiar datos de prueba anteriores
-- Ejecuta esto ANTES del setup si tienes problemas

-- Limpiar en orden correcto para evitar errores de foreign key
DELETE FROM product_images;
DELETE FROM cart_items;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM providers WHERE razon_social IN (
    'AP Safety S.A. de C.V.',
    'MTM Refacciones Industriales S.A. de C.V.',
    'Pumping Team México S.A. de C.V.',
    'Plásticos Torres S.A. de C.V.'
);
DELETE FROM users WHERE email IN (
    'apsafety@proveedor.com',
    'mtm@proveedor.com',
    'pumping@proveedor.com',
    'plasticos@proveedor.com'
);
DELETE FROM categories WHERE slug IN (
    'seguridad-industrial',
    'hidraulica',
    'bombas-sistemas',
    'iluminacion-led',
    'herramientas',
    'refacciones'
);

-- Mensaje de confirmación
SELECT 'Datos limpiados correctamente' as mensaje;