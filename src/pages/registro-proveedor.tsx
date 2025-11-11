import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function RegistroProveedor() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos de usuario
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    // Datos del proveedor
    razonSocial: '',
    rfc: '',
    contactoOperativo: '',
    contactoProgramacion: '',
    contactoFacturacion: '',
    clabe: '',
    emisorFacturaDefault: 'PROVEEDOR',
    coberturaServicio: '',
    correosNotificaciones: '',
    observaciones: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.name) {
      setError('Por favor completa todos los campos requeridos');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (!formData.razonSocial || !formData.rfc) {
      setError('Por favor completa todos los campos requeridos');
      return false;
    }
    // Validar formato RFC
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    if (!rfcRegex.test(formData.rfc.toUpperCase())) {
      setError('El RFC no tiene un formato válido');
      return false;
    }
    // Validar CLABE si se proporciona
    if (formData.clabe && formData.clabe.length !== 18) {
      setError('La CLABE debe tener 18 dígitos');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep3 = () => {
    // Paso 3 es opcional, siempre válido
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    } else if (step === 3) {
      if (validateStep3()) {
        setLoading(true);

        // Procesar correos de notificaciones (convertir string a array)
        const correosArray = formData.correosNotificaciones
          ? formData.correosNotificaciones.split(',').map(email => email.trim()).filter(Boolean)
          : [];

        const result = await signUp(formData.email, formData.password, {
          name: formData.name,
          phone: formData.phone,
          role: 'PROVEEDOR',
          providerData: {
            razonSocial: formData.razonSocial,
            rfc: formData.rfc.toUpperCase(),
            contactoOperativo: formData.contactoOperativo,
            contactoProgramacion: formData.contactoProgramacion,
            contactoFacturacion: formData.contactoFacturacion,
            clabe: formData.clabe,
            emisorFacturaDefault: formData.emisorFacturaDefault,
            coberturaServicio: formData.coberturaServicio,
            correosNotificaciones: correosArray.length > 0 ? JSON.stringify(correosArray) : null,
            observaciones: formData.observaciones,
          },
        });

        if (result.error) {
          setError(result.error);
          setLoading(false);
        } else {
          setSuccess(true);
        }
      }
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Solicitud Enviada - AMCI</title>
        </Head>
        <Layout header={1} footer={1}>
          <section className="pt-100 pb-100" style={{ background: '#f8f9fa', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '60px 40px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                    }}
                    data-aos="fade-up"
                  >
                    <div className="text-center">
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 30px',
                          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        <i className="fas fa-check" style={{ fontSize: '48px', color: '#ffffff' }} />
                      </div>
                      <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>
                        ¡Solicitud Enviada Exitosamente!
                      </h2>
                      <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
                        Tu solicitud de registro como proveedor ha sido recibida. Nuestro equipo la revisará pronto.
                      </p>
                    </div>

                    <div
                      style={{
                        background: 'rgba(4, 70, 240, 0.05)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '30px'
                      }}
                    >
                      <h5 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fas fa-list-check" style={{ color: '#0446F0' }}></i>
                        Próximos pasos:
                      </h5>
                      <ol style={{ marginBottom: 0, paddingLeft: '20px', lineHeight: '1.8', color: '#4a5568' }}>
                        <li>Nuestro equipo revisará tu información en las próximas <strong>24-48 horas</strong></li>
                        <li>Recibirás un correo electrónico con el estado de tu solicitud</li>
                        <li>Una vez aprobado, podrás acceder al panel de proveedores y comenzar a publicar productos</li>
                      </ol>
                    </div>

                    <div className="text-center">
                      <Link
                        href="/"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                          color: '#ffffff',
                          padding: '14px 32px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          textDecoration: 'none',
                          boxShadow: '0 4px 12px rgba(4, 70, 240, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(4, 70, 240, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(4, 70, 240, 0.3)';
                        }}
                      >
                        <i className="fal fa-home"></i>
                        Volver al Inicio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Registro de Proveedor - AMCI</title>
        <meta name="description" content="Únete a la red de proveedores certificados de AMCI y expande tu negocio" />
      </Head>
      <Layout header={1} footer={1}>
        {/* Hero Section */}
        <section
          className="hero__area hero__area-proveedor"
          style={{
            position: 'relative',
            minHeight: '45vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)'
          }}
        >
          <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="row">
              <div className="col-12">
                <div className="hero__content-proveedor text-center">
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      marginBottom: '20px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <i className="fas fa-handshake" style={{ color: '#10B981', fontSize: '16px' }}></i>
                    <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>
                      Únete a nuestra red de proveedores
                    </span>
                  </div>
                  <h1
                    className="display-4 fw-bold text-white mb-3"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                      lineHeight: '1.2',
                      fontSize: 'clamp(2rem, 5vw, 3.2rem)'
                    }}
                  >
                    Registro de Proveedor
                  </h1>
                  <p
                    className="text-white mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="1000"
                    style={{
                      textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
                      maxWidth: '700px',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                    }}
                  >
                    Forma parte de AMCI y conecta con empresas que necesitan tus productos y servicios industriales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pt-80 pb-100" style={{ background: '#f8f9fa' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: 'clamp(30px, 5vw, 50px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  {/* Header with icon */}
                  <div className="text-center mb-4">
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
                      }}
                    >
                      <i className="fal fa-store" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
                      Solicitud de Registro
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                      Completa los siguientes pasos para unirte
                    </p>
                  </div>

                  {/* Progress Steps */}
                  <div className="progress-steps mb-5">
                    <div className="d-flex justify-content-center align-items-start flex-wrap" style={{ gap: '0' }}>
                      <div className={`step ${step >= 1 ? 'active' : ''}`} style={{ flex: '0 0 auto' }}>
                        <span className="step-number">{step > 1 ? <i className="fas fa-check"></i> : '1'}</span>
                        <span className="step-label">Datos de Usuario</span>
                      </div>
                      <div className="step-line"></div>
                      <div className={`step ${step >= 2 ? 'active' : ''}`} style={{ flex: '0 0 auto' }}>
                        <span className="step-number">{step > 2 ? <i className="fas fa-check"></i> : '2'}</span>
                        <span className="step-label">Datos Fiscales</span>
                      </div>
                      <div className="step-line"></div>
                      <div className={`step ${step >= 3 ? 'active' : ''}`} style={{ flex: '0 0 auto' }}>
                        <span className="step-number">3</span>
                        <span className="step-label">Info. Adicional</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '12px', marginBottom: '24px' }}>
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
                        <h4 className="mb-3">Datos de Usuario</h4>

                        <div className="form-grp">
                          <label htmlFor="name">
                            Nombre del Contacto <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Juan Pérez"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="email">
                            Correo Electrónico <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="contacto@empresa.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="phone">
                            Teléfono <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="55 1234 5678"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="password">
                            Contraseña <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="confirmPassword">
                            Confirmar Contraseña <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Repite tu contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                            disabled={loading}
                          />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                          Siguiente <i className="fas fa-arrow-right ms-2" />
                        </button>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h4 className="mb-3">Datos Fiscales y Comerciales</h4>

                        <div className="form-grp">
                          <label htmlFor="razonSocial">
                            Razón Social <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="razonSocial"
                            name="razonSocial"
                            className="form-control"
                            placeholder="Empresa S.A. de C.V."
                            value={formData.razonSocial}
                            onChange={handleChange}
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="rfc">
                            RFC <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="rfc"
                            name="rfc"
                            className="form-control"
                            placeholder="ABC123456DEF"
                            value={formData.rfc}
                            onChange={handleChange}
                            required
                            maxLength={13}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="contactoOperativo">
                            Contacto Operativo
                          </label>
                          <input
                            type="text"
                            id="contactoOperativo"
                            name="contactoOperativo"
                            className="form-control"
                            placeholder="Nombre y teléfono"
                            value={formData.contactoOperativo}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="contactoFacturacion">
                            Contacto de Facturación
                          </label>
                          <input
                            type="text"
                            id="contactoFacturacion"
                            name="contactoFacturacion"
                            className="form-control"
                            placeholder="Email de facturación"
                            value={formData.contactoFacturacion}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="form-grp">
                          <label htmlFor="clabe">
                            CLABE Interbancaria (18 dígitos)
                          </label>
                          <input
                            type="text"
                            id="clabe"
                            name="clabe"
                            className="form-control"
                            placeholder="Para recibir pagos"
                            value={formData.clabe}
                            onChange={handleChange}
                            maxLength={18}
                            disabled={loading}
                          />
                          <small className="text-muted">
                            Opcional. Puedes agregarlo después desde tu panel
                          </small>
                        </div>

                        <div className="form-grp">
                          <label htmlFor="emisorFacturaDefault">
                            ¿Quién emitirá las facturas por defecto?
                          </label>
                          <select
                            id="emisorFacturaDefault"
                            name="emisorFacturaDefault"
                            className="form-control"
                            value={formData.emisorFacturaDefault}
                            onChange={handleChange}
                            disabled={loading}
                          >
                            <option value="PROVEEDOR">Yo (Proveedor)</option>
                            <option value="AMCI">AMCI</option>
                          </select>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-secondary flex-fill"
                            onClick={() => setStep(1)}
                            disabled={loading}
                          >
                            <i className="fas fa-arrow-left me-2" /> Anterior
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary flex-fill"
                          >
                            Siguiente <i className="fas fa-arrow-right ms-2" />
                          </button>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h4 className="mb-3">Información Adicional</h4>
                        <p className="text-muted mb-4">
                          Campos opcionales para servicios especializados (ej: Pumping Team)
                        </p>

                        <div className="form-grp">
                          <label htmlFor="contactoProgramacion">
                            Contacto de Programación/Agenda
                          </label>
                          <input
                            type="text"
                            id="contactoProgramacion"
                            name="contactoProgramacion"
                            className="form-control"
                            placeholder="Nombre / correo / teléfono"
                            value={formData.contactoProgramacion}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <small className="text-muted">
                            Para coordinar fechas y horarios de servicio
                          </small>
                        </div>

                        <div className="form-grp">
                          <label htmlFor="coberturaServicio">
                            Cobertura de Servicio
                          </label>
                          <input
                            type="text"
                            id="coberturaServicio"
                            name="coberturaServicio"
                            className="form-control"
                            placeholder="Ej: CDMX y Área Metropolitana, radio 50km"
                            value={formData.coberturaServicio}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <small className="text-muted">
                            Ciudades/estados cubiertos y radio en kilómetros
                          </small>
                        </div>

                        <div className="form-grp">
                          <label htmlFor="correosNotificaciones">
                            Correos para Notificaciones
                          </label>
                          <input
                            type="text"
                            id="correosNotificaciones"
                            name="correosNotificaciones"
                            className="form-control"
                            placeholder="correo1@ejemplo.com, correo2@ejemplo.com"
                            value={formData.correosNotificaciones}
                            onChange={handleChange}
                            disabled={loading}
                          />
                          <small className="text-muted">
                            Separados por comas. Recibirán notificaciones de órdenes/cotizaciones
                          </small>
                        </div>

                        <div className="form-grp">
                          <label htmlFor="observaciones">
                            Observaciones
                          </label>
                          <textarea
                            id="observaciones"
                            name="observaciones"
                            className="form-control"
                            placeholder="Información adicional, restricciones, requisitos especiales..."
                            value={formData.observaciones}
                            onChange={handleChange}
                            disabled={loading}
                            rows={3}
                          />
                        </div>

                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="terms"
                            required
                            disabled={loading}
                          />
                          <label className="form-check-label" htmlFor="terms">
                            Acepto los{' '}
                            <Link href="/terminos" className="text-primary">
                              términos y condiciones
                            </Link>{' '}
                            para proveedores y la{' '}
                            <Link href="/privacidad" className="text-primary">
                              política de privacidad
                            </Link>
                          </label>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-secondary flex-fill"
                            onClick={() => setStep(2)}
                            disabled={loading}
                          >
                            <i className="fas fa-arrow-left me-2" /> Anterior
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary flex-fill"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Registrando...
                              </>
                            ) : (
                              <>Enviar Solicitud</>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>

                  <div className="text-center mt-4">
                    <p>
                      ¿Ya tienes cuenta?{' '}
                      <Link href="/login" className="text-primary">
                        Inicia sesión aquí
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .progress-steps {
            position: relative;
          }
          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
          }
          .step-number {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e9ecef;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 12px;
            border: 3px solid #e9ecef;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .step.active .step-number {
            background: linear-gradient(135deg, #0446F0 0%, #0338C0 100%);
            color: white;
            border-color: #0446F0;
            box-shadow: 0 4px 12px rgba(4, 70, 240, 0.3);
          }
          .step-label {
            font-size: 13px;
            color: #6c757d;
            font-weight: 500;
            text-align: center;
            max-width: 100px;
          }
          .step.active .step-label {
            color: #0446F0;
            font-weight: 600;
          }
          .step-line {
            width: 80px;
            height: 3px;
            background: #e9ecef;
            margin-top: 25px;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 2px;
          }
          @media (max-width: 768px) {
            .step-line {
              width: 50px;
            }
            .step-label {
              font-size: 11px;
              max-width: 80px;
            }
            .step-number {
              width: 40px;
              height: 40px;
              font-size: 16px;
            }
          }
        `}</style>
      </Layout>
    </>
  );
}