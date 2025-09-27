import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import dynamic from 'next/dynamic';

// Cargar el componente de Stripe de forma dinámica para evitar SSR
const StripePayment = dynamic(
  () => import('@/components/checkout/StripePayment'),
  { ssr: false }
);

interface CheckoutFormData {
  // Información personal
  nombre: string;
  email: string;
  telefono: string;
  rfc: string;
  
  // Dirección de envío
  calle: string;
  numero: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  
  // Preferencias
  requiereFactura: boolean;
  aceptaTerminos: boolean;
  aceptaPrivacidad: boolean;
}

const Checkout = () => {
  const { items: cartItems, getCartTotal, clearCart, loading: cartLoading } = useCart();
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  // Debug info
  useEffect(() => {
    if (!authLoading) {
      console.log('Checkout - User:', user?.email);
      console.log('Checkout - Profile:', profile);
      console.log('Checkout - Role:', profile?.role);
    }
  }, [user, profile, authLoading]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: '',
    email: '',
    telefono: '',
    rfc: '',
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    requiereFactura: false,
    aceptaTerminos: false,
    aceptaPrivacidad: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const subtotal = getCartTotal();
  const costoEnvio = 200;
  const iva = subtotal * 0.16;
  const total = subtotal + costoEnvio + iva;

  // Verificar múltiples emisores de factura
  const emisoresDiferentes = new Set(cartItems.map(item => item.product?.emisor_factura).filter(Boolean));
  const multipleFacturas = emisoresDiferentes.size > 1;

  useEffect(() => {
    // Pre-llenar datos si el usuario está autenticado (solo al cargar)
    if (user && profile && !formData.email && !formData.nombre) {
      console.log('Pre-filling form with user data');
      setFormData(prev => ({
        ...prev,
        nombre: profile.name || prev.nombre || '',
        email: profile.email || user.email || prev.email || '',
        telefono: profile.phone || prev.telefono || ''
      }));
    }
  }, [user, profile]); // Solo cuando cambien user o profile

  // Verificar carrito vacío de forma separada y solo cuando no estemos procesando pago
  useEffect(() => {
    // Solo redirigir si:
    // 1. El carrito está vacío
    // 2. Ya terminó de cargar tanto el carrito como la autenticación
    // 3. NO estamos mostrando el formulario de pago
    // 4. NO estamos procesando
    if (cartItems.length === 0 &&
        !cartLoading &&
        !authLoading &&
        !showPayment &&
        !isProcessing) {
      console.log('Cart is empty and not processing payment, redirecting to cart page');
      router.push('/carrito');
    }
  }, [cartItems.length, cartLoading, authLoading, showPayment, isProcessing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Validaciones básicas
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    
    // Validación de RFC si requiere factura
    if (formData.requiereFactura && !formData.rfc.trim()) {
      newErrors.rfc = 'El RFC es requerido para facturación';
    }
    
    // Validaciones de dirección
    if (!formData.calle.trim()) newErrors.calle = 'La calle es requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
    if (!formData.estado.trim()) newErrors.estado = 'El estado es requerido';
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es requerido';
    
    // Validaciones de términos
    if (!formData.aceptaTerminos) newErrors.aceptaTerminos = 'Debe aceptar los términos y condiciones';
    if (!formData.aceptaPrivacidad) newErrors.aceptaPrivacidad = 'Debe aceptar la política de privacidad';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Checkout form submitted');

    // Evitar procesar si ya estamos procesando
    if (isProcessing) {
      console.log('Already processing, ignoring submit');
      return;
    }

    if (!validateForm()) {
      console.log('Form validation failed, errors:', errors);
      // Scroll al primer error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementsByName(firstErrorField)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    if (!user) {
      console.log('No user found, redirecting to login');
      alert('Debes iniciar sesión para completar la compra');
      router.push('/login?redirect=/checkout');
      return;
    }

    if (cartItems.length === 0) {
      console.log('Cart is empty, cannot proceed');
      alert('Tu carrito está vacío');
      router.push('/carrito');
      return;
    }

    console.log('Form is valid, preparing payment...');
    setIsProcessing(true);

    try {
      // Guardar los datos de la orden para cuando el pago sea exitoso
      const orderInfo = {
        userId: user.id,
        items: cartItems,
        shippingAddress: {
          nombre: formData.nombre,
          calle: formData.calle,
          numero: formData.numero,
          colonia: formData.colonia,
          ciudad: formData.ciudad,
          estado: formData.estado,
          codigoPostal: formData.codigoPostal
        },
        billingInfo: {
          rfc: formData.rfc,
          requiereFactura: formData.requiereFactura
        },
        subtotal,
        shipping: costoEnvio,
        tax: iva,
        total
      };

      setOrderData(orderInfo);
      setShowPayment(true);
      console.log('Payment form displayed, showPayment set to true');
    } catch (error) {
      console.error('Error preparing payment:', error);
      alert('Ocurrió un error al preparar el pago. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      setIsProcessing(true);

      // Crear la orden con el ID del pago
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...orderData,
          paymentIntentId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Limpiar carrito
        await clearCart();

        // Redirigir a página de éxito
        alert(`¡Pago exitoso! Número de orden: ${data.orderNumber}`);
        router.push(`/orden/${data.orderId}`);
      } else {
        throw new Error(data.error || 'Error al crear la orden');
      }
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      alert('El pago fue exitoso pero hubo un error al crear la orden. Contacta soporte.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    alert(`Error en el pago: ${error}`);
    setShowPayment(false);
  };

  if (cartLoading || authLoading) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <Banner
            title="Finalizar compra"
            subtitle="Cargando..."
            bg="bg-primary"
          />
          <section className="checkout__area pt-120 pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Preparando tu checkout...</p>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </ProtectedRoute>
    );
  }

  // Si el carrito está vacío y no estamos mostrando el pago, mostrar mensaje
  if (cartItems.length === 0 && !showPayment) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <Banner
            title="Finalizar compra"
            subtitle="Tu carrito está vacío"
            bg="bg-primary"
          />
          <section className="checkout__area pt-120 pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 text-center">
                  <h3>Tu carrito está vacío</h3>
                  <p className="mt-3">Agrega algunos productos antes de continuar al checkout.</p>
                  <Link href="/catalogo" className="btn btn-primary mt-3">
                    Ir al catálogo
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <Layout header={1} footer={1}>
      <Banner 
        title="Finalizar compra"
        subtitle="Completa tu pedido de forma segura"
        bg="bg-primary"
      />
      
      <section className="checkout__area pt-120 pb-80">
        <div className="container">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row">
              {/* Formulario de checkout */}
              <div className="col-xl-8 col-lg-8">
                <div className="checkout__form">
                  {/* Información personal */}
                  <div className="checkout__form-section mb-5">
                    <h3 className="section-title mb-4">Información personal</h3>
                    
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Nombre completo *</label>
                        <input
                          type="text"
                          name="nombre"
                          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Ingresa tu nombre completo"
                        />
                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Teléfono *</label>
                        <input
                          type="tel"
                          name="telefono"
                          className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="55 1234 5678"
                        />
                        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Facturación */}
                  <div className="checkout__form-section mb-5">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="requiereFactura"
                        id="requiereFactura"
                        checked={formData.requiereFactura}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="requiereFactura">
                        Requiero factura fiscal
                      </label>
                    </div>
                    
                    {formData.requiereFactura && (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">RFC *</label>
                          <input
                            type="text"
                            name="rfc"
                            className={`form-control ${errors.rfc ? 'is-invalid' : ''}`}
                            value={formData.rfc}
                            onChange={handleInputChange}
                            placeholder="ABCD123456XXX"
                          />
                          {errors.rfc && <div className="invalid-feedback">{errors.rfc}</div>}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Dirección de envío */}
                  <div className="checkout__form-section mb-5">
                    <h3 className="section-title mb-4">Dirección de envío</h3>
                    
                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label className="form-label">Calle *</label>
                        <input
                          type="text"
                          name="calle"
                          className={`form-control ${errors.calle ? 'is-invalid' : ''}`}
                          value={formData.calle}
                          onChange={handleInputChange}
                          placeholder="Nombre de la calle"
                        />
                        {errors.calle && <div className="invalid-feedback">{errors.calle}</div>}
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Número</label>
                        <input
                          type="text"
                          name="numero"
                          className="form-control"
                          value={formData.numero}
                          onChange={handleInputChange}
                          placeholder="123"
                        />
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Colonia</label>
                        <input
                          type="text"
                          name="colonia"
                          className="form-control"
                          value={formData.colonia}
                          onChange={handleInputChange}
                          placeholder="Nombre de la colonia"
                        />
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Código Postal *</label>
                        <input
                          type="text"
                          name="codigoPostal"
                          className={`form-control ${errors.codigoPostal ? 'is-invalid' : ''}`}
                          value={formData.codigoPostal}
                          onChange={handleInputChange}
                          placeholder="12345"
                        />
                        {errors.codigoPostal && <div className="invalid-feedback">{errors.codigoPostal}</div>}
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Ciudad *</label>
                        <input
                          type="text"
                          name="ciudad"
                          className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          placeholder="Ciudad"
                        />
                        {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Estado *</label>
                        <select
                          name="estado"
                          className={`form-select ${errors.estado ? 'is-invalid' : ''}`}
                          value={formData.estado}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecciona un estado</option>
                          <option value="CDMX">Ciudad de México</option>
                          <option value="Jalisco">Jalisco</option>
                          <option value="Nuevo León">Nuevo León</option>
                          <option value="Estado de México">Estado de México</option>
                          {/* Agregar más estados según necesidad */}
                        </select>
                        {errors.estado && <div className="invalid-feedback">{errors.estado}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Términos y condiciones */}
                  <div className="checkout__form-section mb-5">
                    <h3 className="section-title mb-4">Términos y condiciones</h3>
                    
                    {multipleFacturas && (
                      <div className="alert alert-warning mb-4">
                        <i className="fal fa-exclamation-triangle me-2"></i>
                        <strong>Atención:</strong> Tu pedido incluye productos de diferentes emisores de factura. 
                        Recibirás {emisoresDiferentes.size} facturas separadas:
                        <ul className="mt-2 mb-0">
                          {Array.from(emisoresDiferentes).map(emisor => (
                            <li key={emisor}>Factura emitida por: <strong>{emisor}</strong></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="form-check mb-3">
                      <input
                        className={`form-check-input ${errors.aceptaTerminos ? 'is-invalid' : ''}`}
                        type="checkbox"
                        name="aceptaTerminos"
                        id="aceptaTerminos"
                        checked={formData.aceptaTerminos}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="aceptaTerminos">
                        Acepto los{' '}
                        <Link href="/terminos" target="_blank" className="text-primary">
                          términos y condiciones
                        </Link>
                      </label>
                      {errors.aceptaTerminos && <div className="invalid-feedback">{errors.aceptaTerminos}</div>}
                    </div>
                    
                    <div className="form-check mb-3">
                      <input
                        className={`form-check-input ${errors.aceptaPrivacidad ? 'is-invalid' : ''}`}
                        type="checkbox"
                        name="aceptaPrivacidad"
                        id="aceptaPrivacidad"
                        checked={formData.aceptaPrivacidad}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="aceptaPrivacidad">
                        Acepto la{' '}
                        <Link href="/privacidad" target="_blank" className="text-primary">
                          política de privacidad
                        </Link>
                      </label>
                      {errors.aceptaPrivacidad && <div className="invalid-feedback">{errors.aceptaPrivacidad}</div>}
                    </div>
                    
                    <div className="alert alert-info">
                      <i className="fal fa-info-circle me-2"></i>
                      <strong>Aviso de responsabilidad:</strong> AMCI actúa como intermediario en esta transacción. 
                      La calidad, garantía y soporte técnico de los productos son responsabilidad directa de cada proveedor.
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Resumen del pedido */}
              <div className="col-xl-4 col-lg-4">
                <div className="checkout__sidebar">
                  <div className="checkout__sidebar-widget">
                    <h4 className="widget-title mb-4">Tu pedido</h4>
                    
                    {/* Productos */}
                    <div className="checkout__order-products mb-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="order-product d-flex justify-content-between align-items-center mb-3">
                          <div className="product-info d-flex align-items-center">
                            <img
                              src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/50x50?text=Sin+Imagen'}
                              alt={item.product?.nombre || 'Producto'}
                              className="me-3"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-1">{item.product?.nombre || 'Producto sin nombre'}</h6>
                              <small className="text-muted">
                                {item.product?.provider?.razon_social || 'Sin proveedor'} × {item.quantity}
                              </small>
                            </div>
                          </div>
                          <span className="product-total">
                            ${((item.product?.precio || 0) * item.quantity).toLocaleString('es-MX')}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <hr />
                    
                    {/* Totales */}
                    <div className="checkout__totals">
                      <div className="totals-item d-flex justify-content-between mb-3">
                        <span>Subtotal:</span>
                        <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                      </div>
                      
                      <div className="totals-item d-flex justify-content-between mb-3">
                        <span>Envío:</span>
                        <span>${costoEnvio.toLocaleString('es-MX')} MXN</span>
                      </div>
                      
                      <div className="totals-item d-flex justify-content-between mb-3">
                        <span>IVA (16%):</span>
                        <span>${iva.toLocaleString('es-MX')} MXN</span>
                      </div>
                      
                      <hr />
                      
                      <div className="totals-item d-flex justify-content-between mb-4">
                        <span className="fw-bold h5">Total:</span>
                        <span className="fw-bold h5 text-primary">
                          ${total.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                    </div>
                    
                    {/* Botón de pago o formulario de Stripe */}
                    {!showPayment ? (
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={isProcessing}
                        onClick={(e) => {
                          console.log('Payment button clicked');
                          console.log('showPayment:', showPayment);
                          console.log('isProcessing:', isProcessing);
                          console.log('cartItems.length:', cartItems.length);
                        }}
                      >
                        {isProcessing ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Procesando...
                          </>
                        ) : (
                          <>
                            <i className="fal fa-credit-card me-2"></i>
                            Continuar al pago
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="stripe-payment-wrapper">
                        <h5 className="mb-3">Completa tu pago</h5>
                        <StripePayment
                          amount={total}
                          orderId={`ORDER-${Date.now()}`}
                          customerEmail={formData.email}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100 mt-2"
                          onClick={() => setShowPayment(false)}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Volver a los datos
                        </button>
                      </div>
                    )}
                    
                    <div className="payment-methods text-center mt-3">
                      <small className="text-muted">Pago 100% seguro</small>
                      <div className="mt-2">
                        <i className="fab fa-cc-visa fa-2x text-primary me-2"></i>
                        <i className="fab fa-cc-mastercard fa-2x text-warning me-2"></i>
                        <i className="fal fa-shield-alt fa-2x text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default Checkout;