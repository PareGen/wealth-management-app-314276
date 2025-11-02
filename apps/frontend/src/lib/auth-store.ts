import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => {
        set({ user, accessToken });
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          // Set cookie for server-side middleware (Zustand persist format)
          const cookieValue = JSON.stringify({ state: { user, accessToken } });
          document.cookie = `auth-storage=${encodeURIComponent(cookieValue)}; path=/; max-age=86400; SameSite=Lax`;
        }
      },
      logout: () => {
        set({ user: null, accessToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          // Remove cookie
          document.cookie = 'auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      },
      isAuthenticated: () => {
        const state = get();
        return state.accessToken !== null && state.user !== null;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
