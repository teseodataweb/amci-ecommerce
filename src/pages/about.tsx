import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

const About = () => {
  const [counters, setCounters] = useState({
    proveedores: 0,
    productos: 0,
    tiempo: 0,
    satisfaccion: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 3500; // 3.5 segundos
    const steps = 60;
    const increment = duration / steps;

    const targets = {
      proveedores: 4,
      productos: 100,
      tiempo: 24,
      satisfaccion: 100
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3); // Easing function

      setCounters({
        proveedores: Math.round(targets.proveedores * easeOutQuad),
        productos: Math.round(targets.productos * easeOutQuad),
        tiempo: Math.round(targets.tiempo * easeOutQuad),
        satisfaccion: Math.round(targets.satisfaccion * easeOutQuad)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets); // Asegurar valores exactos al final
      }
    }, increment);
  };

  return (
    <Layout header={1} footer={1}>
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes missionPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes blobFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }

        @keyframes rotate360 {
          from {
            transform: rotate(30deg);
          }
          to {
            transform: rotate(390deg);
          }
        }

        @keyframes counterRotate360 {
          from {
            transform: translate(-50%, -50%) rotate(-30deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-390deg);
          }
        }

        @keyframes counterRotate360Slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-12px) translateX(3px);
          }
        }

        @keyframes wobble {
          0%, 100% {
            transform: rotate(-20deg);
          }
          25% {
            transform: rotate(-25deg) scale(1.02);
          }
          50% {
            transform: rotate(-15deg) scale(0.98);
          }
          75% {
            transform: rotate(-23deg) scale(1.01);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes flowDown {
          0% {
            top: 23%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 50%;
            opacity: 0;
          }
        }

        @keyframes flowRight {
          0% {
            left: 50%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 77%;
            opacity: 0;
          }
        }

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
      `}} />

      {/* Hero/Breadcrumb Section - Rediseñado */}
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
        <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '100px' }}>
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
      </section>
      
      {/* Company Overview Section - Rediseñado */}
      <section
        className="about__area py-100"
        style={{
          background: '#ffffff',
          position: 'relative'
        }}
      >
        <div className="container">
          {/* Header en 2 columnas */}
          <div className="row align-items-center mb-60">
            {/* Columna izquierda - Texto */}
            <div className="col-xl-7 col-lg-6 mb-4 mb-lg-0" style={{ paddingRight: 'clamp(2rem, 5vw, 5rem)' }}>
              <div>
                <span
                  data-aos="fade-right"
                  data-aos-duration="800"
                  data-aos-delay="100"
                  style={{
                    display: 'inline-block',
                    color: '#0446F0',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '16px'
                  }}
                >
                  Quiénes Somos
                </span>
                <h2
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  style={{
                    fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    lineHeight: '1.3',
                    marginBottom: '20px'
                  }}
                >
                  Conectamos empresas con los mejores proveedores industriales
                </h2>
                <p
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="350"
                  style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.8',
                    margin: 0
                  }}
                >
                  Facilitamos la adquisición de equipos y suministros industriales de calidad, conectando empresas con proveedores certificados.
                </p>
              </div>
            </div>

            {/* Columna derecha - Card de enfoque */}
            <div className="col-xl-5 col-lg-6">
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="100"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
                  border: '1px solid rgba(232, 232, 232, 0.5)',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  textAlign: 'center'
                }}
              >
                {/* Icono azul */}
                <div
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 20px rgba(4, 70, 240, 0.25)'
                  }}
                >
                  <i className="fal fa-rocket-launch" style={{ fontSize: '32px', color: '#ffffff' }}></i>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="600"
                  style={{
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #0446F0 0%, #10B981 100%)',
                    borderRadius: '2px',
                    margin: '0 auto 20px'
                  }}
                ></div>
                <p
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="700"
                  style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    lineHeight: '1.8',
                    margin: 0,
                    fontWeight: '500'
                  }}
                >
                  Nuestro enfoque se centra en <strong>simplificar el proceso de compra</strong>, desde la cotización hasta
                  la entrega, garantizando <strong>transparencia en precios</strong>, calidad en productos y <strong>excelencia en servicio</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas destacadas - Diseño Innovador */}
          <div className="row g-4 mb-60 justify-content-center" ref={statsRef}>
            {/* Stat 1 - Proveedores */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100" style={{ flex: '0 0 auto', width: 'calc(25% - 1.5rem)', maxWidth: 'calc(25% - 1.5rem)' }}>
              <div
                style={{
                  position: 'relative',
                  padding: '28px 20px',
                  minHeight: '190px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '100%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(-8px) scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '60%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Número gigante de fondo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-5px',
                    transform: 'translateY(-50%)',
                    fontSize: '90px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, rgba(4, 70, 240, 0.04) 0%, rgba(3, 56, 192, 0.08) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {counters.proveedores}
                </div>

                {/* Línea de acento lateral */}
                <div
                  className="accent-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '5px',
                    height: '60%',
                    background: 'linear-gradient(180deg, #0446F0 0%, #0338C0 100%)',
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 0 20px rgba(4, 70, 240, 0.5)'
                  }}
                ></div>

                {/* Contenido */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Icono flotante */}
                  <i
                    className="fal fa-shield-check stat-icon"
                    style={{
                      fontSize: '36px',
                      background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '16px',
                      filter: 'drop-shadow(0 4px 8px rgba(4, 70, 240, 0.3))',
                      transition: 'all 0.4s ease'
                    }}
                  ></i>

                  {/* Número visible */}
                  <h3
                    style={{
                      fontSize: '46px',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '10px',
                      lineHeight: '1',
                      letterSpacing: '-1px'
                    }}
                  >
                    {counters.proveedores}+
                  </h3>

                  {/* Texto descriptivo */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      lineHeight: '1.5'
                    }}
                  >
                    Proveedores<br />Certificados
                  </p>
                </div>
              </div>
            </div>

            {/* Stat 2 - Productos */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200" style={{ flex: '0 0 auto', width: 'calc(25% - 1.5rem)', maxWidth: 'calc(25% - 1.5rem)' }}>
              <div
                style={{
                  position: 'relative',
                  padding: '28px 20px',
                  minHeight: '190px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '100%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(-8px) scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '60%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Número gigante de fondo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-8px',
                    transform: 'translateY(-50%)',
                    fontSize: '90px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(5, 150, 105, 0.08) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {counters.productos}
                </div>

                {/* Línea de acento lateral */}
                <div
                  className="accent-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '5px',
                    height: '60%',
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
                  }}
                ></div>

                {/* Contenido */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Icono flotante */}
                  <i
                    className="fal fa-box-open stat-icon"
                    style={{
                      fontSize: '36px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '16px',
                      filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))',
                      transition: 'all 0.4s ease'
                    }}
                  ></i>

                  {/* Número visible */}
                  <h3
                    style={{
                      fontSize: '46px',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '10px',
                      lineHeight: '1',
                      letterSpacing: '-1px'
                    }}
                  >
                    {counters.productos}+
                  </h3>

                  {/* Texto descriptivo */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      lineHeight: '1.5'
                    }}
                  >
                    Productos<br />Disponibles
                  </p>
                </div>
              </div>
            </div>

            {/* Stat 3 - Tiempo */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300" style={{ flex: '0 0 auto', width: 'calc(25% - 1.5rem)', maxWidth: 'calc(25% - 1.5rem)' }}>
              <div
                style={{
                  position: 'relative',
                  padding: '28px 20px',
                  minHeight: '190px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '100%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(-8px) scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '60%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Número gigante de fondo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-5px',
                    transform: 'translateY(-50%)',
                    fontSize: '90px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(217, 119, 6, 0.08) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {counters.tiempo}
                </div>

                {/* Línea de acento lateral */}
                <div
                  className="accent-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '5px',
                    height: '60%',
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
                  }}
                ></div>

                {/* Contenido */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Icono flotante */}
                  <i
                    className="fal fa-truck-fast stat-icon"
                    style={{
                      fontSize: '36px',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '16px',
                      filter: 'drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3))',
                      transition: 'all 0.4s ease'
                    }}
                  ></i>

                  {/* Número visible */}
                  <h3
                    style={{
                      fontSize: '46px',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '10px',
                      lineHeight: '1',
                      letterSpacing: '-1px'
                    }}
                  >
                    {counters.tiempo}h
                  </h3>

                  {/* Texto descriptivo */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      lineHeight: '1.5'
                    }}
                  >
                    Tiempo de<br />Respuesta
                  </p>
                </div>
              </div>
            </div>

            {/* Stat 4 - Satisfacción */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400" style={{ flex: '0 0 auto', width: 'calc(25% - 1.5rem)', maxWidth: 'calc(25% - 1.5rem)' }}>
              <div
                style={{
                  position: 'relative',
                  padding: '28px 20px',
                  minHeight: '190px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '100%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(-8px) scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  const line = e.currentTarget.querySelector('.accent-line') as HTMLElement;
                  if (line) line.style.height = '60%';
                  const icon = e.currentTarget.querySelector('.stat-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Número gigante de fondo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-8px',
                    transform: 'translateY(-50%)',
                    fontSize: '90px',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, rgba(124, 58, 237, 0.08) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {counters.satisfaccion}
                </div>

                {/* Línea de acento lateral */}
                <div
                  className="accent-line"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '5px',
                    height: '60%',
                    background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)',
                    borderRadius: '0 8px 8px 0',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                  }}
                ></div>

                {/* Contenido */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Icono flotante */}
                  <i
                    className="fal fa-bullseye-arrow stat-icon"
                    style={{
                      fontSize: '36px',
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      marginBottom: '16px',
                      filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))',
                      transition: 'all 0.4s ease'
                    }}
                  ></i>

                  {/* Número visible */}
                  <h3
                    style={{
                      fontSize: '46px',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '10px',
                      lineHeight: '1',
                      letterSpacing: '-1px'
                    }}
                  >
                    {counters.satisfaccion}%
                  </h3>

                  {/* Texto descriptivo */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#1a1a1a',
                      margin: 0,
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      lineHeight: '1.5'
                    }}
                  >
                    Satisfacción<br />Cliente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Rediseñado */}
      <section
        className="mission__area"
        style={{
          background: 'linear-gradient(to right, rgba(120, 125, 130, 0.5) 0%, rgba(226, 228, 230, 0.3) 50%, rgba(120, 125, 130, 0.5) 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '100px 0'
        }}
      >
        {/* Elementos decorativos de fondo - Solo 2 gradientes sutiles */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '-100px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(4, 70, 240, 0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        ></div>

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '-80px',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(78, 158, 255, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(70px)',
            pointerEvents: 'none'
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Header centrado con decoración */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center" style={{ marginBottom: '30px', position: 'relative' }}>
                <span
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="100"
                  style={{
                    display: 'inline-block',
                    color: '#0446F0',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '16px'
                  }}
                >
                  Nuestra Misión
                </span>

                <h2
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  style={{
                    fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    lineHeight: '1.3',
                    maxWidth: '900px',
                    margin: '0 auto'
                  }}
                >
                  Transformar la industria a través de conexiones estratégicas
                </h2>
              </div>
            </div>
          </div>

          {/* Contenido principal sin cards */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Descripción principal */}
              <p
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
                style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  textAlign: 'center',
                  maxWidth: '900px',
                  margin: '0 auto 60px',
                  fontWeight: '400'
                }}
              >
                Ser el puente que conecta empresas con proveedores industriales de excelencia,
                facilitando acceso a equipos y suministros de calidad mediante una plataforma
                transparente, eficiente y confiable que impulse el crecimiento de la industria.
              </p>

              {/* Features como elementos simples inline */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 'clamp(40px, 8vw, 80px)',
                  position: 'relative'
                }}
              >
                {/* Línea conectora entre características */}
                <svg
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '2px',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                >
                  <line
                    x1="20%"
                    y1="1"
                    x2="80%"
                    y2="1"
                    stroke="rgba(4, 70, 240, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Feature 1 */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="400"
                  style={{
                    textAlign: 'center',
                    maxWidth: '200px'
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #0446F0 0%, #1e40af 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      boxShadow: '0 12px 30px rgba(4, 70, 240, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(4, 70, 240, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(4, 70, 240, 0.3)';
                    }}
                  >
                    <i className="fal fa-link" style={{ fontSize: '32px', color: '#ffffff' }}></i>
                  </div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '12px'
                    }}
                  >
                    Acceso Simplificado
                  </h4>
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0
                    }}
                  >
                    Conecta fácilmente con los mejores proveedores
                  </p>
                </div>

                {/* Feature 2 */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="500"
                  style={{
                    textAlign: 'center',
                    maxWidth: '200px'
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #1e40af 0%, #0d1b3e 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      boxShadow: '0 12px 30px rgba(30, 64, 175, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 64, 175, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 64, 175, 0.3)';
                    }}
                  >
                    <i className="fal fa-eye" style={{ fontSize: '32px', color: '#ffffff' }}></i>
                  </div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '12px'
                    }}
                  >
                    Transparencia Total
                  </h4>
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0
                    }}
                  >
                    Precios claros y proceso visible
                  </p>
                </div>

                {/* Feature 3 */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                  style={{
                    textAlign: 'center',
                    maxWidth: '200px'
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #4e9eff 0%, #0446F0 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      boxShadow: '0 12px 30px rgba(78, 158, 255, 0.35)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(78, 158, 255, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(78, 158, 255, 0.35)';
                    }}
                  >
                    <i className="fal fa-shield-check" style={{ fontSize: '32px', color: '#ffffff' }}></i>
                  </div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '12px'
                    }}
                  >
                    Calidad Garantizada
                  </h4>
                  <p
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0
                    }}
                  >
                    Proveedores certificados y confiables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Our Values Section - Rediseñado */}
      <section
        className="values__area"
        style={{
          background: 'linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          padding: '100px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Elementos decorativos de fondo */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(4, 70, 240, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-8%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        ></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="text-center" style={{ marginBottom: '60px' }}>
                <span
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="100"
                  style={{
                    display: 'inline-block',
                    color: '#0446F0',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '16px'
                  }}
                >
                  Nuestros Valores
                </span>
                <h2
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  style={{
                    fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    lineHeight: '1.3',
                    marginBottom: '20px'
                  }}
                >
                  Los principios que nos definen
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="300"
                  style={{
                    fontSize: '18px',
                    color: '#666',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                  }}
                >
                  Valores que guían cada una de nuestras acciones y decisiones
                </p>
              </div>
            </div>
          </div>

          {/* Cards de valores */}
          <div className="row g-4">
            {/* Valor 1 - Confianza */}
            <div className="col-xl-4 col-md-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="100"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(4, 70, 240, 0.1)',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  height: '100%',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(4, 70, 240, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.3)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.1)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {/* Gradiente decorativo superior */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #0446F0 0%, #0338C0 100%)',
                    borderRadius: '24px 24px 0 0'
                  }}
                ></div>

                {/* Icono */}
                <div
                  className="value-icon"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    boxShadow: '0 10px 30px rgba(4, 70, 240, 0.25)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <i className="fal fa-handshake" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>

                {/* Título */}
                <h4
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}
                >
                  Confianza
                </h4>

                {/* Descripción */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.8',
                    margin: 0,
                    textAlign: 'center'
                  }}
                >
                  Construimos relaciones sólidas basadas en transparencia, honestidad y cumplimiento de compromisos.
                </p>
              </div>
            </div>

            {/* Valor 2 - Calidad */}
            <div className="col-xl-4 col-md-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="250"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  height: '100%',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {/* Gradiente decorativo superior */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                    borderRadius: '24px 24px 0 0'
                  }}
                ></div>

                {/* Icono */}
                <div
                  className="value-icon"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.25)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <i className="fal fa-award" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>

                {/* Título */}
                <h4
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}
                >
                  Calidad
                </h4>

                {/* Descripción */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.8',
                    margin: 0,
                    textAlign: 'center'
                  }}
                >
                  Trabajamos únicamente con proveedores que cumplen con los más altos estándares de calidad y certificación.
                </p>
              </div>
            </div>

            {/* Valor 3 - Innovación */}
            <div className="col-xl-4 col-md-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(245, 158, 11, 0.1)',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  height: '100%',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.1)';
                  const icon = e.currentTarget.querySelector('.value-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {/* Gradiente decorativo superior */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                    borderRadius: '24px 24px 0 0'
                  }}
                ></div>

                {/* Icono */}
                <div
                  className="value-icon"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 28px',
                    boxShadow: '0 10px 30px rgba(245, 158, 11, 0.25)',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <i className="fal fa-rocket" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                </div>

                {/* Título */}
                <h4
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}
                >
                  Innovación
                </h4>

                {/* Descripción */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.8',
                    margin: 0,
                    textAlign: 'center'
                  }}
                >
                  Utilizamos tecnología para mejorar continuamente la experiencia de compra y gestión de pedidos.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA - Rediseñado */}
          <div className="row" style={{ marginTop: '80px' }}>
            <div className="col-12">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="100"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(4, 70, 240, 0.95) 0%, rgba(3, 56, 192, 0.98) 25%, rgba(1, 31, 92, 1) 100%)',
                  borderRadius: '24px',
                  padding: 'clamp(40px, 6vw, 50px) clamp(30px, 5vw, 60px)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(4, 70, 240, 0.25)'
                }}
              >
                {/* Elementos decorativos de fondo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    pointerEvents: 'none'
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-8%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(50px)',
                    pointerEvents: 'none'
                  }}
                ></div>

                {/* Patrón de puntos decorativos */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '30px',
                    width: '80px',
                    height: '80px',
                    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 2px, transparent 2px)',
                    backgroundSize: '15px 15px',
                    opacity: 0.5,
                    pointerEvents: 'none'
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '40px',
                    width: '100px',
                    height: '100px',
                    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 2px, transparent 2px)',
                    backgroundSize: '15px 15px',
                    opacity: 0.4,
                    pointerEvents: 'none'
                  }}
                ></div>

                <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
                  {/* Columna izquierda - Icono decorativo */}
                  <div className="col-lg-3 mb-4 mb-lg-0 text-center text-lg-start">
                    <div
                      data-aos="zoom-in"
                      data-aos-duration="1000"
                      data-aos-delay="300"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '30px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <i className="fal fa-envelope-open-text" style={{ fontSize: '50px', color: '#ffffff' }}></i>
                    </div>
                  </div>

                  {/* Columna central - Contenido */}
                  <div className="col-lg-6 mb-4 mb-lg-0 text-center text-lg-start">
                    <h3
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="400"
                      style={{
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontWeight: '800',
                        color: '#ffffff',
                        marginBottom: '16px',
                        lineHeight: '1.3',
                        textShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      ¿Tienes alguna pregunta?
                    </h3>
                    <p
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="500"
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.95)',
                        marginBottom: 0,
                        lineHeight: '1.7',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      Nuestro equipo está disponible para ayudarte con cualquier consulta sobre productos, proveedores o el proceso de compra.
                    </p>
                  </div>

                  {/* Columna derecha - Botón */}
                  <div className="col-lg-3 text-center text-lg-end">
                    <div
                      data-aos="fade-left"
                      data-aos-duration="1000"
                      data-aos-delay="600"
                    >
                      <Link
                        href="/contact"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: '#ffffff',
                          color: '#0446F0',
                          padding: '16px 32px',
                          borderRadius: '50px',
                          fontSize: '16px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          boxShadow: '0 8px 30px rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease',
                          border: '2px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 255, 255, 0.4)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.background = '#ffffff';
                        }}
                      >
                        <i className="fal fa-paper-plane" style={{ fontSize: '18px' }}></i>
                        <span>Contáctanos</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
