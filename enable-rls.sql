-- Script para habilitar Row Level Security y configurar políticas
-- Ejecuta esto en el SQL Editor de Supabase

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla users
-- Permitir a los usuarios autenticados leer su propio perfil
CREATE POLICY "Users can read own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Permitir crear usuarios (para registro)
CREATE POLICY "Enable insert for authentication" ON users
    FOR INSERT WITH CHECK (true);

-- Permitir actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Política para service role (APIs del backend)
CREATE POLICY "Service role can do everything" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- Políticas para providers
CREATE POLICY "Enable read access for all users" ON providers
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON providers
    FOR INSERT WITH CHECK (auth.role() = 'service_role' OR auth.uid() = user_id);

CREATE POLICY "Providers can update own data" ON providers
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para products (lectura pública, escritura restringida)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (visible = true OR auth.uid() IN (
        SELECT user_id FROM providers WHERE id = products.provider_id
    ));

CREATE POLICY "Providers can insert products" ON products
    FOR INSERT WITH CHECK (auth.uid() IN (
        SELECT user_id FROM providers WHERE id = products.provider_id
    ));

CREATE POLICY "Providers can update own products" ON products
    FOR UPDATE USING (auth.uid() IN (
        SELECT user_id FROM providers WHERE id = products.provider_id
    ));

-- Políticas para categories (lectura pública)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Políticas para orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = cliente_id);

CREATE POLICY "Users can create orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = cliente_id);

-- Políticas para addresses
CREATE POLICY "Users can manage own addresses" ON addresses
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para cart_items
CREATE POLICY "Users can manage own cart" ON cart_items
    FOR ALL USING (auth.uid() = user_id);

-- Mensaje de éxito
-- ¡RLS habilitado y políticas configuradas!