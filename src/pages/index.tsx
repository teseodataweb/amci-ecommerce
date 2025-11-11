import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const Home = () => {
  return (
    <Layout header={1} footer={1}>
      {/* Hero Section */}
      <style jsx>{`
        @keyframes catalogShapeFloat1 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes catalogShapeFloat2 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
        }

        @keyframes heroImageVertical1 {
          0%, 100% {
            transform: translateY(0) scale(1.05);
            filter: drop-shadow(0 35px 90px rgba(3, 56, 192, 0.75)) brightness(1.12) saturate(1.3);
          }
          50% {
            transform: translateY(-60px) scale(0.92);
            filter: drop-shadow(0 25px 70px rgba(3, 56, 192, 0.65)) brightness(1.05) saturate(1.2);
          }
        }

        @keyframes heroImageVertical2 {
          0%, 100% {
            transform: translateY(-70px) scale(0.9);
            filter: drop-shadow(0 28px 75px rgba(147, 197, 253, 0.7)) brightness(1.08) saturate(1.25);
          }
          50% {
            transform: translateY(0) scale(1.08);
            filter: drop-shadow(0 40px 100px rgba(59, 130, 246, 0.8)) brightness(1.15) saturate(1.35);
          }
        }

        @keyframes lightSweep {
          0% {
            transform: translate(-150%, -150%) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.5;
          }
          50% {
            transform: translate(50%, 50%) scale(1.5);
            opacity: 0.4;
          }
          75% {
            transform: translate(150%, -50%) scale(1.3);
            opacity: 0.3;
          }
          100% {
            transform: translate(250%, -150%) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes textSlideGlow {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 10px rgba(78, 158, 255, 0.3), 0 0 20px rgba(4, 70, 240, 0.2);
          }
          50% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(78, 158, 255, 1), 0 0 60px rgba(4, 70, 240, 0.6);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8), 0 0 50px rgba(4, 70, 240, 0.4);
          }
        }

        @keyframes textGlowPulse {
          0%, 100% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8), 0 0 50px rgba(4, 70, 240, 0.4);
          }
          50% {
            text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 45px rgba(78, 158, 255, 1), 0 0 80px rgba(4, 70, 240, 0.7);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes particleFloat1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px);
            opacity: 0.6;
          }
        }

        @keyframes particleFloat2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(-40px, 40px);
            opacity: 0.7;
          }
        }

        @keyframes particleFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -50px) scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes buttonPulseHero {
          0%, 100% {
            box-shadow: 0 4px 14px rgba(4, 70, 240, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 4px 14px rgba(4, 70, 240, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 20px rgba(4, 70, 240, 0.3);
          }
        }

        @keyframes subtleBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .hero-overlay::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1200px;
          height: 1200px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(78, 158, 255, 0.4) 0%, rgba(30, 64, 175, 0.25) 25%, rgba(30, 64, 175, 0.1) 50%, transparent 70%);
          animation: lightSweep 20s ease-in-out infinite;
          pointer-events: none;
          border-radius: 50%;
        }

        .hero-text-glow {
          animation: textSlideGlow 1.5s ease-out forwards, textGlowPulse 4s ease-in-out 1.5s infinite;
        }

        .hero-image-float {
          animation: float 6s ease-in-out infinite;
        }

        .hero-button-pulse {
          animation: buttonPulseHero 2s ease-in-out infinite, subtleBlink 3s ease-in-out infinite;
        }

        .hero-button-secondary {
          animation: subtleBlink 3.5s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.3) 0%, transparent 70%);
          top: 20%;
          left: 10%;
          animation: particleFloat1 8s ease-in-out infinite;
        }

        .particle-2 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(4, 70, 240, 0.2) 0%, transparent 70%);
          bottom: 30%;
          right: 15%;
          animation: particleFloat2 10s ease-in-out infinite;
        }

        .particle-3 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(78, 158, 255, 0.25) 0%, transparent 70%);
          top: 60%;
          left: 30%;
          animation: particleFloat3 7s ease-in-out infinite;
        }

        .particle-4 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(4, 70, 240, 0.15) 0%, transparent 70%);
          top: 40%;
          right: 25%;
          animation: particleFloat1 9s ease-in-out infinite reverse;
        }

        :global(.catalog-shape-1) {
          width: 320px;
          height: 320px;
          position: absolute;
          border-radius: 50%;
          bottom: 15%;
          right: -100px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(78, 158, 255, 0.1) 100%);
          animation: catalogShapeFloat1 6s ease-in-out infinite;
          pointer-events: none;
        }

        :global(.catalog-shape-2) {
          width: 280px;
          height: 280px;
          position: absolute;
          border-radius: 50%;
          top: 55%;
          left: -110px;
          background: linear-gradient(135deg, rgba(30, 64, 175, 0.12) 0%, rgba(13, 27, 62, 0.1) 100%);
          animation: catalogShapeFloat2 8s ease-in-out infinite;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          :global(.catalog-shape-1) {
            width: 160px;
            height: 160px;
            bottom: 15%;
            right: -50px;
          }

          :global(.catalog-shape-2) {
            width: 140px;
            height: 140px;
            top: 55%;
            left: -55px;
          }
        }
      `}</style>
      <section
        className="hero__area hero__area-amci"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          className="hero__overlay"
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
          {/* Partículas pequeñas animadas */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>

          {/* Círculos decorativos grandes - estilo Catálogo */}
          <div className="catalog-shape catalog-shape-1"></div>
          <div className="catalog-shape catalog-shape-2"></div>

        </div>

        <div className="container position-relative" style={{ zIndex: 4, paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="row">
            <div className="col-12">
              <div className="hero__content" style={{ textAlign: 'center' }}>
                <h1
                  className="fw-bold text-white mb-3"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  style={{
                    textShadow: '2px 2px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(78, 158, 255, 0.8), 0 0 50px rgba(4, 70, 240, 0.4)',
                    lineHeight: '1.2',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    margin: 0,
                    fontStyle: 'normal !important',
                    fontFamily: 'inherit'
                  }}
                >
                  <span
                    className="hero-text-glow-catalog"
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      fontStyle: 'normal !important',
                      fontFamily: 'inherit'
                    }}
                  >
                    Equipos y suministros industriales<br />de calidad certificada
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
                  Encuentra todo lo que necesitas para tu empresa con nuestros proveedores certificados.
                  Desde equipos de protección personal hasta maquinaria industrial especializada.
                </p>
                <div className="hero__buttons d-flex flex-wrap gap-3 justify-content-center" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1200">
                  <Link
                    href="/catalogo"
                    className="btn hero-button-pulse"
                    style={{
                      background: '#0446F0',
                      color: '#ffffff',
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: 'none',
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
                    className="btn hero-button-secondary"
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
          </div>
        </div>

        {/* Imágenes decorativas - Movimiento vertical con cambio de escala */}
        {/* Imagen grande inferior izquierda - Sube y baja reduciendo tamaño al subir */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '2%',
            width: '42%',
            maxWidth: '520px',
            zIndex: 3,
            pointerEvents: 'none'
          }}
          data-aos="zoom-in"
          data-aos-delay="500"
          data-aos-duration="1500"
        >
          <Image
            src="/img/hero/hero-image.png"
            alt="AMCI Equipos Industriales"
            width={520}
            height={520}
            priority
            unoptimized
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
              animation: 'heroImageVertical1 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* Imagen pequeña superior derecha - Sube y baja reduciendo tamaño al subir */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '4%',
            width: '28%',
            maxWidth: '340px',
            zIndex: 3,
            pointerEvents: 'none'
          }}
          data-aos="fade-down-left"
          data-aos-delay="700"
          data-aos-duration="1300"
        >
          <Image
            src="/img/hero/hero-image.png"
            alt="AMCI Equipos Industriales"
            width={340}
            height={340}
            priority
            unoptimized
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
              animation: 'heroImageVertical2 10s ease-in-out infinite'
            }}
          />
        </div>
      </section>

      {/* Providers Section */}
      <section className="providers__area py-100 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-30" data-aos="fade-up">
                <h2 className="section__title-main" style={{ marginBottom: '12px' }}>Nuestros Proveedores Certificados</h2>
                <p className="section__subtitle">Trabajamos con los mejores proveedores para garantizar calidad y confiabilidad</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center g-4">
            {/* AP Safety Card */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="100">
              <div
                className="card h-100 text-center"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e8e8e8',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(4, 70, 240, 0.12)';
                  e.currentTarget.style.borderColor = '#0446F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = '#e8e8e8';
                }}
              >
                {/* Badge de Certificación */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}>
                  <i className="fas fa-certificate" style={{ fontSize: '10px' }}></i>
                  Certificado ISO
                </div>

                <div style={{ padding: '24px 20px 20px' }}>
                  {/* Logo del Proveedor */}
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    minHeight: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image
                      src="/img/providers/ap-safety.png"
                      alt="AP Safety"
                      width={220}
                      height={110}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  {/* Nombre y Rating */}
                  <h5 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    AP Safety
                  </h5>

                  {/* Rating con estrellas */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star" style={{ color: '#FFC107', fontSize: '14px' }}></i>
                    ))}
                    <span style={{ fontSize: '13px', color: '#666', marginLeft: '6px' }}>(5.0)</span>
                  </div>

                  {/* Descripción */}
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    minHeight: '60px'
                  }}>
                    Equipos de protección personal y seguridad industrial
                  </p>

                  {/* Info adicional */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-box" style={{ color: '#0446F0', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>200+ productos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-truck-fast" style={{ color: '#10B981', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>24-48h</span>
                    </div>
                  </div>

                  {/* Especialidades */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>EPP</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Cascos</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Guantes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MTM Card */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="200">
              <div
                className="card h-100 text-center"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e8e8e8',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(4, 70, 240, 0.12)';
                  e.currentTarget.style.borderColor = '#0446F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = '#e8e8e8';
                }}
              >
                {/* Badge de Años de Experiencia */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(4, 70, 240, 0.3)'
                }}>
                  <i className="fas fa-award" style={{ fontSize: '10px' }}></i>
                  15+ años
                </div>

                <div style={{ padding: '24px 20px 20px' }}>
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    minHeight: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image
                      src="/img/providers/mtm.png"
                      alt="MTM"
                      width={220}
                      height={110}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <h5 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    MTM
                  </h5>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star" style={{ color: '#FFC107', fontSize: '14px' }}></i>
                    ))}
                    <span style={{ fontSize: '13px', color: '#666', marginLeft: '6px' }}>(4.9)</span>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    minHeight: '60px'
                  }}>
                    Refacciones hidráulicas e industriales especializadas
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-box" style={{ color: '#0446F0', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>350+ productos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-truck-fast" style={{ color: '#10B981', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>48-72h</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Hidráulica</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Sellos</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Mangueras</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pumping Team Card */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="300">
              <div
                className="card h-100 text-center"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e8e8e8',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(4, 70, 240, 0.12)';
                  e.currentTarget.style.borderColor = '#0446F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = '#e8e8e8';
                }}
              >
                {/* Badge de Entregas Rápidas */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}>
                  <i className="fas fa-bolt" style={{ fontSize: '10px' }}></i>
                  Envío Express
                </div>

                <div style={{ padding: '24px 20px 20px' }}>
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    minHeight: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image
                      src="/img/providers/pumping-team.png"
                      alt="Pumping Team"
                      width={220}
                      height={110}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <h5 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    Pumping Team
                  </h5>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star" style={{ color: '#FFC107', fontSize: '14px' }}></i>
                    ))}
                    <span style={{ fontSize: '13px', color: '#666', marginLeft: '6px' }}>(5.0)</span>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    minHeight: '60px'
                  }}>
                    Bombas y sistemas de bombeo para toda aplicación
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-box" style={{ color: '#0446F0', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>180+ productos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-truck-fast" style={{ color: '#10B981', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>12-24h</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Bombas</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Sumergibles</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Centrífugas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plásticos Torres Card */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up" data-aos-delay="400">
              <div
                className="card h-100 text-center"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  border: '1px solid #e8e8e8',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(4, 70, 240, 0.12)';
                  e.currentTarget.style.borderColor = '#0446F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = '#e8e8e8';
                }}
              >
                {/* Badge de Garantía */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}>
                  <i className="fas fa-shield-check" style={{ fontSize: '10px' }}></i>
                  Garantía 2 años
                </div>

                <div style={{ padding: '24px 20px 20px' }}>
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    minHeight: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image
                      src="/img/providers/plasticos-torres.png"
                      alt="Plásticos Torres"
                      width={220}
                      height={110}
                      unoptimized
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <h5 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px'
                  }}>
                    Plásticos Torres
                  </h5>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star" style={{ color: '#FFC107', fontSize: '14px' }}></i>
                    ))}
                    <span style={{ fontSize: '13px', color: '#666', marginLeft: '6px' }}>(4.8)</span>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    minHeight: '60px'
                  }}>
                    Iluminación LED industrial y comercial
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-box" style={{ color: '#0446F0', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>150+ productos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-truck-fast" style={{ color: '#10B981', fontSize: '12px' }}></i>
                      <span style={{ fontSize: '12px', color: '#666' }}>24-48h</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>LED</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Plafones</span>
                    <span style={{
                      background: 'rgba(4, 70, 240, 0.08)',
                      color: '#0446F0',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>Luminarias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="features__area features__area-amci py-100"
        style={{
          background: 'linear-gradient(to right, rgba(120, 125, 130, 0.5) 0%, rgba(226, 228, 230, 0.3) 50%, rgba(120, 125, 130, 0.5) 100%)',
          position: 'relative'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__title text-center mb-30" data-aos="fade-up">
                <h2 className="section__title-main" style={{ marginBottom: '12px' }}>¿Por qué elegir AMCI?</h2>
                <p className="section__subtitle">Facilitamos tus compras industriales con un servicio integral y confiable</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Proveedores Certificados */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.borderColor = '#10B981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.25)'
                }}>
                  <i className="fal fa-shield-check" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Proveedores Certificados
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Todos nuestros proveedores están certificados y cumplen con los más altos estándares de calidad.
                </p>
              </div>
            </div>

            {/* Pagos Seguros */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="150">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(4, 70, 240, 0.15)';
                  e.currentTarget.style.borderColor = '#0446F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(4, 70, 240, 0.25)'
                }}>
                  <i className="fal fa-credit-card" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Pagos Seguros
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Procesamos pagos de forma centralizada y segura, con dispersión programada a proveedores.
                </p>
              </div>
            </div>

            {/* Envío y Seguimiento */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(245, 158, 11, 0.15)';
                  e.currentTarget.style.borderColor = '#F59E0B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(245, 158, 11, 0.25)'
                }}>
                  <i className="fal fa-truck" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Envío y Seguimiento
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Recibe actualizaciones en tiempo real del estado de tu pedido desde la compra hasta la entrega.
                </p>
              </div>
            </div>

            {/* Facturación Flexible */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="250">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.borderColor = '#8B5CF6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(139, 92, 246, 0.25)'
                }}>
                  <i className="fal fa-file-invoice-dollar" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Facturación Flexible
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Recibe facturas de AMCI o directamente del proveedor según el producto seleccionado.
                </p>
              </div>
            </div>

            {/* Soporte Especializado */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(236, 72, 153, 0.15)';
                  e.currentTarget.style.borderColor = '#EC4899';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(236, 72, 153, 0.25)'
                }}>
                  <i className="fal fa-headset" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Soporte Especializado
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Nuestro equipo te acompaña en todo el proceso, desde la cotización hasta el postventa.
                </p>
              </div>
            </div>

            {/* Reportes Detallados */}
            <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="350">
              <div
                className="card h-100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(6, 182, 212, 0.15)';
                  e.currentTarget.style.borderColor = '#06B6D4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(232, 232, 232, 0.5)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 8px 16px rgba(6, 182, 212, 0.25)'
                }}>
                  <i className="fal fa-chart-line" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  Reportes Detallados
                </h4>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Accede a reportes completos de tus compras y gestiona fácilmente tu historial de pedidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <style jsx>{`
        @keyframes ctaPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 40px rgba(4, 70, 240, 0.25);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 16px 50px rgba(4, 70, 240, 0.35);
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .cta-animated {
          animation: ctaPulse 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .cta-animated::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 4s infinite;
          animation-delay: 1s;
        }

        .cta-button-primary {
          animation: buttonPulse 2s ease-in-out infinite;
        }
      `}</style>
      <section
        className="cta__area"
        style={{
          background: '#ffffff',
          position: 'relative',
          paddingTop: '60px',
          paddingBottom: '60px'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="cta__content cta-animated"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(4, 70, 240, 0.95) 0%, rgba(3, 56, 192, 0.98) 25%, rgba(1, 31, 92, 1) 100%)',
                  borderRadius: '24px',
                  padding: '40px 60px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '40px',
                  flexWrap: 'wrap'
                }}
                data-aos="fade-up"
              >
                {/* Left content */}
                <div className="cta-content-wrapper">
                  <div className="cta-icon-box">
                    <i className="fal fa-rocket"></i>
                  </div>
                  <div className="cta-text-box">
                    <h2 className="cta__title">
                      ¿Listo para comenzar?
                    </h2>
                    <p className="cta__description">
                      Explora nuestro catálogo y encuentra exactamente lo que necesitas para tu empresa.
                    </p>
                  </div>
                </div>

                {/* Right buttons */}
                <div className="cta__buttons">
                  <Link
                    href="/catalogo"
                    className="cta-button-primary"
                    style={{
                      background: '#ffffff',
                      color: '#0446F0',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <i className="fal fa-shopping-cart"></i>
                    Ver Catálogo Completo
                  </Link>
                  <Link
                    href="/contact"
                    className="cta-button-secondary"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fal fa-envelope"></i>
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