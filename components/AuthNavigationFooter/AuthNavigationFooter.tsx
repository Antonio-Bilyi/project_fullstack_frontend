'use client'

import css from './AuthNavigationFooter.module.css';
import { useRouter } from 'next/navigation';
import { useUserAuthStore } from "@/lib/store/authStore";



export default function AuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useUserAuthStore(state => state.isAuthenticated);

  const handleNavClick = (href: string) => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      router.push(href);
    }
  };

  return (
    <nav aria-label='Footer-Navigation'>
      <ul className={css.footer_navigation_list}>
        <li
          className={css.footer_navigation_list_item}
          onClick={() => handleNavClick('/')}>
          Головна
        </li>

        <li
          className={css.footer_navigation_list_item}
          onClick={() => handleNavClick('/stories')}>
          Історії
        </li>

        <li
          className={css.footer_navigation_list_item}
          onClick={() => handleNavClick('/travellers')}>
          Мандрівники
        </li>
      </ul>
    </nav>
  )
};
