import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

export type UserRole = 'CLIENTE' | 'PROVEEDOR' | 'ADMIN';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
  providerId?: string;
  providerData?: {
    id: string;
    razonSocial: string;
    rfc: string;
    active: boolean;
  };
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, data?: any) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Función para obtener el perfil del usuario desde la base de datos
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('AuthContext: Fetching profile for user:', userId);
      const response = await fetch(`/api/users/${userId}`);

      if (response.ok) {
        const data = await response.json();
        console.log('AuthContext: User profile loaded successfully:', data.email, 'Role:', data.role);
        setProfile(data);
        return data;
      } else {
        console.error('AuthContext: Error response fetching profile:', response.status, response.statusText);

        // Si es 404, el usuario no existe en la BD, crear perfil básico
        if (response.status === 404) {
          console.log('AuthContext: User not found in database, creating basic profile');
          const basicProfile: UserProfile = {
            id: userId,
            email: user?.email || '',
            name: '',
            phone: '',
            role: 'CLIENTE'
          };
          setProfile(basicProfile);
          return basicProfile;
        }

        // Para otros errores, intentar respuesta JSON
        try {
          const errorData = await response.json();
          console.error('AuthContext: API error details:', errorData);
        } catch (jsonError) {
          console.error('AuthContext: Could not parse error response');
        }
      }
    } catch (error) {
      console.error('AuthContext: Network error fetching user profile:', error);

      // Crear perfil de emergencia para evitar bloqueos completos
      console.log('AuthContext: Creating emergency profile to prevent auth blocking');
      const emergencyProfile: UserProfile = {
        id: userId,
        email: user?.email || '',
        name: '',
        phone: '',
        role: 'CLIENTE'
      };
      setProfile(emergencyProfile);
      return emergencyProfile;
    }
    return null;
  };

  // Función para refrescar el perfil
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  useEffect(() => {
    console.log('AuthContext: Initializing authentication state');

    // Verificar sesión actual
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) {
        console.error('AuthContext: Error getting session:', error);
        setLoading(false);
        return;
      }

      console.log('AuthContext: Initial session check:', !!session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        console.log('AuthContext: User found in session, fetching profile');
        try {
          const profileData = await fetchUserProfile(session.user.id);
          console.log('AuthContext: Profile fetch completed:', !!profileData);
        } catch (error) {
          console.error('AuthContext: Error during profile fetch:', error);
        }
      } else {
        console.log('AuthContext: No user in session');
        setProfile(null);
      }

      console.log('AuthContext: Initial loading complete');
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthContext: Auth state changed:', event, !!session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        console.log('AuthContext: User authenticated, fetching profile');
        try {
          await fetchUserProfile(session.user.id);
        } catch (error) {
          console.error('AuthContext: Error fetching profile on auth change:', error);
        }
      } else {
        console.log('AuthContext: User logged out, clearing profile');
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      console.log('AuthContext: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, data?: any) => {
    try {
      // Registrar en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { error: authError.message };
      }

      if (authData.user) {
        // Crear perfil en la base de datos
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: authData.user.id,
            email,
            ...data,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return { error: errorData.error || 'Error al crear el perfil' };
        }
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      // Esperar a que se cargue el perfil
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    router.push('/');
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}