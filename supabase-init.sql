-- Archivo SQL para crear las tablas en Supabase
-- Puedes ejecutar esto en el SQL Editor de Supabase

-- Crear enums
CREATE TYPE "UserRole" AS ENUM ('CLIENTE', 'PROVEEDOR', 'ADMIN');
CREATE TYPE "OrderStatus" AS ENUM ('RECIBIDO', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CERRADO', 'CANCELADO', 'DEVUELTO');
CREATE TYPE "PricingMode" AS ENUM ('PRECIO', 'COTIZAR');
CREATE TYPE "InvoiceIssuer" AS ENUM ('AMCI', 'PROVEEDOR');

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    role "UserRole" DEFAULT 'CLIENTE',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de proveedores
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id),
    razon_social VARCHAR(255) NOT NULL,
    rfc VARCHAR(13) UNIQUE NOT NULL,
    contacto_operativo TEXT,
    contacto_facturacion TEXT,
    clabe VARCHAR(18),
    emisor_factura_default "InvoiceIssuer" DEFAULT 'PROVEEDOR',
    active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de categorías
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID NOT NULL REFERENCES providers(id),
    category_id UUID NOT NULL REFERENCES categories(id),
    nombre VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    pricing_mode "PricingMode" DEFAULT 'PRECIO',
    emisor_factura "InvoiceIssuer" DEFAULT 'AMCI',
    visible BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    valid_until TIMESTAMP,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para productos
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_provider ON products(provider_id);
CREATE INDEX idx_products_category ON products(category_id);

-- Tabla de imágenes de productos
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt VARCHAR(255),
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de variantes de productos
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    opciones JSONB,
    precio DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de bundles de productos
CREATE TABLE product_bundles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tipo VARCHAR(255) NOT NULL,
    tamanos JSONB,
    precio DECIMAL(10,2),
    descuento DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de direcciones
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    alias VARCHAR(100),
    nombre VARCHAR(255) NOT NULL,
    calle VARCHAR(255) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    colonia VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    referencias TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de órdenes
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES users(id),
    address_id UUID REFERENCES addresses(id),
    total DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    envio DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    estado "OrderStatus" DEFAULT 'RECIBIDO',
    emisor_factura_resumen JSONB,
    payment_id VARCHAR(255),
    payment_status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para órdenes
CREATE INDEX idx_orders_cliente ON orders(cliente_id);
CREATE INDEX idx_orders_estado ON orders(estado);

-- Tabla de items de orden
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    qty INTEGER NOT NULL,
    precio_unit DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    variant_data JSONB,
    bundle_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de historial de estados de orden
CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    estado "OrderStatus" NOT NULL,
    reason TEXT,
    user_id UUID,
    at TIMESTAMP DEFAULT NOW()
);

-- Tabla de envíos
CREATE TABLE shippings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    carrier VARCHAR(100) NOT NULL,
    tracking VARCHAR(255) NOT NULL,
    tracking_url VARCHAR(500),
    fecha_envio TIMESTAMP,
    fecha_entrega TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    pasarela VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    payload_json JSONB NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de facturas
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    issuer "InvoiceIssuer" NOT NULL,
    uuid VARCHAR(255),
    pdf_url VARCHAR(500),
    xml_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'PENDIENTE',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de dispersiones
CREATE TABLE dispersions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID NOT NULL REFERENCES providers(id),
    periodo VARCHAR(20) NOT NULL,
    total_venta DECIMAL(10,2) NOT NULL,
    comision_amci DECIMAL(10,2) NOT NULL,
    neto_proveedor DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    fecha_dispersion TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider_id, periodo)
);

-- Tabla de configuración del sistema
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amci_commission_percent DECIMAL(5,2) DEFAULT 10,
    amci_commission_base DECIMAL(10,2) DEFAULT 0,
    disbursement_period INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de carrito
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    variant_data JSONB,
    bundle_data JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_shippings_updated_at BEFORE UPDATE ON shippings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_dispersions_updated_at BEFORE UPDATE ON dispersions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insertar configuración inicial
INSERT INTO settings (amci_commission_percent, amci_commission_base, disbursement_period)
VALUES (10.0, 0.0, 15);

-- Mensaje de éxito
-- ¡Tablas creadas exitosamente!