"use client";

import { getUserProfile } from "@/lib/api/clientsApi/getUserProfile";
import { useUserAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuth = useUserAuthStore((state) => state.setUser);
  const clearIsAuth = useUserAuthStore((state) => state.clearIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          setAuth(user);
        } else {
          clearIsAuth();
        }
      } catch (error) {
        clearIsAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [setAuth, clearIsAuth]);

  if (isLoading) return null;

  return children;
};

export default AuthProvider;
