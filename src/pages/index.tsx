import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Hero Section */}
      <section className="hero__area pt-120 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="hero__content">
                <h1 className="hero__title mb-4">
                  Equipos y suministros industriales 
                  <span className="text-primary"> de calidad</span>
                </h1>
                <p className="hero__description mb-4">
                  Encuentra todo lo que necesitas para tu empresa con nuestros proveedores certificados. 
                  Desde equipos de protección personal hasta maquinaria industrial especializada.
                </p>
                <div className="hero__buttons">
                  <Link href="/catalogo" className="btn btn-primary btn-lg me-3">
                    <i className="fal fa-search me-2"></i>
                    Explorar Catálogo
                  </Link>
                  <Link href="/about" className="btn btn-outline-primary btn-lg">
                    Conoce más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="hero__image text-center">
                <i className="fal fa-industry fa-10x text-primary opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="providers__area pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-5">
                <h2>Nuestros Proveedores Certificados</h2>
                <p>Trabajamos con los mejores proveedores para garantizar calidad y confiabilidad</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="provider__card card h-100 text-center p-4">
                <div className="provider__icon mb-3">
                  <i className="fal fa-hard-hat fa-3x text-warning"></i>
                </div>
                <h4 className="provider__name">AP Safety</h4>
                <p className="provider__description">
                  Equipos de protección personal y seguridad industrial
                </p>
                <div className="provider__specialties">
                  <span className="badge bg-light text-dark me-1">EPP</span>
                  <span className="badge bg-light text-dark me-1">Cascos</span>
                  <span className="badge bg-light text-dark">Guantes</span>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="provider__card card h-100 text-center p-4">
                <div className="provider__icon mb-3">
                  <i className="fal fa-tools fa-3x text-info"></i>
                </div>
                <h4 className="provider__name">MTM</h4>
                <p className="provider__description">
                  Refacciones hidráulicas e industriales especializadas
                </p>
                <div className="provider__specialties">
                  <span className="badge bg-light text-dark me-1">Hidráulica</span>
                  <span className="badge bg-light text-dark me-1">Sellos</span>
                  <span className="badge bg-light text-dark">Mangueras</span>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="provider__card card h-100 text-center p-4">
                <div className="provider__icon mb-3">
                  <i className="fal fa-tint fa-3x text-primary"></i>
                </div>
                <h4 className="provider__name">Pumping Team</h4>
                <p className="provider__description">
                  Bombas y sistemas de bombeo para toda aplicación
                </p>
                <div className="provider__specialties">
                  <span className="badge bg-light text-dark me-1">Bombas</span>
                  <span className="badge bg-light text-dark me-1">Sumergibles</span>
                  <span className="badge bg-light text-dark">Centrífugas</span>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="provider__card card h-100 text-center p-4">
                <div className="provider__icon mb-3">
                  <i className="fal fa-lightbulb fa-3x text-warning"></i>
                </div>
                <h4 className="provider__name">Plásticos Torres</h4>
                <p className="provider__description">
                  Iluminación LED industrial y comercial
                </p>
                <div className="provider__specialties">
                  <span className="badge bg-light text-dark me-1">LED</span>
                  <span className="badge bg-light text-dark me-1">Plafones</span>
                  <span className="badge bg-light text-dark">Luminarias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features__area bg-light py-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-5">
                <h2>¿Por qué elegir AMCI?</h2>
                <p>Facilitamos tus compras industriales con un servicio integral y confiable</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-shield-check fa-3x text-success"></i>
                </div>
                <h4 className="feature__title">Proveedores Certificados</h4>
                <p className="feature__description">
                  Todos nuestros proveedores están certificados y cumplen con los más altos estándares de calidad.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-credit-card fa-3x text-primary"></i>
                </div>
                <h4 className="feature__title">Pagos Seguros</h4>
                <p className="feature__description">
                  Procesamos pagos de forma centralizada y segura, con dispersión programada a proveedores.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-truck fa-3x text-info"></i>
                </div>
                <h4 className="feature__title">Envío y Seguimiento</h4>
                <p className="feature__description">
                  Recibe actualizaciones en tiempo real del estado de tu pedido desde la compra hasta la entrega.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-file-invoice-dollar fa-3x text-warning"></i>
                </div>
                <h4 className="feature__title">Facturación Flexible</h4>
                <p className="feature__description">
                  Recibe facturas de AMCI o directamente del proveedor según el producto seleccionado.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-headset fa-3x text-danger"></i>
                </div>
                <h4 className="feature__title">Soporte Especializado</h4>
                <p className="feature__description">
                  Nuestro equipo te acompaña en todo el proceso, desde la cotización hasta el postventa.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="feature__item text-center">
                <div className="feature__icon mb-3">
                  <i className="fal fa-chart-line fa-3x text-success"></i>
                </div>
                <h4 className="feature__title">Reportes Detallados</h4>
                <p className="feature__description">
                  Accede a reportes completos de tus compras y gestiona fácilmente tu historial de pedidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta__area py-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta__content text-center">
                <h2 className="cta__title mb-4">
                  ¿Listo para comenzar?
                </h2>
                <p className="cta__description mb-4">
                  Explora nuestro catálogo y encuentra exactamente lo que necesitas para tu empresa.
                </p>
                <div className="cta__buttons">
                  <Link href="/catalogo" className="btn btn-primary btn-lg me-3">
                    <i className="fal fa-shopping-cart me-2"></i>
                    Ver Catálogo Completo
                  </Link>
                  <Link href="/contact" className="btn btn-outline-primary btn-lg">
                    <i className="fal fa-envelope me-2"></i>
                    Contactar Ventas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;