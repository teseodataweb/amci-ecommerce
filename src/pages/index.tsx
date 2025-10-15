import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Hero Section */}
      <section className="hero__area hero__area-amci">
        <div className="hero__overlay"></div>
        <div className="container position-relative">
          <div className="row align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-xl-7 col-lg-7">
              <div className="hero__content">
                <h1 className="hero__title hero__title-amci mb-4" data-aos="fade-up">
                  Equipos y suministros industriales
                  <span className="text-amci-primary d-block mt-2">de calidad certificada</span>
                </h1>
                <p className="hero__description hero__description-amci mb-5 text-white" data-aos="fade-up" data-aos-delay="100">
                  Encuentra todo lo que necesitas para tu empresa con nuestros proveedores certificados.
                  Desde equipos de protección personal hasta maquinaria industrial especializada.
                </p>
                <div className="hero__buttons" data-aos="fade-up" data-aos-delay="200">
                  <Link href="/catalogo" className="btn btn-amci-primary btn-lg me-3 shadow-sm">
                    <i className="fal fa-search me-2"></i>
                    Explorar Catálogo
                  </Link>
                  <Link href="/about" className="btn btn-outline-light btn-lg shadow-sm">
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