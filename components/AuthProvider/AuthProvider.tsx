"use client";

import { getUserProfile } from "@/lib/api/clientsApi/getUserProfile";
import { useUserAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuth = useUserAuthStore((state) => state.setUser);
  const clearIsAuth = useUserAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await getUserProfile();
      if (response) {
        setAuth(response.data);
      } else {
        clearIsAuth();
      }
    };
    fetchCurrentUser();
  }, [setAuth, clearIsAuth]);

  return children;
};

export default AuthProvider;
