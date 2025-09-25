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
          <title>Registro Exitoso - AMCI E-commerce</title>
        </Head>
        <Layout>
          <section className="contact-area pt-100 pb-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }} />
                    </div>
                    <h2 className="title mb-3">¡Registro Exitoso!</h2>
                    <p className="mb-4">
                      Tu cuenta ha sido creada exitosamente. Revisa tu correo electrónico para
                      verificar tu cuenta.
                    </p>
                    <p className="text-muted">
                      Serás redirigido a la página de inicio de sesión en unos segundos...
                    </p>
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
        <title>Registro de Cliente - AMCI E-commerce</title>
        <meta name="description" content="Crea tu cuenta en AMCI E-commerce" />
      </Head>
      <Layout>
        <section className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="contact-form-wrap">
                  <div className="text-center mb-4">
                    <h2 className="title">Crear Cuenta</h2>
                    <p>Únete a AMCI E-commerce</p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-grp">
                      <label htmlFor="name">
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
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-grp">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="55 1234 5678"
                        value={formData.phone}
                        onChange={handleChange}
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
                        y la{' '}
                        <Link href="/privacidad" className="text-primary">
                          política de privacidad
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Registrando...
                        </>
                      ) : (
                        'Crear Cuenta'
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-primary">
                          Inicia sesión aquí
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