import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) throw authError;
      
      if (authUser) {
        // Try to get user profile with retries
        let userData = null;
        let attempts = 0;
        
        while (attempts < MAX_RETRIES && !userData) {
          console.log(`Attempting to fetch user profile (attempt ${attempts + 1})`);
          
          const { data, error: userError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('auth_uid', authUser.id)
            .single();
            
          if (!userError && data) {
            userData = data;
            break;
          }
          
          attempts++;
          if (attempts < MAX_RETRIES) {
            await sleep(RETRY_DELAY);
          }
        }
        
        if (userData) {
          set({ 
            user: userData,
            isAuthenticated: true,
            isLoading: false 
          });
        } else {
          throw new Error('Não foi possível recuperar os dados do usuário');
        }
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante login', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      // User data will be handled by the auth state change listener
      set({ isLoading: false });
      
      return data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante login com Google', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  register: async (name: string, email: string, phone: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Starting user registration...');
      
      // Sign up with Supabase Auth
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      if (!authUser) {
        throw new Error('Erro ao criar usuário');
      }
      
      console.log('User registered successfully, waiting for profile creation...');
      
      // Try to get user profile with retries
      let userData = null;
      let attempts = 0;
      
      while (attempts < MAX_RETRIES && !userData) {
        console.log(`Attempting to fetch user profile (attempt ${attempts + 1})`);
        
        // Wait before trying to fetch the profile
        await sleep(RETRY_DELAY);
        
        const { data, error: userError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('auth_uid', authUser.id)
          .single();
          
        if (!userError && data) {
          userData = data;
          console.log('User profile found:', data);
          break;
        }
        
        attempts++;
      }
      
      if (userData) {
        set({ 
          user: userData,
          isAuthenticated: true,
          isLoading: false 
        });
        console.log('Registration complete, user logged in');
      } else {
        // Even if we couldn't get the profile, consider the user registered
        console.log('Could not fetch profile, but registration was successful');
        set({ 
          user: {
            id: authUser.id,
            name,
            email,
            phone,
            points: 0,
            badges: [],
            createdAt: new Date(),
          },
          isAuthenticated: true,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante o registro', 
        isLoading: false,
        user: null,
        isAuthenticated: false
      });
      throw error;
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante logout', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      });
      
      if (error) throw error;
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao processar recuperação de senha', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha', 
        isLoading: false 
      });
      throw error;
    }
  },
}));

// Set up auth state change listener
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    // Try to get user profile with retries
    let attempts = 0;
    let userData = null;
    
    while (attempts < MAX_RETRIES && !userData) {
      console.log(`Auth state change: attempting to fetch user profile (attempt ${attempts + 1})`);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (!error && data) {
        userData = data;
        break;
      }
      
      attempts++;
      if (attempts < MAX_RETRIES) {
        await sleep(RETRY_DELAY);
      }
    }
    
    if (userData) {
      useAuthStore.setState({ 
        user: userData,
        isAuthenticated: true 
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ 
      user: null,
      isAuthenticated: false 
    });
  }
});