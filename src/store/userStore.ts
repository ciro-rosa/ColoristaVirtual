import { create } from 'zustand';
import { User, Badge } from '../types';
import { mockUsers, mockBadges } from '../lib/mock-data';
import { simulateAIProcessing } from '../lib/utils';

interface UserState {
  users: User[];
  leaderboard: User[];
  isLoading: boolean;
  error: string | null;
  
  getUser: (id: string) => User | undefined;
  updateUser: (id: string, data: Partial<User>) => Promise<User>;
  addPoints: (userId: string, points: number) => Promise<User>;
  addBadge: (userId: string, badgeId: string) => Promise<User>;
  getLeaderboard: () => Promise<User[]>;
  getBadges: () => Badge[];
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [...mockUsers],
  leaderboard: [],
  isLoading: false,
  error: null,
  
  getUser: (id: string) => {
    return get().users.find(user => user.id === id);
  },
  
  updateUser: async (id: string, data: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      await simulateAIProcessing<void>(null);
      
      set(state => {
        const updatedUsers = state.users.map(user => {
          if (user.id === id) {
            return { ...user, ...data };
          }
          return user;
        });
        
        return { 
          users: updatedUsers,
          isLoading: false 
        };
      });
      
      return get().users.find(user => user.id === id)!;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao atualizar usuário', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  addPoints: async (userId: string, points: number) => {
    set({ isLoading: true, error: null });
    try {
      await simulateAIProcessing<void>(null);
      
      set(state => {
        const updatedUsers = state.users.map(user => {
          if (user.id === userId) {
            return { ...user, points: user.points + points };
          }
          return user;
        });
        
        return { 
          users: updatedUsers,
          isLoading: false 
        };
      });
      
      return get().users.find(user => user.id === userId)!;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao adicionar pontos', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  addBadge: async (userId: string, badgeId: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = get().users.find(u => u.id === userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      const badge = mockBadges.find(b => b.id === badgeId);
      if (!badge) {
        throw new Error('Medalha não encontrada');
      }
      
      // Verificar se o usuário já tem a medalha
      if (user.badges.some(b => b.id === badgeId)) {
        throw new Error('Usuário já possui esta medalha');
      }
      
      await simulateAIProcessing<void>(null);
      
      set(state => {
        const updatedUsers = state.users.map(user => {
          if (user.id === userId) {
            return { 
              ...user, 
              badges: [...user.badges, { ...badge, earnedAt: new Date() }] 
            };
          }
          return user;
        });
        
        return { 
          users: updatedUsers,
          isLoading: false 
        };
      });
      
      return get().users.find(user => user.id === userId)!;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao adicionar medalha', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getLeaderboard: async () => {
    set({ isLoading: true, error: null });
    try {
      // Ordenar usuários por pontos (decrescente)
      const leaderboard = [...get().users].sort((a, b) => b.points - a.points);
      
      await simulateAIProcessing<void>(null);
      
      set({ 
        leaderboard,
        isLoading: false 
      });
      
      return leaderboard;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao obter ranking', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getBadges: () => {
    return mockBadges;
  },
}));