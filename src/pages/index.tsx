import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Hero Section */}
      <section className="hero__area hero__area-amci">
        <div
          className="hero__overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at left center, rgba(30, 64, 175, 0.75) 0%, rgba(13, 27, 62, 0.88) 50%, rgba(0, 15, 40, 0.95) 100%)',
            zIndex: 1
          }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-xl-7 col-lg-7">
              <div className="hero__content">
                <h1
                  className="hero__title display-3 fw-bold text-white mb-4"
                  data-aos="fade-up"
                  style={{
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                    lineHeight: '1.2'
                  }}
                >
                  Equipos y suministros industriales
                  <span
                    className="d-block mt-3"
                    style={{
                      color: '#4E9EFF',
                      textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8), 0 0 50px rgba(4, 70, 240, 0.4)',
                      fontWeight: '700'
                    }}
                  >
                    de calidad certificada
                  </span>
                </h1>
                <p
                  className="hero__description fs-5 mb-5 text-white"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  style={{
                    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
                    lineHeight: '1.6',
                    maxWidth: '600px',
                    fontWeight: '400'
                  }}
                >
                  Encuentra todo lo que necesitas para tu empresa con nuestros proveedores certificados.
                  Desde equipos de protección personal hasta maquinaria industrial especializada.
                </p>
                <div className="hero__buttons d-flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
                  <Link
                    href="/catalogo"
                    className="btn"
                    style={{
                      background: '#0446F0',
                      color: '#ffffff',
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 14px rgba(4, 70, 240, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      letterSpacing: '-0.01em'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0338C0';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(4, 70, 240, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0446F0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(4, 70, 240, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <i className="fal fa-search me-2"></i>
                    Explorar Catálogo
                  </Link>
                  <Link
                    href="/about"
                    className="btn"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      letterSpacing: '-0.01em'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Conoce más
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 d-none d-lg-block">
              <div className="hero__image text-center" data-aos="fade-left" data-aos-delay="300">
                <Image
                  src="/img/hero/hero-image.png"
                  alt="AMCI Equipos Industriales"
                  width={500}
                  height={500}
                  priority
                  unoptimized
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="providers__area py-100 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-60" data-aos="fade-up">
                <h2 className="section__title-main">Nuestros Proveedores Certificados</h2>
                <p className="section__subtitle">Trabajamos con los mejores proveedores para garantizar calidad y confiabilidad</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center g-4">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="100">
              <div className="provider__card provider__card-amci card h-100 text-center">
                <div className="provider__logo-wrapper">
                  <div className="provider__logo-placeholder">
                    <Image
                      src="/img/providers/ap-safety.png"
                      alt="AP Safety"
                      width={250}
                      height={125}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="provider__info">
                  <h5 className="provider__name">AP Safety</h5>
                  <p className="provider__description">
                    Equipos de protección personal y seguridad industrial
                  </p>
                  <div className="provider__specialties">
                    <span className="badge badge-amci me-1">EPP</span>
                    <span className="badge badge-amci me-1">Cascos</span>
                    <span className="badge badge-amci">Guantes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="200">
              <div className="provider__card provider__card-amci card h-100 text-center">
                <div className="provider__logo-wrapper">
                  <div className="provider__logo-placeholder">
                    <Image
                      src="/img/providers/mtm.png"
                      alt="MTM"
                      width={250}
                      height={125}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="provider__info">
                  <h5 className="provider__name">MTM</h5>
                  <p className="provider__description">
                    Refacciones hidráulicas e industriales especializadas
                  </p>
                  <div className="provider__specialties">
                    <span className="badge badge-amci me-1">Hidráulica</span>
                    <span className="badge badge-amci me-1">Sellos</span>
                    <span className="badge badge-amci">Mangueras</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="300">
              <div className="provider__card provider__card-amci card h-100 text-center">
                <div className="provider__logo-wrapper">
                  <div className="provider__logo-placeholder">
                    <Image
                      src="/img/providers/pumping-team.png"
                      alt="Pumping Team"
                      width={250}
                      height={125}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="provider__info">
                  <h5 className="provider__name">Pumping Team</h5>
                  <p className="provider__description">
                    Bombas y sistemas de bombeo para toda aplicación
                  </p>
                  <div className="provider__specialties">
                    <span className="badge badge-amci me-1">Bombas</span>
                    <span className="badge badge-amci me-1">Sumergibles</span>
                    <span className="badge badge-amci">Centrífugas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="400">
              <div className="provider__card provider__card-amci card h-100 text-center">
                <div className="provider__logo-wrapper">
                  <div className="provider__logo-placeholder">
                    <Image
                      src="/img/providers/plasticos-torres.png"
                      alt="Plásticos Torres"
                      width={250}
                      height={125}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="provider__info">
                  <h5 className="provider__name">Plásticos Torres</h5>
                  <p className="provider__description">
                    Iluminación LED industrial y comercial
                  </p>
                  <div className="provider__specialties">
                    <span className="badge badge-amci me-1">LED</span>
                    <span className="badge badge-amci me-1">Plafones</span>
                    <span className="badge badge-amci">Luminarias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features__area features__area-amci bg-amci-light py-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-60" data-aos="fade-up">
                <h2 className="section__title-main">¿Por qué elegir AMCI?</h2>
                <p className="section__subtitle">Facilitamos tus compras industriales con un servicio integral y confiable</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-shield-check fa-3x text-amci-primary"></i>
                  </div>
                  <h4 className="feature__title">Proveedores Certificados</h4>
                  <p className="feature__description">
                    Todos nuestros proveedores están certificados y cumplen con los más altos estándares de calidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="150">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-credit-card fa-3x text-amci-primary"></i>
                  </div>
                  <h4 className="feature__title">Pagos Seguros</h4>
                  <p className="feature__description">
                    Procesamos pagos de forma centralizada y segura, con dispersión programada a proveedores.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-truck fa-3x text-amci-primary"></i>
                  </div>
                  <h4 className="feature__title">Envío y Seguimiento</h4>
                  <p className="feature__description">
                    Recibe actualizaciones en tiempo real del estado de tu pedido desde la compra hasta la entrega.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="250">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-file-invoice-dollar fa-3x text-amci-secondary"></i>
                  </div>
                  <h4 className="feature__title">Facturación Flexible</h4>
                  <p className="feature__description">
                    Recibe facturas de AMCI o directamente del proveedor según el producto seleccionado.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-headset fa-3x text-amci-secondary"></i>
                  </div>
                  <h4 className="feature__title">Soporte Especializado</h4>
                  <p className="feature__description">
                    Nuestro equipo te acompaña en todo el proceso, desde la cotización hasta el postventa.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="350">
              <div className="feature__card feature__card-amci card h-100">
                <div className="feature__card-body">
                  <div className="feature__icon feature__icon-amci mb-4">
                    <i className="fal fa-chart-line fa-3x text-amci-primary"></i>
                  </div>
                  <h4 className="feature__title">Reportes Detallados</h4>
                  <p className="feature__description">
                    Accede a reportes completos de tus compras y gestiona fácilmente tu historial de pedidos.
                  </p>
                </div>
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