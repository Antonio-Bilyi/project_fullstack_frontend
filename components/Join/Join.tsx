'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Join/Join.module.css';
import { useUserAuthStore } from '@/lib/api/store/authStore';

export default function JoinS() {
  const router = useRouter();
  const { isAuthenticated, setUser, clearIsAuthenticated } = useUserAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Not authorized');
        const data = await res.json();

        if (data.user) {
          setUser(data.user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <section className={styles.joinSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Приєднуйтесь до нашої спільноти</h2>
        <p className={styles.text}>
          Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.
        </p>

        <button onClick={handleClick} className={styles.button}>
          {isAuthenticated ? 'Збережені' : 'Зареєструватися'}
        </button>
      </div>
    </section>
  );
}
