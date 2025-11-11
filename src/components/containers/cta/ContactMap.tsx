import React from "react";

const ContactMap = () => {
  return (
    <div className="google__map-area pt-120">
      {/* Mapa de Ciudad de México - Zona Industrial */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120616.10815159939!2d-99.26277519726562!3d19.390519000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1705000000000!5m2!1ses!2smx"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación AMCI - Ciudad de México"
      ></iframe>
    </div>
  );
};

export default ContactMap;
