import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'CLIENTE' | 'PROVEEDOR' | 'ADMIN';
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requireAuth = true
}) => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    console.log('ProtectedRoute: Auth state changed', {
      loading,
      hasUser: !!user,
      hasProfile: !!profile,
      requiredRole,
      profileRole: profile?.role
    });

    let timeoutId: NodeJS.Timeout | undefined;

    // Solo verificar cuando la carga haya terminado
    if (!loading) {
      // Si requiere autenticación y no hay usuario
      if (requireAuth && !user) {
        console.log('ProtectedRoute: No user found, redirecting to login');
        setIsAuthorized(false);
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
        return;
      }

      // Si hay usuario y solo requiere autenticación (sin rol específico)
      if (user && requireAuth && !requiredRole) {
        console.log('ProtectedRoute: User authenticated, no specific role required');
        setIsAuthorized(true);
        return;
      }

      // Si hay usuario y se requiere un rol específico
      if (user && requiredRole) {
        // Esperar a que el perfil se cargue
        if (!profile) {
          console.log('ProtectedRoute: Waiting for profile to load...');

          // Timeout de seguridad: si después de 10 segundos no hay perfil
          timeoutId = setTimeout(() => {
            console.warn('ProtectedRoute: Profile loading timeout - proceeding with CLIENTE assumption');

            // Si se requiere ADMIN o PROVEEDOR, denegar acceso
            if (requiredRole === 'ADMIN') {
              alert('No se pudo verificar tu rol de administrador. Serás redirigido al inicio.');
              setIsAuthorized(false);
              router.push('/');
            } else if (requiredRole === 'PROVEEDOR') {
              alert('No se pudo verificar tu rol de proveedor. Serás redirigido al inicio.');
              setIsAuthorized(false);
              router.push('/');
            } else {
              // Para rol CLIENTE, permitir acceso con precaución
              console.log('ProtectedRoute: Allowing access assuming CLIENTE role');
              setIsAuthorized(true);
            }
          }, 10000);

          // No setear isAuthorized aquí para mantener el loading
          return;
        }

        // Limpiar timeout si el perfil se carga
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Verificar el rol
        if (profile.role === requiredRole || profile.role === 'ADMIN') {
          console.log('ProtectedRoute: User authorized with role:', profile.role);
          setIsAuthorized(true);
        } else {
          console.log('ProtectedRoute: User not authorized. Required:', requiredRole, 'Has:', profile.role);
          setIsAuthorized(false);

          if (requiredRole === 'ADMIN') {
            alert('No tienes permisos de administrador para acceder a esta página');
          } else if (requiredRole === 'PROVEEDOR') {
            alert('Esta página es solo para proveedores');
          }

          router.push('/');
        }
      }
    }

    // Cleanup function para limpiar timeout si el componente se desmonta
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, user, profile, requiredRole, requireAuth, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading || isAuthorized === null) {
    return (
      <Layout header={1} footer={1}>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Verificando permisos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Si no está autorizado, no mostrar nada (ya se redirige en useEffect)
  if (isAuthorized === false) {
    return null;
  }

  // Si todo está bien, mostrar el contenido
  return <>{children}</>;
};

export default ProtectedRoute;