import { create } from 'zustand';
import type { User, LoginForm, RegisterForm } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginForm) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.login(credentials);
      
      // Mock user data for now
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  register: async (userData: RegisterForm) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.register(userData);
      
      // Mock user data for now
      const mockUser: User = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  updateProfile: async (userData: Partial<User>) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    
    try {
      // TODO: Replace with actual API call
      // const response = await authApi.updateProfile(userData);
      
      set({
        user: { ...user, ...userData },
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Profile update failed',
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
