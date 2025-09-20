import React from "react";
import Link from "next/link";
import AmciLogo from "@/components/layout/brand/AmciLogo";

const Footer = () => {
  return (
    <footer>
      <section className="footer__border p-relative z-index-11 pt-120 pb-55 foot-one-bg">
        <div className="footer__style-3">
          <span className="footer__cercle"></span>
          <div className="container">
            <div className="footer__inner mb-50">
              <div className="row">
                <div className="col-xl-5 col-lg-4 col-md-5 col-sm-6">
                  <div className="footer__widget mb-55">
                    <div className="footer__logo mb-20">
                      <AmciLogo size="small" />
                    </div>
                    <div className="footer__contact mb-30">
                      <span>AMCI - Suministros Industriales</span>
                      <span>Ciudad de México, México</span>
                      <span>soporte@amci.com</span>
                      <span>+52 55 1234 5678</span>
                    </div>
                    <div className="touch__social">
                      <Link href="/">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                      <Link href="/">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                      <Link href="/">
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                      <Link href="/">
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                  <div className="footer__widget footer__col-1 mb-55">
                    <div className="footer__title">
                      <h3>Empresa</h3>
                    </div>
                    <div className="footer__link">
                      <ul>
                        <li>
                          <Link href="/about">Nosotros</Link>
                        </li>
                        <li>
                          <Link href="/catalogo">Catálogo</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contacto</Link>
                        </li>
                        <li>
                          <Link href="/panel/proveedor">Ser Proveedor</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                  <div className="footer__widget footer__col-5 mb-55">
                    <div className="footer__title">
                      <h3>Soporte</h3>
                    </div>
                    <div className="footer__link">
                      <ul>
                        <li>
                          <Link href="/panel/cliente">Mi Cuenta</Link>
                        </li>
                        <li>
                          <Link href="/ordenes">Mis Órdenes</Link>
                        </li>
                        <li>
                          <Link href="/contact">Ayuda</Link>
                        </li>
                        <li>
                          <Link href="/carrito">Carrito</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6">
                  <div className="footer__widget footer__col-6 mb-55">
                    <div className="footer__title">
                      <h3>Legal</h3>
                    </div>
                    <div className="footer__link">
                      <ul>
                        <li>
                          <Link href="/terminos">Términos y Condiciones</Link>
                        </li>
                        <li>
                          <Link href="/privacidad">Política de Privacidad</Link>
                        </li>
                        <li>
                          <Link href="/disclaimer">Exención de Responsabilidad</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="footer__copyright">
                  <div className="copyright__text text-center">
                    <p>Copyright © 2024 AMCI - Suministros Industriales. Todos los derechos reservados.</p>
                    <p className="mt-2">
                      <Link href="/terminos" className="text-muted me-3">Términos</Link>
                      <Link href="/privacidad" className="text-muted me-3">Privacidad</Link>
                      <Link href="/disclaimer" className="text-muted">Disclaimer</Link>
                    </p>
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
