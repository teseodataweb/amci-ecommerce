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