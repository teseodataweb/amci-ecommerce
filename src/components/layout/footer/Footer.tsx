import React from "react";
import Link from "next/link";
import AmciLogo from "@/components/layout/brand/AmciLogo";

const Footer = () => {
  return (
    <footer>
      <style jsx>{`
        @keyframes socialPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 8px rgba(4, 70, 240, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(4, 70, 240, 0.3);
          }
        }

        .footer-social-icon {
          width: 44px;
          height: 44px;
          background: rgba(4, 70, 240, 0.1);
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #4E9EFF;
          font-size: 18px;
          transition: all 0.3s ease;
          border: 1px solid rgba(4, 70, 240, 0.2);
        }

        .footer-social-icon:hover {
          background: #0446F0;
          border-color: #0446F0;
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(4, 70, 240, 0.3);
        }

        .footer-link-item {
          transition: all 0.3s ease;
          color: #ffffff;
          display: inline-block;
        }

        .footer-link-item:hover {
          color: #4E9EFF;
          transform: translateX(4px);
        }

        .footer-contact-item {
          transition: all 0.3s ease;
        }

        .footer-contact-item:hover {
          color: #4E9EFF;
          transform: translateX(4px);
        }
      `}</style>
      <section
        className="footer__border footer__amci p-relative z-index-11"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(10, 15, 30, 1) 100%)',
          paddingTop: '60px',
          paddingBottom: '30px'
        }}
      >
        <div className="footer__style-3">
          <div className="container">
            <div className="footer__inner mb-30">
              <div className="row">
                <div className="col-xl-5 col-lg-4 col-md-5 col-sm-6">
                  <div className="footer__widget mb-40">
                    <div className="footer__logo mb-30">
                      <AmciLogo size="medium" variant="white" />
                    </div>
                    <div className="footer__contact footer__contact-amci mb-30">
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        marginBottom: '24px'
                      }}>
                        Tu socio confiable en suministros industriales
                      </p>
                      <div
                        className="footer-contact-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '16px'
                        }}>
                          <i className="fal fa-map-marker-alt"></i>
                        </div>
                        <span>Ciudad de México, México</span>
                      </div>
                      <div
                        className="footer-contact-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '16px'
                        }}>
                          <i className="fal fa-envelope"></i>
                        </div>
                        <span>soporte@amci.com</span>
                      </div>
                      <div
                        className="footer-contact-item"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px'
                        }}
                      >
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '16px'
                        }}>
                          <i className="fal fa-phone"></i>
                        </div>
                        <span>+52 55 1234 5678</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                      <Link
                        href="/"
                        className="footer-social-icon"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '18px',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(4, 70, 240, 0.2)',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0446F0';
                          e.currentTarget.style.borderColor = '#0446F0';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(4, 70, 240, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(4, 70, 240, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.2)';
                          e.currentTarget.style.color = '#4E9EFF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                      <Link
                        href="/"
                        className="footer-social-icon"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '18px',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(4, 70, 240, 0.2)',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0446F0';
                          e.currentTarget.style.borderColor = '#0446F0';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(4, 70, 240, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(4, 70, 240, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.2)';
                          e.currentTarget.style.color = '#4E9EFF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                      <Link
                        href="/"
                        className="footer-social-icon"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '18px',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(4, 70, 240, 0.2)',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0446F0';
                          e.currentTarget.style.borderColor = '#0446F0';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(4, 70, 240, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(4, 70, 240, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.2)';
                          e.currentTarget.style.color = '#4E9EFF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                      <Link
                        href="/"
                        className="footer-social-icon"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'rgba(4, 70, 240, 0.1)',
                          borderRadius: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4E9EFF',
                          fontSize: '18px',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(4, 70, 240, 0.2)',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0446F0';
                          e.currentTarget.style.borderColor = '#0446F0';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(4, 70, 240, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(4, 70, 240, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(4, 70, 240, 0.2)';
                          e.currentTarget.style.color = '#4E9EFF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                  <div className="footer__widget footer__col-1 mb-40">
                    <div className="footer__title" style={{ marginBottom: '28px' }}>
                      <h3 style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '700',
                        marginBottom: 0
                      }}>Empresa</h3>
                    </div>
                    <div className="footer__link">
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/about" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Nosotros</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/catalogo" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Catálogo</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/contact" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Contacto</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/panel/proveedor" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Ser Proveedor</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                  <div className="footer__widget footer__col-5 mb-40">
                    <div className="footer__title" style={{ marginBottom: '28px' }}>
                      <h3 style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '700',
                        marginBottom: 0
                      }}>Soporte</h3>
                    </div>
                    <div className="footer__link">
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/panel/cliente" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Mi Cuenta</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/ordenes" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Mis Órdenes</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/contact" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Ayuda</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/carrito" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Carrito</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6">
                  <div className="footer__widget footer__col-6 mb-40">
                    <div className="footer__title" style={{ marginBottom: '28px' }}>
                      <h3 style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: '700',
                        marginBottom: 0
                      }}>Legal</h3>
                    </div>
                    <div className="footer__link">
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/terminos" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Términos y Condiciones</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/privacidad" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Política de Privacidad</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                          <Link href="/disclaimer" className="footer-link-item" style={{ textDecoration: 'none', fontSize: '14px', color: '#ffffff' }}>Exención de Responsabilidad</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div
                  className="footer__copyright"
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '24px',
                    marginTop: '20px'
                  }}
                >
                  <div className="copyright__text text-center">
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}>
                      Copyright © 2024 AMCI - Suministros Industriales. Todos los derechos reservados.
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '24px',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <Link
                        href="/terminos"
                        className="footer-link-item"
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '13px'
                        }}
                      >
                        Términos
                      </Link>
                      <Link
                        href="/privacidad"
                        className="footer-link-item"
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '13px'
                        }}
                      >
                        Privacidad
                      </Link>
                      <Link
                        href="/disclaimer"
                        className="footer-link-item"
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          fontSize: '13px'
                        }}
                      >
                        Disclaimer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
