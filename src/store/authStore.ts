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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (userError) throw userError;
        
        set({ 
          user: userData,
          isAuthenticated: true,
          isLoading: false 
        });
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (userError) throw userError;
        
        set({ 
          user: userData,
          isAuthenticated: true,
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante o registro', 
        isLoading: false 
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
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (!error && userData) {
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