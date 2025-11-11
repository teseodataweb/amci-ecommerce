import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import HomeThreeTouch from "@/components/containers/touch/HomeThreeTouch";
import ContactMap from "@/components/containers/cta/ContactMap";

const Contact = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Fix AOS animations - ensure elements stay visible */
        [data-aos] {
          opacity: 1 !important;
          transform: none !important;
        }

        [data-aos].aos-animate {
          opacity: 1 !important;
        }

        @keyframes radialPulseContact {
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

        @keyframes textSlideGlowContact {
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

        @keyframes textGlowPulseContact {
          0%, 100% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8);
          }
          50% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 45px rgba(78, 158, 255, 1), 0 0 80px rgba(4, 70, 240, 0.7);
          }
        }

        @keyframes particleFloatContact1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px);
            opacity: 0.6;
          }
        }

        @keyframes particleFloatContact2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(-40px, 40px);
            opacity: 0.7;
          }
        }

        @keyframes particleFloatContact3 {
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

        .hero-overlay-animated-contact::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          background: radial-gradient(ellipse 1200px 900px at center, rgba(78, 158, 255, 0.35) 0%, rgba(30, 64, 175, 0.2) 40%, transparent 70%);
          animation: radialPulseContact 20s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-text-glow-contact {
          animation: textSlideGlowContact 1.5s ease-out forwards, textGlowPulseContact 4s ease-in-out 1.5s infinite;
        }

        .particle-contact {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-contact-1 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.3) 0%, transparent 70%);
          top: 15%;
          left: 10%;
          animation: particleFloatContact1 8s ease-in-out infinite;
        }

        .particle-contact-2 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(4, 70, 240, 0.2) 0%, transparent 70%);
          bottom: 20%;
          right: 15%;
          animation: particleFloatContact2 10s ease-in-out infinite;
        }

        .particle-contact-3 {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.25) 0%, transparent 70%);
          top: 50%;
          left: 25%;
          animation: particleFloatContact3 7s ease-in-out infinite;
        }
      `}} />

      {/* Hero/Breadcrumb Section */}
      <section
        className="hero__area hero__area-contact"
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
          className="hero__overlay hero-overlay-animated-contact"
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
          <div className="particle-contact particle-contact-1"></div>
          <div className="particle-contact particle-contact-2"></div>
          <div className="particle-contact particle-contact-3"></div>
        </div>

        {/* Contenido */}
        <div className="container position-relative" style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '100px' }}>
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
                    <i className="fal fa-envelope" style={{ fontSize: '15px' }}></i>
                    <span>Contacto</span>
                  </span>
                </div>
              </nav>

              {/* Título y subtítulo */}
              <div className="hero__content-contact text-center" style={{ marginTop: '20px' }}>
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
                    className="hero-text-glow-contact"
                    style={{
                      color: '#ffffff',
                      fontWeight: '700'
                    }}
                  >
                    Contáctanos
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
                  Estamos aquí para ayudarte con cualquier consulta o cotización
                </p>

                {/* Badge - Debajo del subtítulo */}
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
                    <i className="fas fa-headset badge-icon-spin"></i>
                    Soporte disponible 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <HomeThreeTouch />

      {/* Map Section */}
      <ContactMap />
    </Layout>
  );
};

export default Contact;
