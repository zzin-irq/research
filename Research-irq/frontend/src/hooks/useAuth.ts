import { create } from 'zustand';

type Role = 'user' | 'admin' | 'super';
export type AuthUser = { id: string; email: string; name: string; role: Role };

type AuthStore = {
  user: AuthUser | null;
  status: 'loading' | 'authed' | 'guest';
  setUser: (u: AuthUser | null) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  status: 'guest',
  setUser: (u) => set({ user: u, status: u ? 'authed' : 'guest' }),
  logout: () => {
    // The real implementation hits /api/v1/auth/logout to revoke the session.
    set({ user: null, status: 'guest' });
  }
}));

export function useAuth() {
  return useAuthStore();
}
