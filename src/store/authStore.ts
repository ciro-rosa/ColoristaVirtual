import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true, // Começa como true para verificar sessão inicial
  error: null,
  isAuthenticated: false,
  
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('Iniciando logout...');
      
      // Chama o signOut do Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erro no Supabase signOut:', error);
        throw error;
      }
      
      console.log('SignOut do Supabase realizado com sucesso');
      
      // Limpa o estado imediatamente (não espera o listener)
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
      console.log('Estado limpo com sucesso');
      
    } catch (error) {
      console.error('Erro durante logout:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante logout', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Função para verificar sessão inicial
  checkSession: async () => {
    try {
      set({ isLoading: true });
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erro ao verificar sessão:', error);
        set({ isLoading: false, error: error.message });
        return;
      }

      if (session?.user) {
        // Usuário está logado, buscar dados do banco
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (!userError && userData) {
          set({ 
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          console.error('Erro ao buscar dados do usuário:', userError);
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Erro ao carregar dados do usuário'
          });
        }
      } else {
        // Não há sessão ativa
        set({ 
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Erro na verificação de sessão:', error);
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  },
}));

// Configurar listener de mudanças de autenticação
let authSubscription: { unsubscribe: () => void } | null = null;

const setupAuthListener = () => {
  // Remove listener anterior se existir
  if (authSubscription) {
    authSubscription.unsubscribe();
  }

  authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth event:', event, 'Session:', session);
    
    const currentState = useAuthStore.getState();
    
    if (event === 'SIGNED_IN' && session?.user) {
      console.log('Usuário logado, buscando dados...');
      
      try {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (!error && userData) {
          console.log('Dados do usuário carregados:', userData);
          useAuthStore.setState({ 
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          console.error('Erro ao buscar dados do usuário:', error);
          useAuthStore.setState({ 
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Erro ao carregar dados do usuário'
          });
        }
      } catch (error) {
        console.error('Erro ao processar login:', error);
        useAuthStore.setState({ 
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
      
    } else if (event === 'SIGNED_OUT') {
      console.log('Usuário deslogado');
      useAuthStore.setState({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('Token renovado');
      // Não precisa fazer nada, a sessão continua válida
      
    } else if (event === 'USER_UPDATED') {
      console.log('Usuário atualizado');
      // Recarregar dados do usuário se necessário
      if (session?.user && currentState.isAuthenticated) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (!error && userData) {
          useAuthStore.setState({ user: userData });
        }
      }
    }
  });
};

// Inicializar listener
setupAuthListener();

// Verificar sessão inicial quando o store for criado
useAuthStore.getState().checkSession();

// Exportar função para cleanup (opcional)
export const cleanupAuth = () => {
  if (authSubscription) {
    authSubscription.unsubscribe();
    authSubscription = null;
  }
};