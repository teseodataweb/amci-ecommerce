-- ================================================
-- POLÍTICAS DE SEGURIDAD (RLS) PARA SUPABASE
-- Ejecuta este script en el SQL Editor de Supabase
-- ================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shippings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispersions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- ================================================
-- POLÍTICAS PARA USUARIOS
-- ================================================

-- Los usuarios pueden leer su propio perfil
CREATE POLICY "Users can read own profile" ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE
    USING (auth.uid() = id);

-- Los admins pueden leer todos los usuarios
CREATE POLICY "Admins can read all users" ON users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA PROVEEDORES
-- ================================================

-- Los proveedores pueden leer su propio registro
CREATE POLICY "Providers can read own data" ON providers
    FOR SELECT
    USING (user_id = auth.uid());

-- Los usuarios pueden leer proveedores activos (para mostrar en productos)
CREATE POLICY "Users can read active providers" ON providers
    FOR SELECT
    USING (active = true);

-- Los admins pueden hacer todo
CREATE POLICY "Admins can manage providers" ON providers
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA CATEGORÍAS
-- ================================================

-- Todos pueden leer categorías
CREATE POLICY "Anyone can read categories" ON categories
    FOR SELECT
    USING (true);

-- Solo admins pueden crear/editar/eliminar categorías
CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA PRODUCTOS
-- ================================================

-- Todos pueden leer productos visibles y aprobados
CREATE POLICY "Anyone can read visible products" ON products
    FOR SELECT
    USING (visible = true AND approved = true);

-- Los proveedores pueden leer sus propios productos
CREATE POLICY "Providers can read own products" ON products
    FOR SELECT
    USING (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Los proveedores pueden crear sus propios productos
CREATE POLICY "Providers can create own products" ON products
    FOR INSERT
    WITH CHECK (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Los proveedores pueden actualizar sus propios productos
CREATE POLICY "Providers can update own products" ON products
    FOR UPDATE
    USING (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Los admins pueden hacer todo
CREATE POLICY "Admins can manage all products" ON products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA IMÁGENES DE PRODUCTOS
-- ================================================

-- Todos pueden leer imágenes de productos visibles
CREATE POLICY "Anyone can read product images" ON product_images
    FOR SELECT
    USING (
        product_id IN (
            SELECT id FROM products
            WHERE visible = true AND approved = true
        )
    );

-- Los proveedores pueden gestionar imágenes de sus productos
CREATE POLICY "Providers can manage own product images" ON product_images
    FOR ALL
    USING (
        product_id IN (
            SELECT p.id FROM products p
            JOIN providers prov ON p.provider_id = prov.id
            WHERE prov.user_id = auth.uid()
        )
    );

-- Los admins pueden hacer todo
CREATE POLICY "Admins can manage all product images" ON product_images
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA CARRITO DE COMPRAS
-- ================================================

-- Los usuarios pueden leer su propio carrito
CREATE POLICY "Users can read own cart" ON cart_items
    FOR SELECT
    USING (user_id = auth.uid());

-- Los usuarios pueden agregar a su propio carrito
CREATE POLICY "Users can add to own cart" ON cart_items
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Los usuarios pueden actualizar su propio carrito
CREATE POLICY "Users can update own cart" ON cart_items
    FOR UPDATE
    USING (user_id = auth.uid());

-- Los usuarios pueden eliminar de su propio carrito
CREATE POLICY "Users can delete from own cart" ON cart_items
    FOR DELETE
    USING (user_id = auth.uid());

-- ================================================
-- POLÍTICAS PARA ÓRDENES
-- ================================================

-- Los clientes pueden leer sus propias órdenes
CREATE POLICY "Clients can read own orders" ON orders
    FOR SELECT
    USING (cliente_id = auth.uid());

-- Los clientes pueden crear órdenes
CREATE POLICY "Clients can create orders" ON orders
    FOR INSERT
    WITH CHECK (cliente_id = auth.uid());

-- Los proveedores pueden leer órdenes que incluyen sus productos
CREATE POLICY "Providers can read orders with their products" ON orders
    FOR SELECT
    USING (
        id IN (
            SELECT DISTINCT oi.order_id
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            JOIN providers prov ON p.provider_id = prov.id
            WHERE prov.user_id = auth.uid()
        )
    );

-- Los admins pueden hacer todo
CREATE POLICY "Admins can manage all orders" ON orders
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA ITEMS DE ORDEN
-- ================================================

-- Los clientes pueden leer items de sus propias órdenes
CREATE POLICY "Clients can read own order items" ON order_items
    FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM orders WHERE cliente_id = auth.uid()
        )
    );

-- Los proveedores pueden leer items de sus productos
CREATE POLICY "Providers can read own product order items" ON order_items
    FOR SELECT
    USING (
        product_id IN (
            SELECT p.id FROM products p
            JOIN providers prov ON p.provider_id = prov.id
            WHERE prov.user_id = auth.uid()
        )
    );

-- Los admins pueden hacer todo
CREATE POLICY "Admins can manage all order items" ON order_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- POLÍTICAS PARA DIRECCIONES
-- ================================================

-- Los usuarios pueden gestionar sus propias direcciones
CREATE POLICY "Users can manage own addresses" ON addresses
    FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- ================================================
-- POLÍTICAS PARA CONFIGURACIÓN
-- ================================================

-- Todos pueden leer configuración
CREATE POLICY "Anyone can read settings" ON settings
    FOR SELECT
    USING (true);

-- Solo admins pueden modificar configuración
CREATE POLICY "Admins can manage settings" ON settings
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ================================================
-- MENSAJE DE ÉXITO
-- ================================================
-- ¡Políticas RLS configuradas correctamente!