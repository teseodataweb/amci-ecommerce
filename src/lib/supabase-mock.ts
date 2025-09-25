// Mock de Supabase para desarrollo sin credenciales
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signUp: async (credentials: any) => {
      console.log('Mock signUp:', credentials);
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email: credentials.email,
          },
        },
        error: null,
      };
    },
    signInWithPassword: async (credentials: any) => {
      console.log('Mock signIn:', credentials);
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email: credentials.email,
          },
          session: {
            access_token: 'mock-token',
            refresh_token: 'mock-refresh',
          },
        },
        error: null,
      };
    },
    signOut: async () => {
      console.log('Mock signOut');
      return { error: null };
    },
  },
};

export const supabaseAdmin = () => supabase;