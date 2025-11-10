import React from "react";
import Link from "next/link";

interface CatalogHeroProps {
  totalProducts: number;
  totalProviders: number;
  totalCategories?: number;
}

const CatalogHero: React.FC<CatalogHeroProps> = ({
  totalProducts,
  totalProviders,
  totalCategories = 0
}) => {
  return (
    <section
      className="catalog-hero"
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Overlay con gradiente radial - mismo estilo que "Nosotros" */}
      <div
        className="catalog-hero__overlay"
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
        <div className="particle-catalog particle-catalog-1"></div>
        <div className="particle-catalog particle-catalog-2"></div>
        <div className="particle-catalog particle-catalog-3"></div>

        {/* Círculos decorativos grandes */}
        <div className="catalog-shape catalog-shape-1"></div>
        <div className="catalog-shape catalog-shape-2"></div>
      </div>

      {/* Contenido */}
      <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="row">
          <div className="col-12">
            <div className="catalog-hero__content" style={{ textAlign: 'center' }}>
              {/* Breadcrumb mejorado - estilo "Nosotros" */}
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
                    <i className="fal fa-box-open" style={{ fontSize: '15px' }}></i>
                    <span>Catálogo</span>
                  </span>
                </div>
              </nav>

              {/* Título con glow effect */}
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
                  className="hero-text-glow-catalog"
                  style={{
                    color: '#ffffff',
                    fontWeight: '700'
                  }}
                >
                  Catálogo de Productos
                </span>
              </h1>

              {/* Subtítulo */}
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
                Descubre nuestra amplia selección de materiales de construcción de proveedores certificados
              </p>

              {/* Statistics Bar - estilo simplificado */}
              <div
                className="catalog-hero__stats"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="1200"
              >
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-box-open"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{totalProducts.toLocaleString('es-MX')}</div>
                    <div className="stat-label">Productos disponibles</div>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-industry"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{totalProviders}</div>
                    <div className="stat-label">Proveedores certificados</div>
                  </div>
                </div>

                {totalCategories > 0 && (
                  <>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <div className="stat-icon">
                        <i className="fas fa-tags"></i>
                      </div>
                      <div className="stat-content">
                        <div className="stat-number">{totalCategories}</div>
                        <div className="stat-label">Categorías</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogHero;
