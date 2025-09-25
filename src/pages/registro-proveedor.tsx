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
    contactoFacturacion: '',
    clabe: '',
    emisorFacturaDefault: 'PROVEEDOR',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        setLoading(true);

        const result = await signUp(formData.email, formData.password, {
          name: formData.name,
          phone: formData.phone,
          role: 'PROVEEDOR',
          providerData: {
            razonSocial: formData.razonSocial,
            rfc: formData.rfc.toUpperCase(),
            contactoOperativo: formData.contactoOperativo,
            contactoFacturacion: formData.contactoFacturacion,
            clabe: formData.clabe,
            emisorFacturaDefault: formData.emisorFacturaDefault,
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
          <title>Registro de Proveedor Exitoso - AMCI E-commerce</title>
        </Head>
        <Layout>
          <section className="contact-area pt-100 pb-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <div className="text-center">
                    <div className="mb-4">
                      <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }} />
                    </div>
                    <h2 className="title mb-3">¡Solicitud Enviada!</h2>
                    <p className="mb-4">
                      Tu solicitud de registro como proveedor ha sido recibida exitosamente.
                    </p>
                    <div className="alert alert-info">
                      <h5 className="alert-heading">Próximos pasos:</h5>
                      <ol className="text-start mb-0">
                        <li>Nuestro equipo revisará tu información en las próximas 24-48 horas</li>
                        <li>Recibirás un correo electrónico con el estado de tu solicitud</li>
                        <li>Una vez aprobado, podrás acceder al panel de proveedores</li>
                      </ol>
                    </div>
                    <Link href="/" className="btn btn-primary mt-4">
                      Volver al Inicio
                    </Link>
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
        <title>Registro de Proveedor - AMCI E-commerce</title>
        <meta name="description" content="Únete como proveedor en AMCI E-commerce" />
      </Head>
      <Layout>
        <section className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="contact-form-wrap">
                  <div className="text-center mb-4">
                    <h2 className="title">Registro de Proveedor</h2>
                    <p>Únete a nuestra red de proveedores</p>

                    {/* Progress Steps */}
                    <div className="progress-steps mt-4 mb-4">
                      <div className="d-flex justify-content-center">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>
                          <span className="step-number">1</span>
                          <span className="step-label">Datos de Usuario</span>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                          <span className="step-number">2</span>
                          <span className="step-label">Datos Fiscales</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
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
                            onClick={() => setStep(1)}
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
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e9ecef;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .step.active .step-number {
            background: #1e40af;
            color: white;
          }
          .step-label {
            font-size: 14px;
            color: #6c757d;
          }
          .step.active .step-label {
            color: #1e40af;
            font-weight: 500;
          }
          .step-line {
            width: 100px;
            height: 2px;
            background: #e9ecef;
            margin-top: 20px;
            margin-left: 10px;
            margin-right: 10px;
          }
        `}</style>
      </Layout>
    </>
  );
}