import { create } from 'zustand';
import { User } from '../types';
import { mockUsers } from '../lib/mock-data';
import { simulateAIProcessing } from '../lib/utils';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
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
      // Simulação de API call
      const response = await simulateAIProcessing<User | undefined>(
        mockUsers.find(user => user.email === email)
      );
      
      if (!response) {
        throw new Error('Usuário ou senha incorretos');
      }
      
      set({ 
        user: response, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante login', 
        isLoading: false 
      });
    }
  },
  
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de login Google
      const response = await simulateAIProcessing<User>(mockUsers[0]);
      
      set({ 
        user: response, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante login com Google', 
        isLoading: false 
      });
    }
  },
  
  register: async (name: string, email: string, phone: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Verificar se o e-mail já existe
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        throw new Error('Este e-mail já está registrado');
      }
      
      // Simulação de registro
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        phone,
        points: 0,
        badges: [],
        createdAt: new Date(),
      };
      
      await simulateAIProcessing<void>(null);
      
      set({ 
        user: newUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro durante o registro', 
        isLoading: false 
      });
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      // Verificar se o e-mail existe
      const existingUser = mockUsers.find(user => user.email === email);
      if (!existingUser) {
        throw new Error('E-mail não encontrado');
      }
      
      // Simulação de envio de e-mail
      await simulateAIProcessing<void>(null);
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao processar recuperação de senha', 
        isLoading: false 
      });
    }
  },
  
  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulação de reset de senha
      await simulateAIProcessing<void>(null);
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha', 
        isLoading: false 
      });
    }
  },
}));