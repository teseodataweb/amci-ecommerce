import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function Registro() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await signUp(formData.email, formData.password, {
      name: formData.name,
      phone: formData.phone,
      role: 'CLIENTE',
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Registro Exitoso - AMCI</title>
        </Head>
        <Layout header={1} footer={1}>
          <section className="pt-100 pb-100" style={{ background: '#f8f9fa', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '60px 40px',
                      textAlign: 'center',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                    }}
                    data-aos="fade-up"
                  >
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
                      ¡Registro Exitoso!
                    </h2>
                    <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                      Tu cuenta ha sido creada exitosamente. Revisa tu correo electrónico para
                      verificar tu cuenta y acceder a todas las funcionalidades.
                    </p>
                    <div
                      style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '24px'
                      }}
                    >
                      <p style={{ fontSize: '14px', color: '#059669', margin: 0 }}>
                        <i className="fas fa-info-circle me-2"></i>
                        Serás redirigido a la página de inicio de sesión en unos segundos...
                      </p>
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
        <title>Registro de Cliente - AMCI</title>
        <meta name="description" content="Crea tu cuenta en AMCI para acceder a productos industriales de proveedores certificados" />
      </Head>
      <Layout header={1} footer={1}>
        {/* Hero Section */}
        <section
          className="hero__area hero__area-registro"
          style={{
            position: 'relative',
            minHeight: '40vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)'
          }}
        >
          <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="row">
              <div className="col-12">
                <div className="hero__content-registro text-center">
                  <h1
                    className="display-4 fw-bold text-white mb-3"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                      lineHeight: '1.2',
                      fontSize: 'clamp(2rem, 5vw, 3rem)'
                    }}
                  >
                    Crear Cuenta de Cliente
                  </h1>
                  <p
                    className="text-white mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="1000"
                    style={{
                      textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
                      maxWidth: '600px',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                    }}
                  >
                    Únete a AMCI y accede a productos industriales de proveedores certificados
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
              <div className="col-lg-6 col-md-8">
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
                  {/* Icon/Logo */}
                  <div className="text-center mb-4">
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 20px rgba(4, 70, 240, 0.25)'
                      }}
                    >
                      <i className="fal fa-user-plus" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
                      Crea tu cuenta
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                      Completa el formulario para comenzar
                    </p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '12px' }}>
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        Nombre Completo <span className="text-danger">*</span>
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
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          border: '1px solid #e0e0e0',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        Correo Electrónico <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          border: '1px solid #e0e0e0',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="55 1234 5678"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          border: '1px solid #e0e0e0',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
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
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          border: '1px solid #e0e0e0',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
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
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          border: '1px solid #e0e0e0',
                          fontSize: '15px'
                        }}
                      />
                    </div>

                    <div className="form-check mb-4" style={{ padding: '12px', background: 'rgba(4, 70, 240, 0.05)', borderRadius: '8px' }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor="terms" style={{ fontSize: '14px', color: '#4a5568' }}>
                        Acepto los{' '}
                        <Link href="/terminos" style={{ color: '#0446F0', fontWeight: '600', textDecoration: 'none' }}>
                          términos y condiciones
                        </Link>{' '}
                        y la{' '}
                        <Link href="/privacidad" style={{ color: '#0446F0', fontWeight: '600', textDecoration: 'none' }}>
                          política de privacidad
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: '100%',
                        height: '50px',
                        background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 12px rgba(4, 70, 240, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Registrando...
                        </>
                      ) : (
                        <>
                          <i className="fal fa-user-check me-2"></i>
                          Crear Cuenta
                        </>
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" style={{ color: '#0446F0', fontWeight: '600', textDecoration: 'none' }}>
                          Inicia sesión aquí
                        </Link>
                      </p>
                    </div>

                    <div style={{ margin: '30px 0' }}>
                      <div style={{ position: 'relative', textAlign: 'center' }}>
                        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0' }} />
                        <span
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: '#ffffff',
                            padding: '0 15px',
                            fontSize: '14px',
                            color: '#999'
                          }}
                        >
                          o
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                        ¿Eres proveedor?
                      </p>
                      <Link
                        href="/registro-proveedor"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          background: 'transparent',
                          border: '2px solid #0446F0',
                          color: '#0446F0',
                          borderRadius: '12px',
                          fontSize: '15px',
                          fontWeight: '600',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0446F0';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#0446F0';
                        }}
                      >
                        <i className="fal fa-handshake"></i>
                        Registro de Proveedores
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}