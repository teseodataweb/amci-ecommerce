import React from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

const Terminos = () => {
  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Términos y Condiciones"
        subtitle="Condiciones de uso de la plataforma AMCI"
        bg="bg-secondary"
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
                    Bienvenido a AMCI. Estos términos y condiciones describen las reglas y regulaciones 
                    para el uso del sitio web y la plataforma de comercio electrónico de AMCI.
                  </p>
                  
                  <p className="mb-4">
                    Al acceder y utilizar este sitio web, aceptas cumplir y estar sujeto a los siguientes 
                    términos y condiciones de uso.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">1. Definiciones</h3>
                  <ul className="legal__list">
                    <li><strong>"AMCI":</strong> se refiere a nuestra empresa y plataforma de comercio electrónico.</li>
                    <li><strong>"Proveedor":</strong> empresas certificadas que ofrecen productos a través de nuestra plataforma.</li>
                    <li><strong>"Cliente" o "Usuario":</strong> persona física o moral que utiliza nuestros servicios.</li>
                    <li><strong>"Productos":</strong> bienes y servicios ofrecidos por los proveedores a través de AMCI.</li>
                    <li><strong>"Plataforma":</strong> el sitio web y aplicaciones de AMCI.</li>
                  </ul>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">2. Uso de la Plataforma</h3>
                  <h5>2.1 Elegibilidad</h5>
                  <p className="mb-3">
                    Para utilizar nuestros servicios, debes ser mayor de edad y tener capacidad legal 
                    para celebrar contratos en tu jurisdicción.
                  </p>
                  
                  <h5>2.2 Registro de Cuenta</h5>
                  <p className="mb-3">
                    Para realizar compras, es necesario crear una cuenta proporcionando información 
                    veraz y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta.
                  </p>
                  
                  <h5>2.3 Uso Permitido</h5>
                  <p className="mb-3">
                    La plataforma debe utilizarse únicamente para fines comerciales legítimos. 
                    Está prohibido usar la plataforma para actividades fraudulentas o ilegales.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">3. Proceso de Compra</h3>
                  <h5>3.1 Productos y Precios</h5>
                  <p className="mb-3">
                    Los productos y precios mostrados están sujetos a disponibilidad. AMCI se reserva 
                    el derecho de modificar precios sin previo aviso.
                  </p>
                  
                  <h5>3.2 Pagos</h5>
                  <p className="mb-3">
                    Los pagos se procesan de forma centralizada a través de AMCI utilizando métodos 
                    de pago seguros. Los precios están en pesos mexicanos (MXN) antes de IVA.
                  </p>
                  
                  <h5>3.3 Confirmación de Órdenes</h5>
                  <p className="mb-3">
                    Una vez confirmado el pago, se crea la orden y se notifica al proveedor correspondiente. 
                    Recibirás un correo de confirmación con los detalles de tu compra.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">4. Entrega y Envíos</h3>
                  <p className="mb-3">
                    Los envíos son gestionados directamente por cada proveedor. Los costos de envío 
                    se cobran por separado y varían según el proveedor y destino.
                  </p>
                  <p className="mb-3">
                    AMCI no es responsable por retrasos en la entrega causados por el proveedor, 
                    paquetería o circunstancias fuera de nuestro control.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">5. Facturación</h3>
                  <p className="mb-3">
                    Dependiendo del producto, la factura puede ser emitida por AMCI o directamente 
                    por el proveedor. Esta información se especifica claramente en cada producto.
                  </p>
                  <p className="mb-3">
                    Si tu pedido incluye productos de diferentes emisores de factura, recibirás 
                    múltiples facturas según corresponda.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">6. Devoluciones y Garantías</h3>
                  <p className="mb-3">
                    Las políticas de devolución y garantía son establecidas por cada proveedor individual. 
                    AMCI facilita la comunicación entre cliente y proveedor para resolver estas situaciones.
                  </p>
                  <p className="mb-3">
                    Para iniciar una devolución o reclamación de garantía, contacta directamente 
                    al proveedor utilizando la información proporcionada en tu orden.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">7. Limitación de Responsabilidad</h3>
                  <p className="mb-3">
                    AMCI actúa como intermediario entre clientes y proveedores. La responsabilidad 
                    por la calidad, garantía y soporte técnico de los productos recae directamente 
                    en cada proveedor.
                  </p>
                  <p className="mb-3">
                    AMCI no será responsable por daños directos, indirectos, incidentales o 
                    consecuenciales derivados del uso de la plataforma o los productos adquiridos.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">8. Modificaciones</h3>
                  <p className="mb-3">
                    AMCI se reserva el derecho de modificar estos términos y condiciones en cualquier momento. 
                    Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
                  </p>
                  <p className="mb-3">
                    Es responsabilidad del usuario revisar periódicamente estos términos para 
                    mantenerse informado de cualquier cambio.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">9. Jurisdicción y Ley Aplicable</h3>
                  <p className="mb-3">
                    Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta 
                    en los tribunales competentes de México.
                  </p>
                </div>

                <div className="legal__section mb-5">
                  <h3 className="mb-4">10. Contacto</h3>
                  <p className="mb-3">
                    Para preguntas sobre estos términos y condiciones, puedes contactarnos a través de:
                  </p>
                  <ul className="legal__list">
                    <li>Email: legal@amci.com</li>
                    <li>Teléfono: +52 55 1234 5678</li>
                    <li>Dirección: [Dirección de AMCI]</li>
                  </ul>
                </div>

                <div className="alert alert-info mt-5">
                  <i className="fal fa-info-circle me-2"></i>
                  <strong>Nota importante:</strong> Al utilizar nuestra plataforma, confirmas que has 
                  leído, entendido y aceptado estos términos y condiciones en su totalidad.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terminos;