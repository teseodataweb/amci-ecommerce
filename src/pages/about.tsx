import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

const About = () => {
  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Acerca de AMCI"
        subtitle="Tu socio confiable en suministros industriales"
        bg="bg-primary"
      />
      
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
