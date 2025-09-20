import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

const Privacidad = () => {
  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Política de Privacidad"
        subtitle="Protección y manejo de datos personales en AMCI"
        bg="bg-info"
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
                  
                  <p className="mb-4">
                    En AMCI, nos comprometemos a proteger la privacidad y seguridad de los datos personales 
                    de nuestros usuarios. Esta política describe cómo recopilamos, utilizamos, almacenamos 
                    y protegemos tu información personal.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">1. Información que Recopilamos</h3>
                  
                  <h5>1.1 Información Personal</h5>
                  <p className="mb-3">Recopilamos información que nos proporcionas directamente, incluyendo:</p>
                  <ul className="legal__list mb-4">
                    <li>Nombre completo</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Dirección de envío y facturación</li>
                    <li>RFC (si requieres factura)</li>
                    <li>Información de pago (procesada de forma segura por terceros)</li>
                  </ul>
                  
                  <h5>1.2 Información de Uso</h5>
                  <p className="mb-3">Automáticamente recopilamos información sobre cómo utilizas nuestra plataforma:</p>
                  <ul className="legal__list mb-4">
                    <li>Páginas visitadas y tiempo de navegación</li>
                    <li>Productos visualizados y búsquedas realizadas</li>
                    <li>Dispositivo e información del navegador</li>
                    <li>Dirección IP y ubicación general</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">2. Cómo Utilizamos tu Información</h3>
                  <p className="mb-3">Utilizamos la información recopilada para:</p>
                  <ul className="legal__list mb-4">
                    <li>Procesar y gestionar tus órdenes de compra</li>
                    <li>Comunicarnos contigo sobre el estado de tus pedidos</li>
                    <li>Proporcionar atención al cliente y soporte técnico</li>
                    <li>Mejorar nuestros servicios y experiencia de usuario</li>
                    <li>Cumplir con obligaciones legales y fiscales</li>
                    <li>Prevenir fraude y garantizar la seguridad de la plataforma</li>
                    <li>Enviar comunicaciones relacionadas con el servicio</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">3. Compartir Información</h3>
                  
                  <h5>3.1 Con Proveedores</h5>
                  <p className="mb-3">
                    Compartimos información necesaria con nuestros proveedores para procesar y entregar tus órdenes, 
                    incluyendo nombre, dirección de envío y detalles del pedido.
                  </p>
                  
                  <h5>3.2 Proveedores de Servicios</h5>
                  <p className="mb-3">Compartimos información con terceros que nos ayudan a operar nuestro negocio:</p>
                  <ul className="legal__list mb-4">
                    <li>Procesadores de pago (Mercado Pago, Stripe)</li>
                    <li>Servicios de hosting y almacenamiento</li>
                    <li>Servicios de email y notificaciones</li>
                    <li>Servicios de análisis web</li>
                  </ul>
                  
                  <h5>3.3 Requerimientos Legales</h5>
                  <p className="mb-3">
                    Podemos divulgar tu información si es requerido por ley o para proteger nuestros derechos, 
                    propiedad o seguridad, o la de nuestros usuarios.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">4. Seguridad de Datos</h3>
                  <p className="mb-3">Implementamos medidas de seguridad para proteger tu información personal:</p>
                  <ul className="legal__list mb-4">
                    <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                    <li>Almacenamiento seguro con acceso restringido</li>
                    <li>Auditorías regulares de seguridad</li>
                    <li>Políticas estrictas de acceso a datos</li>
                    <li>Monitoreo continuo de amenazas</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">5. Retención de Datos</h3>
                  <p className="mb-3">
                    Conservamos tu información personal durante el tiempo necesario para cumplir con los 
                    propósitos descritos en esta política, incluyendo:
                  </p>
                  <ul className="legal__list mb-4">
                    <li>Historial de órdenes: 5 años (requerimiento fiscal)</li>
                    <li>Datos de cuenta: mientras mantengas una cuenta activa</li>
                    <li>Comunicaciones: 2 años para soporte y mejora del servicio</li>
                    <li>Datos de análisis: forma anónima por tiempo indefinido</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">6. Tus Derechos</h3>
                  <p className="mb-3">
                    De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de Particulares, tienes derecho a:
                  </p>
                  <ul className="legal__list mb-4">
                    <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre ti</li>
                    <li><strong>Rectificación:</strong> Corregir datos inexactos o desactualizados</li>
                    <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                    <li><strong>Oposición:</strong> Oponerte al uso de tus datos para fines específicos</li>
                    <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  </ul>
                  
                  <p className="mb-3">
                    Para ejercer estos derechos, contacta a nuestro departamento de privacidad en: 
                    <strong>privacidad@amci.com</strong>
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">7. Cookies y Tecnologías Similares</h3>
                  <p className="mb-3">Utilizamos cookies para:</p>
                  <ul className="legal__list mb-4">
                    <li>Recordar tus preferencias de navegación</li>
                    <li>Mantener tu sesión activa</li>
                    <li>Personalizar contenido y recomendaciones</li>
                    <li>Analizar el uso de la plataforma</li>
                    <li>Mejorar la seguridad</li>
                  </ul>
                  
                  <p className="mb-3">
                    Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar 
                    la funcionalidad de la plataforma.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">8. Menores de Edad</h3>
                  <p className="mb-3">
                    Nuestros servicios están dirigidos a personas mayores de edad. No recopilamos 
                    intencionalmente información personal de menores de 18 años.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">9. Cambios a esta Política</h3>
                  <p className="mb-3">
                    Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                    sobre cambios significativos a través de email o mediante un aviso en nuestra plataforma.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">10. Contacto</h3>
                  <p className="mb-3">
                    Para preguntas sobre esta política de privacidad o el manejo de tus datos personales:
                  </p>
                  <ul className="legal__list">
                    <li><strong>Email:</strong> privacidad@amci.com</li>
                    <li><strong>Teléfono:</strong> +52 55 1234 5678</li>
                    <li><strong>Dirección:</strong> [Dirección de AMCI]</li>
                  </ul>
                </div>

                <div className="alert alert-success mt-5">
                  <i className="fal fa-shield-alt me-2"></i>
                  <strong>Tu privacidad es importante:</strong> Estamos comprometidos con la protección 
                  de tus datos personales y cumplimos con todas las regulaciones aplicables de privacidad 
                  y protección de datos en México.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacidad;