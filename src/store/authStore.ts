import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  logout: () => Promise<void>;
  forceLogout: () => void; // Método de emergência
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
      
      // Timeout para evitar travamento
      const logoutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout no logout')), 10000)
      );
      
      // Tenta fazer logout com timeout de 10 segundos
      const result = await Promise.race([logoutPromise, timeoutPromise]) as any;
      
      if (result?.error) {
        console.warn('Erro no Supabase signOut:', result.error);
        // Não vamos parar por causa do erro, vamos limpar o estado mesmo assim
      }
      
      console.log('SignOut do Supabase realizado (ou timeout)');
      
      // Limpa o estado local SEMPRE (mesmo se houve erro no Supabase)
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
      // Limpa dados do localStorage como backup
      try {
        const authKeys = Object.keys(localStorage).filter(key => 
          key.includes('supabase') || key.includes('sb-')
        );
        authKeys.forEach(key => {
          console.log('Removendo chave do localStorage:', key);
          localStorage.removeItem(key);
        });
      } catch (storageError) {
        console.warn('Erro ao limpar localStorage:', storageError);
      }
      
      console.log('Estado limpo com sucesso');
      
      // Força recarregamento da página como fallback
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Erro durante logout:', error);
      
      // Mesmo com erro, limpa o estado local
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
      console.log('Estado limpo após erro');
      
      // Força recarregamento como último recurso
      setTimeout(() => {
        console.log('Forçando recarregamento após erro...');
        window.location.reload();
      }, 1000);
    }
  },

  // MÉTODO DE EMERGÊNCIA - Use se o logout normal não funcionar
  forceLogout: () => {
    console.log('🚨 LOGOUT FORÇADO ATIVADO');
    
    // Limpa estado imediatamente
    set({ 
      user: null, 
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    // Limpa TUDO do localStorage
    try {
      localStorage.clear();
      sessionStorage.clear();
      console.log('Storage limpo completamente');
    } catch (error) {
      console.warn('Erro ao limpar storage:', error);
    }
    
    // Tenta logout silencioso (sem esperar)
    supabase.auth.signOut().catch(err => 
      console.warn('Erro no signOut silencioso:', err)
    );
    
    // Recarrega a página
    window.location.href = window.location.origin;
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
        try {
          const userDataPromise = supabase
            .from('user_profiles')  // ✅ CORREÇÃO: Tabela correta
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout na busca do usuário')), 5000)
          );
          
          const { data: userData, error: userError } = await Promise.race([userDataPromise, timeoutPromise]) as any;
          
          if (!userError && userData) {
            console.log('✅ Dados do usuário carregados na verificação:', userData);
            set({ 
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            console.warn('⚠️ Erro/timeout na verificação, usando dados temporários:', userError);
            
            // FALLBACK: Criar usuário temporário com dados da sessão
            const fallbackUser = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.full_name || session.user.email || 'Usuário',
              phone: session.user.user_metadata?.phone || null,
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString(),
              auth_provider: 'google',
              total_points: 0,
              total_tokens_used: 0,
              avatar_url: session.user.user_metadata?.avatar_url || null
            };
            
            set({ 
              user: fallbackUser,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            // Tentar criar usuário no banco assincronamente
            supabase
              .from('user_profiles')  // ✅ CORREÇÃO: Tabela correta
              .upsert(fallbackUser, { onConflict: 'id' })
              .then(({ error: upsertError }) => {
                if (upsertError) {
                  console.warn('Erro ao criar usuário no banco durante verificação:', upsertError);
                } else {
                  console.log('✅ Usuário criado/atualizado no banco durante verificação');
                }
              });
          }
        } catch (error) {
          console.error('❌ Erro na verificação de usuário:', error);
          
          // FALLBACK FINAL: dados básicos da sessão
          const emergencyUser = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email || 'Usuário',
            phone: null,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            auth_provider: 'google',
            total_points: 0,
            total_tokens_used: 0,
            avatar_url: session.user.user_metadata?.avatar_url || null
          };
          
          set({ 
            user: emergencyUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
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
        // Timeout para evitar travamento na busca do usuário
        const userDataPromise = supabase
          .from('user_profiles')  // ✅ CORREÇÃO: Tabela correta
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout na busca do usuário')), 5000)
        );
        
        const { data: userData, error } = await Promise.race([userDataPromise, timeoutPromise]) as any;
          
        if (!error && userData) {
          console.log('✅ Dados do usuário carregados:', userData);
          useAuthStore.setState({ 
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          console.warn('⚠️ Erro/timeout ao buscar dados do usuário:', error);
          
          // FALLBACK: Criar usuário temporário com dados do Google
          const fallbackUser = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email || 'Usuário',
            phone: session.user.user_metadata?.phone || null,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            auth_provider: 'google',
            total_points: 0,
            total_tokens_used: 0,
            avatar_url: session.user.user_metadata?.avatar_url || null
          };
          
          console.log('🔄 Usando dados temporários do Google:', fallbackUser);
          
          // Tentar criar usuário no banco de forma assíncrona (não espera)
          supabase
            .from('user_profiles')  // ✅ CORREÇÃO: Tabela correta
            .upsert(fallbackUser, { onConflict: 'id' })
            .then(({ error: upsertError }) => {
              if (upsertError) {
                console.warn('Erro ao criar usuário no banco:', upsertError);
              } else {
                console.log('✅ Usuário criado/atualizado no banco');
              }
            });
          
          // Define estado com dados temporários
          useAuthStore.setState({ 
            user: fallbackUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('❌ Erro ao processar login:', error);
        
        // FALLBACK FINAL: Usar dados básicos do Google mesmo com erro
        const emergencyUser = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email || 'Usuário',
          phone: null,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          auth_provider: 'google',
          total_points: 0,
          total_tokens_used: 0,
          avatar_url: session.user.user_metadata?.avatar_url || null
        };
        
        console.log('🚨 Usando dados de emergência:', emergencyUser);
        
        useAuthStore.setState({ 
          user: emergencyUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
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
          .from('user_profiles')  // ✅ CORREÇÃO: Tabela correta também aqui
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