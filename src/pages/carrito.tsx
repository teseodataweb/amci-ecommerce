import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";

const Carrito = () => {
  const { items: cartItems, removeFromCart, updateQuantity, getCartTotal, loading } = useCart();
  const router = useRouter();

  const subtotal = getCartTotal();
  const costoEnvio = 200; // Costo fijo de envío para el ejemplo
  const iva = subtotal * 0.16; // 16% IVA
  const total = subtotal + costoEnvio + iva;

  // Verificar si hay productos de diferentes emisores de factura
  const emisoresDiferentes = new Set(cartItems.map(item => item.product?.emisor_factura).filter(Boolean));
  const multipleFacturas = emisoresDiferentes.size > 1;

  if (loading) {
    return (
      <Layout header={1} footer={1}>
        <Banner
          title="Carrito de compras"
          subtitle="Cargando..."
          bg="bg-primary"
        />
        <section className="cart__area pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout header={1} footer={1}>
        <Banner 
          title="Carrito de compras"
          subtitle="Tu carrito está vacío"
          bg="bg-primary"
        />
        
        <section className="cart__area pt-120 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 text-center">
                <div className="empty-cart">
                  <i className="fal fa-shopping-cart fa-5x text-muted mb-4"></i>
                  <h3 className="mb-3">Tu carrito está vacío</h3>
                  <p className="text-muted mb-4">
                    ¡Agrega algunos productos fantásticos a tu carrito y comienza a comprar!
                  </p>
                  <Link href="/catalogo" className="btn btn-primary btn-lg">
                    <i className="fal fa-arrow-left me-2"></i>
                    Continuar comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Carrito de compras"
        subtitle={`${cartItems.length} productos en tu carrito`}
        bg="bg-primary"
      />
      
      <section className="cart__area pt-120 pb-80">
        <div className="container">
          <div className="row">
            {/* Items del carrito */}
            <div className="col-xl-8 col-lg-8">
              <div className="cart__items">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="cart__product d-flex align-items-center">
                              <div className="cart__product-thumb me-3">
                                <img
                                  src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=Sin+Imagen'}
                                  alt={item.product?.nombre || 'Producto'}
                                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="cart__product-content">
                                <h5 className="cart__product-title mb-1">
                                  <Link href={`/producto/${item.product?.slug || item.product_id}`}>
                                    {item.product?.nombre || 'Producto sin nombre'}
                                  </Link>
                                </h5>
                                <span className="text-muted small">
                                  {item.product?.provider?.razon_social || 'Sin proveedor'}
                                  {item.variant_data && ` • ${JSON.stringify(item.variant_data)}`}
                                </span>
                                <div className="mt-1">
                                  <span className={`badge ${item.product?.emisor_factura === 'AMCI' ? 'bg-primary' : 'bg-secondary'}`}>
                                    Factura: {item.product?.emisor_factura || 'AMCI'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="cart__price">
                              ${(item.product?.precio || 0).toLocaleString('es-MX')} MXN
                            </span>
                          </td>
                          <td>
                            <div className="quantity-control d-flex align-items-center">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="quantity-display mx-3">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className="cart__total fw-bold">
                              ${((item.product?.precio || 0) * item.quantity).toLocaleString('es-MX')} MXN
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fal fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="cart__actions mt-4">
                  <Link href="/catalogo" className="btn btn-outline-primary">
                    <i className="fal fa-arrow-left me-2"></i>
                    Continuar comprando
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div className="col-xl-4 col-lg-4">
              <div className="cart__sidebar">
                <div className="cart__sidebar-widget">
                  <h4 className="widget-title mb-4">Resumen del pedido</h4>
                  
                  <div className="cart__totals">
                    <div className="cart__totals-item d-flex justify-content-between mb-3">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                    </div>
                    
                    <div className="cart__totals-item d-flex justify-content-between mb-3">
                      <span>Envío:</span>
                      <span>${costoEnvio.toLocaleString('es-MX')} MXN</span>
                    </div>
                    
                    <div className="cart__totals-item d-flex justify-content-between mb-3">
                      <span>IVA (16%):</span>
                      <span>${iva.toLocaleString('es-MX')} MXN</span>
                    </div>
                    
                    <hr />
                    
                    <div className="cart__totals-item d-flex justify-content-between mb-4">
                      <span className="fw-bold h5">Total:</span>
                      <span className="fw-bold h5 text-primary">
                        ${total.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                    
                    {/* Advertencia de múltiples facturas */}
                    {multipleFacturas && (
                      <div className="alert alert-warning mb-4">
                        <i className="fal fa-exclamation-triangle me-2"></i>
                        <small>
                          <strong>Nota importante:</strong> Tu pedido incluye productos de diferentes emisores de factura. 
                          Recibirás {emisoresDiferentes.size} facturas separadas.
                        </small>
                      </div>
                    )}
                    
                    <div className="cart__checkout">
                      <Link 
                        href="/checkout"
                        className="btn btn-primary btn-lg w-100 mb-3"
                      >
                        <i className="fal fa-credit-card me-2"></i>
                        Proceder al pago
                      </Link>
                      
                      <div className="payment-methods text-center">
                        <small className="text-muted">Métodos de pago aceptados:</small>
                        <div className="mt-2">
                          <i className="fab fa-cc-visa fa-2x text-primary me-2"></i>
                          <i className="fab fa-cc-mastercard fa-2x text-warning me-2"></i>
                          <i className="fab fa-paypal fa-2x text-info"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Información de envío */}
                <div className="cart__sidebar-widget mt-4">
                  <h5 className="widget-title mb-3">Información de envío</h5>
                  <ul className="list-unstyled small">
                    <li className="mb-2">
                      <i className="fal fa-truck me-2 text-primary"></i>
                      Envío a toda la República Mexicana
                    </li>
                    <li className="mb-2">
                      <i className="fal fa-clock me-2 text-primary"></i>
                      Tiempo de entrega: 3-7 días hábiles
                    </li>
                    <li className="mb-2">
                      <i className="fal fa-shield-alt me-2 text-primary"></i>
                      Compra 100% segura
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Carrito;