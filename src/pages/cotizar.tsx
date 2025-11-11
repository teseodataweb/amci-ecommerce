import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

const Cotizar = () => {
  const router = useRouter();
  const { producto, productoId, categoria, proveedor } = router.query;

  const [formData, setFormData] = useState({
    // Información del cliente
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: '',

    // Información del proyecto
    cantidad: '',
    fechaRequerida: '',
    presupuesto: '',

    // Comentarios
    comentarios: '',

    // Términos
    acceptTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pre-llenar comentarios con información del producto si viene de una cotización
    if (producto) {
      const productInfo = `Información del Producto:\n━━━━━━━━━━━━━━━━━━━━━━\n📦 Producto: ${producto}\n🏷️ Categoría: ${categoria || 'N/A'}\n🏭 Proveedor: ${proveedor || 'N/A'}\n🆔 ID: ${productoId || 'N/A'}\n\nComentarios adicionales:\n`;
      setFormData(prev => ({
        ...prev,
        comentarios: productInfo
      }));
    }
  }, [producto, productoId, categoria, proveedor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      alert('Por favor, acepta los términos y condiciones');
      return;
    }

    setIsSubmitting(true);

    // Simular envío (aquí puedes implementar la lógica real)
    setTimeout(() => {
      console.log('Cotización enviada:', formData);
      alert('✅ Tu solicitud de cotización ha sido enviada exitosamente.\n\nNos pondremos en contacto contigo en las próximas 24-48 horas.');

      // Resetear formulario
      setFormData({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
        cantidad: '',
        fechaRequerida: '',
        presupuesto: '',
        comentarios: '',
        acceptTerms: false
      });

      setIsSubmitting(false);

      // Redirigir al catálogo
      setTimeout(() => {
        router.push('/catalogo');
      }, 1500);
    }, 1500);
  };

  return (
    <Layout header={1} footer={1}>
      {/* Hero Section */}
      <section className="quote-hero">
        <div className="quote-hero__overlay">
          <div className="quote-particle quote-particle-1"></div>
          <div className="quote-particle quote-particle-2"></div>
          <div className="quote-particle quote-particle-3"></div>
          <div className="quote-shape quote-shape-1"></div>
          <div className="quote-shape quote-shape-2"></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb" className="breadcrumb-modern">
            <div className="breadcrumb-content">
              <Link href="/" className="breadcrumb-item-link">
                <i className="fal fa-home"></i>
                <span>Inicio</span>
              </Link>

              <span className="breadcrumb-separator">
                <i className="fal fa-angle-right"></i>
              </span>

              <span className="breadcrumb-current">
                <i className="fal fa-file-invoice-dollar"></i>
                <span>Solicitar Cotización</span>
              </span>
            </div>
          </nav>

          <div className="quote-hero__content">
            <h1 className="quote-hero__title">
              <span className="quote-hero__icon">
                <i className="fas fa-file-invoice-dollar"></i>
              </span>
              Solicitar Cotización
            </h1>
            <p className="quote-hero__subtitle">
              Completa el formulario y recibe una cotización personalizada en 24-48 horas
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="quote-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {producto && (
                <div className="quote-product-info" data-aos="fade-up">
                  <div className="quote-product-info__header">
                    <i className="fas fa-box-open"></i>
                    <h3>Producto Seleccionado</h3>
                  </div>
                  <div className="quote-product-info__content">
                    <div className="quote-product-info__item">
                      <span className="label">Producto:</span>
                      <span className="value">{producto}</span>
                    </div>
                    {categoria && (
                      <div className="quote-product-info__item">
                        <span className="label">Categoría:</span>
                        <span className="value">{categoria}</span>
                      </div>
                    )}
                    {proveedor && (
                      <div className="quote-product-info__item">
                        <span className="label">Proveedor:</span>
                        <span className="value">{proveedor}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="quote-form-card" data-aos="fade-up" data-aos-delay="100">
                <form onSubmit={handleSubmit}>
                  {/* Información del Cliente */}
                  <div className="quote-form-section-title">
                    <i className="fas fa-user"></i>
                    <h3>Información del Cliente</h3>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="quote-form-group">
                        <label htmlFor="nombre">
                          Nombre <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="quote-form-group">
                        <label htmlFor="apellido">
                          Apellido <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          placeholder="Tu apellido"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="quote-form-group">
                        <label htmlFor="email">
                          Correo Electrónico <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="quote-form-group">
                        <label htmlFor="telefono">
                          Teléfono <span className="required">*</span>
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="+52 123 456 7890"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="quote-form-group">
                    <label htmlFor="empresa">
                      Empresa / Organización
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa (opcional)"
                    />
                  </div>

                  {/* Información del Proyecto */}
                  <div className="quote-form-section-title">
                    <i className="fas fa-clipboard-list"></i>
                    <h3>Detalles del Proyecto</h3>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="quote-form-group">
                        <label htmlFor="cantidad">
                          Cantidad Requerida <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          id="cantidad"
                          name="cantidad"
                          value={formData.cantidad}
                          onChange={handleInputChange}
                          placeholder="Ej: 100 unidades"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="quote-form-group">
                        <label htmlFor="fechaRequerida">
                          Fecha Requerida
                        </label>
                        <input
                          type="date"
                          id="fechaRequerida"
                          name="fechaRequerida"
                          value={formData.fechaRequerida}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="quote-form-group">
                        <label htmlFor="presupuesto">
                          Presupuesto Estimado
                        </label>
                        <input
                          type="text"
                          id="presupuesto"
                          name="presupuesto"
                          value={formData.presupuesto}
                          onChange={handleInputChange}
                          placeholder="Ej: $50,000 MXN"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="quote-form-group">
                    <label htmlFor="comentarios">
                      Comentarios Adicionales <span className="required">*</span>
                    </label>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      placeholder="Describe tus necesidades, especificaciones técnicas o cualquier información adicional..."
                      rows={8}
                      required
                    ></textarea>
                  </div>

                  {/* Términos y Envío */}
                  <div className="quote-form-footer">
                    <div className="quote-form-terms">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="acceptTerms">
                        Acepto los{" "}
                        <Link href="/terminos" target="_blank">
                          Términos y Condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link href="/privacidad" target="_blank">
                          Política de Privacidad
                        </Link>
                      </label>
                    </div>

                    <div className="quote-form-actions">
                      <button
                        type="button"
                        className="btn-quote-secondary"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-arrow-left"></i>
                        Volver
                      </button>
                      <button
                        type="submit"
                        className="btn-quote-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane"></i>
                            Enviar Solicitud
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Info Cards */}
              <div className="quote-info-cards" data-aos="fade-up" data-aos-delay="200">
                <div className="quote-info-card">
                  <div className="quote-info-card__icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h4>Respuesta Rápida</h4>
                  <p>Te responderemos en 24-48 horas hábiles</p>
                </div>
                <div className="quote-info-card">
                  <div className="quote-info-card__icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>Información Segura</h4>
                  <p>Tus datos están protegidos y seguros</p>
                </div>
                <div className="quote-info-card">
                  <div className="quote-info-card__icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h4>Sin Compromiso</h4>
                  <p>Cotización gratuita y sin obligación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cotizar;
