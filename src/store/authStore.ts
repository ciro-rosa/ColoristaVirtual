import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all auth state
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante logout', 
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
        isAuthenticated: true,
        error: null
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ 
      user: null,
      isAuthenticated: false,
      error: null
    });
  }
});