import { User } from '@/types/user';
import { create } from 'zustand'; 

type UserAuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
    updateFavouriteArticles: (newFavArticles: [string]) => void;
}

export const useUserAuthStore = create<UserAuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: User) => set({user, isAuthenticated: true }),
    clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
    updateFavouriteArticles: (newFavArticles) => set((state) => ({
        user: state.user ? { ...state.user, favouriteArticles: newFavArticles }
            : null,
    }))
}));