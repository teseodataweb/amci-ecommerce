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
        <title>Iniciar Sesión - AMCI E-commerce</title>
        <meta name="description" content="Accede a tu cuenta AMCI" />
      </Head>
      <Layout header={1} footer={1}>
        <section className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="contact-form-wrap">
                  <div className="text-center mb-4">
                    <h2 className="title">Iniciar Sesión</h2>
                    <p>Accede a tu cuenta AMCI</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-grp">
                      <label htmlFor="email">
                        Correo Electrónico <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        className="form-control"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-grp mb-3">
                      <Link href="/forgot-password" className="text-primary">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Iniciando sesión...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p>
                        ¿No tienes cuenta?{' '}
                        <Link href="/registro" className="text-primary">
                          Regístrate aquí
                        </Link>
                      </p>
                    </div>

                    <hr className="my-4" />

                    <div className="text-center">
                      <p className="text-muted">
                        <small>¿Eres proveedor?</small>
                      </p>
                      <Link href="/registro-proveedor" className="btn btn-outline-primary">
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