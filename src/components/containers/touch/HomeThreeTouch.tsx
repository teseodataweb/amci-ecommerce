import React from "react";
import Link from "next/link";

const HomeThreeTouch = () => {
  return (
    <section
      className="touch__arae touch-bg include__bg pt-120"
      data-background="assets/img/shape/touch-shape.png"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <div className="touch__left mb-60">
              <div className="section__title-wrapper">
                <span className="section__subtitle s-2">
                  <span>Ponte </span>en contacto
                </span>
                <h2 className="section__title s-2 mb-30">
                  <span className="down__mark-line">Hablemos</span> hoy
                </h2>
              </div>
              <p>
                Conectamos empresas con proveedores certificados desde 2010.
                Déjanos ayudarte a encontrar los equipos y suministros industriales
                que necesitas.
              </p>
              <div className="touch__search">
                <form action="#">
                  <input type="text" placeholder="Ingresa tu correo" />
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11.83"
                      height="20.026"
                      viewBox="0 0 11.83 20.026"
                    >
                      <path
                        id="Path_17020"
                        data-name="Path 17020"
                        d="M-3925.578,5558.542l7.623,8.242-7.623,7.543"
                        transform="translate(3927.699 -5556.422)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </button>
                </form>
              </div>
              <div className="touch__social">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div className="touch__contact p-relative">
              <div className="touch__carcle"></div>
              <div className="touch__content-title">
                <h3>Solicita una Cotización</h3>
              </div>
              <form action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Nombre" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Apellido" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Nombre de la Empresa" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Sitio Web (Opcional)" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Presupuesto Estimado" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="text" placeholder="Teléfono" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="touch__input">
                      <input type="email" placeholder="Correo Electrónico" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact__select mb-20">
                      <select>
                        <option value="0">Tipo de Consulta</option>
                        <option value="1">Cotización de Productos</option>
                        <option value="2">Información General</option>
                        <option value="3">Convertirse en Proveedor</option>
                        <option value="4">Soporte Técnico</option>
                        <option value="5">Facturación</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="touch__submit">
                      <div className="sign__action">
                        <input
                          className="e-check-input"
                          type="checkbox"
                          id="sing-up"
                        />
                        <label className="sign__check" htmlFor="sing-up">
                          Acepto los{" "}
                          <span>
                            <Link href="/terminos">Términos</Link> y{" "}
                            <Link href="/privacidad">Condiciones</Link>
                          </span>
                        </label>
                      </div>
                      <div className="touch__btn">
                        <button type="button"></button>
                        <button className="border__btn" type="submit">
                          Enviar Solicitud
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeThreeTouch;
