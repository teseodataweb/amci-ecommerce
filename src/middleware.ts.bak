import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Rutas que requieren autenticación
  const protectedRoutes = [
    '/panel/admin',
    '/panel/proveedor',
    '/reportes',
    '/ordenes',
    '/orden',
    '/checkout',
  ];

  // Rutas solo para admin
  const adminOnlyRoutes = ['/panel/admin', '/reportes'];

  // Rutas solo para proveedores
  const providerOnlyRoutes = ['/panel/proveedor'];

  const path = req.nextUrl.pathname;

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !session) {
    // Redirigir a login si no hay sesión
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('from', path);
    return NextResponse.redirect(redirectUrl);
  }

  // Para verificación de roles, necesitarías hacer una llamada a la BD
  // Por ahora, solo verificamos autenticación básica

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};