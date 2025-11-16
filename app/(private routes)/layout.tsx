'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}