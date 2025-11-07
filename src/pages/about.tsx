import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Hero/Breadcrumb Section - Rediseñado */}
      <style jsx>{`
        @keyframes radialPulseAbout {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.2;
          }
          33% {
            transform: translate(-20%, -80%) scale(1.2);
            opacity: 0.4;
          }
          66% {
            transform: translate(-80%, -30%) scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.2;
          }
        }

        @keyframes textSlideGlowAbout {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 10px rgba(78, 158, 255, 0.3);
          }
          50% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(78, 158, 255, 1), 0 0 60px rgba(4, 70, 240, 0.6);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8);
          }
        }

        @keyframes textGlowPulseAbout {
          0%, 100% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8);
          }
          50% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 45px rgba(78, 158, 255, 1), 0 0 80px rgba(4, 70, 240, 0.7);
          }
        }

        @keyframes particleFloatAbout1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px);
            opacity: 0.6;
          }
        }

        @keyframes particleFloatAbout2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(-40px, 40px);
            opacity: 0.7;
          }
        }

        @keyframes particleFloatAbout3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -50px) scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes breadcrumbSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes breadcrumbItemHover {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        .breadcrumb-modern {
          animation: breadcrumbSlideIn 0.8s ease-out forwards;
        }

        .breadcrumb-item-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .breadcrumb-item-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.3s ease;
        }

        .breadcrumb-item-link:hover::after {
          width: 100%;
        }

        .breadcrumb-separator {
          margin: 0 10px;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .breadcrumb-modern:hover .breadcrumb-separator {
          opacity: 1;
        }

        @keyframes badgePulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15), 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25), 0 0 0 8px rgba(255, 255, 255, 0);
          }
        }

        @keyframes badgeShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes badgeBounce {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(-30px);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) translateY(0);
          }
          80% {
            transform: scale(0.95) translateY(0);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        .badge-dynamic {
          animation: badgeBounce 1s ease-out forwards, badgePulse 3s ease-in-out 1s infinite;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.15) 25%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% auto;
          animation: badgeBounce 1s ease-out forwards, badgePulse 3s ease-in-out 1s infinite, badgeShimmer 3s linear 1s infinite;
          transition: all 0.3s ease;
        }

        .badge-dynamic:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.25);
        }

        .badge-icon-spin {
          display: inline-block;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .hero-overlay-animated-about::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          background: radial-gradient(ellipse 1200px 900px at center, rgba(78, 158, 255, 0.35) 0%, rgba(30, 64, 175, 0.2) 40%, transparent 70%);
          animation: radialPulseAbout 20s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-text-glow-about {
          animation: textSlideGlowAbout 1.5s ease-out forwards, textGlowPulseAbout 4s ease-in-out 1.5s infinite;
        }

        .breadcrumb-animated {
          animation: breadcrumbFadeIn 0.8s ease-out forwards;
        }

        .particle-about {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-about-1 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.3) 0%, transparent 70%);
          top: 15%;
          left: 10%;
          animation: particleFloatAbout1 8s ease-in-out infinite;
        }

        .particle-about-2 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(4, 70, 240, 0.2) 0%, transparent 70%);
          bottom: 20%;
          right: 15%;
          animation: particleFloatAbout2 10s ease-in-out infinite;
        }

        .particle-about-3 {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.25) 0%, transparent 70%);
          top: 50%;
          left: 25%;
          animation: particleFloatAbout3 7s ease-in-out infinite;
        }
      `}</style>

      <section
        className="hero__area hero__area-about"
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Overlay con animación */}
        <div
          className="hero__overlay hero-overlay-animated-about"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          {/* Partículas animadas */}
          <div className="particle-about particle-about-1"></div>
          <div className="particle-about particle-about-2"></div>
          <div className="particle-about particle-about-3"></div>
        </div>

        {/* Contenido */}
        <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '60px' }}>
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb mejorado */}
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-modern d-flex justify-content-center mb-5"
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <Link
                    href="/"
                    className="breadcrumb-item-link"
                    style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 0'
                    }}
                  >
                    <i className="fal fa-home" style={{ fontSize: '15px' }}></i>
                    <span>Inicio</span>
                  </Link>

                  <span className="breadcrumb-separator" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    <i className="fal fa-angle-right" style={{ fontSize: '14px' }}></i>
                  </span>

                  <span
                    style={{
                      color: '#ffffff',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <i className="fal fa-info-circle" style={{ fontSize: '15px' }}></i>
                    <span>Acerca de AMCI</span>
                  </span>
                </div>
              </nav>

              {/* Título y subtítulo */}
              <div className="hero__content-about text-center" style={{ marginTop: '20px' }}>
                <h1
                  className="display-3 fw-bold text-white mb-3"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  style={{
                    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                    lineHeight: '1.2',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)'
                  }}
                >
                  <span
                    className="hero-text-glow-about"
                    style={{
                      color: '#ffffff',
                      fontWeight: '700'
                    }}
                  >
                    Acerca de AMCI
                  </span>
                </h1>
                <p
                  className="text-white mx-auto"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1200"
                  style={{
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
                    lineHeight: '1.6',
                    maxWidth: '700px',
                    fontWeight: '500',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    letterSpacing: '0.5px',
                    marginBottom: '2.5rem'
                  }}
                >
                  Tu socio confiable en suministros industriales
                </p>

                {/* Badge industrial - Movido debajo del subtítulo */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="1200"
                >
                  <span
                    className="badge-dynamic"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      padding: '8px 20px',
                      borderRadius: '30px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-shield-check badge-icon-spin"></i>
                    Proveedores Certificados desde 2010
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave/divider at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '60px',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 2
          }}
        ></div>
      </section>
      
      <section className="about__area pt-120 pb-80">
        <div className="container">
          {/* Company Overview */}
          <div className="row mb-5">
            <div className="col-xl-6 col-lg-6 mb-4">
              <div className="about__content">
                <h2 className="about__title mb-4">
                  Conectamos empresas con los mejores proveedores industriales
                </h2>
                <p className="about__description mb-4">
                  AMCI es una plataforma especializada que facilita la adquisición de equipos y suministros 
                  industriales, conectando empresas con proveedores certificados y de alta calidad.
                </p>
                <p className="about__description mb-4">
                  Nuestro enfoque se centra en simplificar el proceso de compra, desde la cotización hasta 
                  la entrega, garantizando transparencia en precios, calidad en productos y excelencia en servicio.
                </p>
                <div className="about__stats mt-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="stat-item">
                        <h3 className="stat-number text-primary">4+</h3>
                        <p className="stat-label">Proveedores Certificados</p>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="stat-item">
                        <h3 className="stat-number text-primary">100+</h3>
                        <p className="stat-label">Productos Disponibles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-6">
              <div className="about__image text-center">
                <i className="fal fa-building fa-10x text-primary opacity-25"></i>
                <div className="mt-3">
                  <h4>Misión</h4>
                  <p>
                    Facilitar el acceso a equipos y suministros industriales de calidad, 
                    creando un ecosistema confiable entre empresas y proveedores especializados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="section__title text-center mb-5">
                <h2>Nuestros Valores</h2>
                <p>Los principios que guían cada una de nuestras acciones</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="value__item text-center">
                <div className="value__icon mb-3">
                  <i className="fal fa-handshake fa-3x text-primary"></i>
                </div>
                <h4 className="value__title">Confianza</h4>
                <p className="value__description">
                  Construimos relaciones sólidas basadas en transparencia, honestidad y cumplimiento de compromisos.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="value__item text-center">
                <div className="value__icon mb-3">
                  <i className="fal fa-award fa-3x text-success"></i>
                </div>
                <h4 className="value__title">Calidad</h4>
                <p className="value__description">
                  Trabajamos únicamente con proveedores que cumplen con los más altos estándares de calidad y certificación.
                </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="value__item text-center">
                <div className="value__icon mb-3">
                  <i className="fal fa-rocket fa-3x text-info"></i>
                </div>
                <h4 className="value__title">Innovación</h4>
                <p className="value__description">
                  Utilizamos tecnología para mejorar continuamente la experiencia de compra y gestión de pedidos.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="about__cta text-center bg-light p-5 rounded">
                <h3 className="mb-4">¿Tienes alguna pregunta?</h3>
                <p className="mb-4">
                  Nuestro equipo está disponible para ayudarte con cualquier consulta sobre productos, 
                  proveedores o el proceso de compra.
                </p>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <i className="fal fa-envelope me-2"></i>
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
