import { create } from 'zustand';
import { Post, Comment } from '../types';
import { mockPosts } from '../lib/mock-data';
import { simulateAIProcessing } from '../lib/utils';

interface GalleryState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  
  getPosts: () => Post[];
  getUserPosts: (userId: string) => Post[];
  getPost: (id: string) => Post | undefined;
  addPost: (userId: string, userName: string, userPhotoUrl: string | undefined, beforeImageUrl: string, afterImageUrl: string, description: string) => Promise<Post>;
  likePost: (postId: string) => Promise<void>;
  addComment: (postId: string, userId: string, userName: string, userPhotoUrl: string | undefined, content: string) => Promise<Comment>;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  posts: [...mockPosts],
  isLoading: false,
  error: null,
  
  getPosts: () => {
    return get().posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  getUserPosts: (userId: string) => {
    return get().posts.filter(post => post.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  getPost: (id: string) => {
    return get().posts.find(post => post.id === id);
  },
  
  addPost: async (userId: string, userName: string, userPhotoUrl: string | undefined, beforeImageUrl: string, afterImageUrl: string, description: string) => {
    set({ isLoading: true, error: null });
    try {
      const newPost: Post = {
        id: `${get().posts.length + 1}`,
        userId,
        userName,
        userPhotoUrl,
        beforeImageUrl,
        afterImageUrl,
        description,
        likes: 0,
        comments: [],
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<Post>(newPost);
      
      set(state => ({ 
        posts: [...state.posts, result],
        isLoading: false 
      }));
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao adicionar publicação', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  likePost: async (postId: string) => {
    set({ isLoading: true, error: null });
    try {
      await simulateAIProcessing<void>(null);
      
      set(state => {
        const updatedPosts = state.posts.map(post => {
          if (post.id === postId) {
            return { ...post, likes: post.likes + 1 };
          }
          return post;
        });
        
        return { 
          posts: updatedPosts,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao curtir publicação', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  addComment: async (postId: string, userId: string, userName: string, userPhotoUrl: string | undefined, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const post = get().posts.find(p => p.id === postId);
      if (!post) {
        throw new Error('Publicação não encontrada');
      }
      
      const newComment: Comment = {
        id: `${post.comments.length + 1}`,
        userId,
        userName,
        userPhotoUrl,
        content,
        createdAt: new Date(),
      };
      
      const result = await simulateAIProcessing<Comment>(newComment);
      
      set(state => {
        const updatedPosts = state.posts.map(post => {
          if (post.id === postId) {
            return { 
              ...post, 
              comments: [...post.comments, result] 
            };
          }
          return post;
        });
        
        return { 
          posts: updatedPosts,
          isLoading: false 
        };
      });
      
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao adicionar comentário', 
        isLoading: false 
      });
      throw error;
    }
  },
}));