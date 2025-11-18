'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkSession } from '@/lib/api/clientsApi/clientApi';
import { useUserAuthStore } from '@/lib/store/authStore';
import TravelLoader from '@/components/TravelLoader/TravelLoader';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const clearIsAuthenticated = useUserAuthStore((state) => state.clearIsAuthenticated);
  const setUser = useUserAuthStore((state) => state.setUser);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const isAuthenticated = await checkSession(); 
        if (isAuthenticated) {
          
          if (pathname.startsWith('/auth')) {
            router.push('/');
          }
        } else {
          clearIsAuthenticated(); 
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [router, pathname, setUser, clearIsAuthenticated]);

  if (loading) {
    return (
      <TravelLoader />
    );
  }

  return <>{children}</>;
}
