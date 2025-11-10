import { User } from '@/types/user';
import { create } from 'zustand'; 

type UserAuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
}

export const useUserAuthStore = create<UserAuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set({user, isAuthenticated: true }),
    clearIsAuthenticated: () => set({user: null, isAuthenticated: false}),
}));