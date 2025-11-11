import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn, user, profile } = useAuth();
  const { redirect } = router.query;

  // Si ya está autenticado Y está en la página de login, redirigir
  useEffect(() => {
    if (user && profile && router.pathname === '/login') {
      const redirectUrl = redirect ? decodeURIComponent(redirect as string) : '/';
      router.push(redirectUrl);
    }
  }, [user, profile, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Esperar un momento para que se cargue el perfil
      setTimeout(() => {
        const redirectUrl = redirect ? decodeURIComponent(redirect as string) : '/';
        router.push(redirectUrl);
      }, 1000);
    }
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesión - AMCI</title>
        <meta name="description" content="Accede a tu cuenta AMCI para gestionar tus compras y cotizaciones industriales" />
      </Head>
      <Layout header={1} footer={1}>
        {/* Hero Section - Consistente con otras páginas */}
        <section
          className="hero__area hero__area-login"
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
                <div className="hero__content-login text-center">
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
                    Iniciar Sesión
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
                    Accede a tu cuenta para gestionar tus compras y cotizaciones
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
              <div className="col-lg-5 col-md-7">
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
                      <i className="fal fa-user-circle" style={{ fontSize: '36px', color: '#ffffff' }}></i>
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
                      Bienvenido de nuevo
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                      Ingresa tus credenciales para continuar
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
                      <label htmlFor="email" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        Correo Electrónico <span className="text-danger">*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <i
                          className="fal fa-envelope"
                          style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#666',
                            fontSize: '16px'
                          }}
                        ></i>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="tu@empresa.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                          style={{
                            paddingLeft: '45px',
                            height: '50px',
                            borderRadius: '12px',
                            border: '1px solid #e0e0e0',
                            fontSize: '15px'
                          }}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        Contraseña <span className="text-danger">*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <i
                          className="fal fa-lock"
                          style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#666',
                            fontSize: '16px'
                          }}
                        ></i>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Tu contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                          style={{
                            paddingLeft: '45px',
                            height: '50px',
                            borderRadius: '12px',
                            border: '1px solid #e0e0e0',
                            fontSize: '15px'
                          }}
                        />
                      </div>
                    </div>

                    <div className="mb-4 text-end">
                      <Link
                        href="/forgot-password"
                        style={{
                          color: '#0446F0',
                          fontSize: '14px',
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
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
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="fal fa-sign-in me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p style={{ fontSize: '15px', color: '#666', margin: 0 }}>
                        ¿No tienes cuenta?{' '}
                        <Link
                          href="/registro"
                          style={{
                            color: '#0446F0',
                            fontWeight: '600',
                            textDecoration: 'none'
                          }}
                        >
                          Regístrate aquí
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