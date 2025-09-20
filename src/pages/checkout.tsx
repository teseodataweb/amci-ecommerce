import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import Link from "next/link";

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

interface CartItem {
  id: number;
  nombre: string;
  proveedor: string;
  precio: number;
  cantidad: number;
  imagen: string;
  emisor_factura: 'AMCI' | 'PROVEEDOR';
}

const Checkout = () => {
  // Datos del carrito (normalmente vendrían del estado global)
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      nombre: "Kit EPP Básico - 1 Persona",
      proveedor: "AP Safety",
      precio: 450,
      cantidad: 2,
      imagen: "/img/products/epp-kit-1-main.jpg",
      emisor_factura: 'AMCI'
    },
    {
      id: 2,
      nombre: "Refacciones Hidráulicas", 
      proveedor: "MTM",
      precio: 250,
      cantidad: 1,
      imagen: "/img/products/refacciones-hidraulicas.jpg",
      emisor_factura: 'PROVEEDOR'
    }
  ]);

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const costoEnvio = 200;
  const iva = subtotal * 0.16;
  const total = subtotal + costoEnvio + iva;

  // Verificar múltiples emisores de factura
  const emisoresDiferentes = new Set(cartItems.map(item => item.emisor_factura));
  const multipleFacturas = emisoresDiferentes.size > 1;

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
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Aquí se integraría con Mercado Pago o Stripe
      // Por ahora simulamos el proceso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular creación de orden y redirección a página de éxito
      alert('¡Pedido creado exitosamente! Redirigiendo...');
      // window.location.href = '/orden/123';
      
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago. Inténtalo nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Finalizar compra"
        subtitle="Completa tu pedido de forma segura"
        bg="bg-primary"
      />
      
      <section className="checkout__area pt-120 pb-80">
        <div className="container">
          <form onSubmit={handleSubmit}>
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
                              src={item.imagen}
                              alt={item.nombre}
                              className="me-3"
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-1">{item.nombre}</h6>
                              <small className="text-muted">
                                {item.proveedor} × {item.cantidad}
                              </small>
                            </div>
                          </div>
                          <span className="product-total">
                            ${(item.precio * item.cantidad).toLocaleString('es-MX')}
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
                    
                    {/* Botón de pago */}
                    <button 
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <i className="fal fa-credit-card me-2"></i>
                          Pagar ahora
                        </>
                      )}
                    </button>
                    
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
  );
};

export default Checkout;