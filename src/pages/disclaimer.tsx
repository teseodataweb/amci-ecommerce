import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

const Disclaimer = () => {
  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Aviso de Exención de Responsabilidad"
        subtitle="Limitaciones y responsabilidades en el uso de AMCI"
        bg="bg-warning"
      />
      
      <section className="legal__area pt-120 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <div className="legal__content">
                <div className="legal__section mb-5">
                  <p className="text-muted mb-4">
                    <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX')}
                  </p>
                  
                  <div className="alert alert-warning mb-4">
                    <i className="fal fa-exclamation-triangle me-2"></i>
                    <strong>Importante:</strong> Este aviso de exención de responsabilidad forma parte 
                    integral de nuestros términos y condiciones. Al utilizar la plataforma AMCI, 
                    aceptas las limitaciones y exenciones descritas a continuación.
                  </div>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">1. Naturaleza del Servicio</h3>
                  <p className="mb-4">
                    AMCI opera como una plataforma intermediaria que conecta empresas compradoras con 
                    proveedores certificados de equipos y suministros industriales. AMCI no es el 
                    fabricante, distribuidor directo ni vendedor final de los productos ofrecidos 
                    en la plataforma.
                  </p>
                  
                  <h5>1.1 Rol de Intermediario</h5>
                  <p className="mb-3">
                    Nuestro papel se limita a facilitar transacciones entre compradores y proveedores, 
                    procesar pagos de forma centralizada y proporcionar herramientas de gestión de pedidos.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">2. Exención de Responsabilidad por Productos</h3>
                  
                  <h5>2.1 Calidad y Especificaciones</h5>
                  <p className="mb-3">
                    AMCI no garantiza la calidad, funcionalidad, durabilidad o idoneidad de los productos 
                    para un propósito específico. La responsabilidad por estas características recae 
                    directamente en cada proveedor individual.
                  </p>
                  
                  <h5>2.2 Información de Productos</h5>
                  <p className="mb-3">
                    Aunque nos esforzamos por presentar información precisa, AMCI no garantiza la 
                    exactitud, completitud o actualización de las descripciones, especificaciones, 
                    precios o imágenes de productos proporcionadas por los proveedores.
                  </p>
                  
                  <h5>2.3 Disponibilidad</h5>
                  <p className="mb-3">
                    Los productos mostrados están sujetos a disponibilidad real en el inventario del 
                    proveedor. AMCI no garantiza la disponibilidad inmediata de ningún producto.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">3. Limitaciones de Responsabilidad</h3>
                  
                  <h5>3.1 Daños Directos</h5>
                  <p className="mb-3">
                    En ningún caso AMCI será responsable por daños directos que excedan el monto 
                    total pagado por el usuario en la transacción específica que originó el daño.
                  </p>
                  
                  <h5>3.2 Daños Indirectos</h5>
                  <p className="mb-3">
                    AMCI no será responsable por daños indirectos, incidentales, especiales, 
                    consecuenciales o punitivos, incluyendo pero no limitándose a:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Pérdida de ganancias o ingresos</li>
                    <li>Interrupción del negocio</li>
                    <li>Pérdida de datos o información</li>
                    <li>Costos de reemplazo de bienes o servicios</li>
                    <li>Daño a la reputación comercial</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">4. Responsabilidades de Proveedores</h3>
                  <p className="mb-3">
                    Cada proveedor en la plataforma AMCI es directamente responsable de:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>La calidad y conformidad de sus productos</li>
                    <li>El cumplimiento de especificaciones técnicas</li>
                    <li>Los tiempos de entrega prometidos</li>
                    <li>El servicio postventa y garantías</li>
                    <li>El cumplimiento de normativas aplicables</li>
                    <li>La resolución de disputas relacionadas con sus productos</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">5. Envíos y Logística</h3>
                  <p className="mb-3">
                    AMCI no es responsable por:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Retrasos en la entrega causados por el proveedor o paquetería</li>
                    <li>Daños durante el transporte</li>
                    <li>Pérdida de mercancía en tránsito</li>
                    <li>Costos adicionales de almacenaje o reexpedición</li>
                    <li>Restricciones de entrega por ubicación geográfica</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">6. Facturación y Aspectos Fiscales</h3>
                  <p className="mb-3">
                    Cuando AMCI emite facturas, lo hace únicamente como intermediario facilitador. 
                    Los usuarios son responsables de:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Verificar la exactitud de los datos fiscales proporcionados</li>
                    <li>Cumplir con sus obligaciones fiscales correspondientes</li>
                    <li>Validar que los productos adquiridos sean deducibles fiscalmente</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">7. Disponibilidad de la Plataforma</h3>
                  <p className="mb-3">
                    AMCI se esfuerza por mantener la plataforma disponible, pero no garantiza:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Acceso ininterrumpido al servicio</li>
                    <li>Ausencia de errores técnicos</li>
                    <li>Compatibilidad con todos los dispositivos o navegadores</li>
                    <li>Velocidad constante de carga</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">8. Seguridad y Privacidad</h3>
                  <p className="mb-3">
                    Aunque implementamos medidas de seguridad, AMCI no puede garantizar:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Protección absoluta contra ataques cibernéticos</li>
                    <li>Prevención total de acceso no autorizado</li>
                    <li>Integridad completa de datos durante transmisiones</li>
                  </ul>
                  
                  <p className="mb-3">
                    Los usuarios son responsables de mantener seguras sus credenciales de acceso.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">9. Cumplimiento Normativo</h3>
                  <p className="mb-3">
                    Los usuarios son responsables de verificar que los productos adquiridos cumplan 
                    con las normativas específicas aplicables a su industria, ubicación geográfica 
                    y uso previsto.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">10. Resolución de Disputas</h3>
                  <p className="mb-3">
                    AMCI puede facilitar la comunicación entre compradores y proveedores para resolver 
                    disputas, pero no está obligado a hacerlo ni a asumir responsabilidad por el 
                    resultado de tales disputas.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">11. Modificaciones</h3>
                  <p className="mb-3">
                    Este aviso de exención puede ser modificado en cualquier momento. Los cambios 
                    entrarán en vigor inmediatamente después de su publicación en la plataforma.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">12. Contacto</h3>
                  <p className="mb-3">
                    Para consultas sobre este aviso de exención de responsabilidad:
                  </p>
                  <ul className="legal__list">
                    <li><strong>Email:</strong> legal@amci.com</li>
                    <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
                  </ul>
                </div>

                <div className="alert alert-danger mt-5">
                  <i className="fal fa-exclamation-triangle me-2"></i>
                  <strong>Advertencia Final:</strong> El uso de la plataforma AMCI implica la aceptación 
                  de los riesgos inherentes al comercio electrónico de productos industriales. 
                  Los usuarios deben ejercer su propio juicio y debido cuidado en todas las transacciones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;