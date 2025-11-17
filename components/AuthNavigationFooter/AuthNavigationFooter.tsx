'use client'

import css from './AuthNavigationFooter.module.css';
import { useRouter } from 'next/navigation';


export default function AuthNavigation() {
  const router = useRouter();


  return (
    <nav aria-label='Footer-Navigation'>
      <ul className={css.footer_navigation_list}>
        <li
          className={css.footer_navigation_list_item}
          onClick={() => router.push('/')}>
          Головна
        </li>

        <li
          className={css.footer_navigation_list_item}
          onClick={() => router.push('/stories')}>
          Історії
        </li>

        <li
          className={css.footer_navigation_list_item}
          onClick={() => router.push('/travellers')}>
          Мандрівники
        </li>
      </ul>
    </nav>
  )
};
