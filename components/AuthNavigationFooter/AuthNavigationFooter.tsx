import Link from 'next/link';
import css from './AuthNavigationFooter.module.css';


export default function AuthNavigation() {
  return (
    <nav aria-label='Footer-Navigation'>
      <ul className={css.footer_navigation_list}>
        <li className={css.footer_navigation_list_item}>
          <Link href='/'>Головна</Link>
        </li>

        <li className={css.footer_navigation_list_item}>
          <Link href='/stories'>Історії</Link>
        </li>

        <li className={css.footer_navigation_list_item}>
          <Link href='/travellers'>Мандрівники</Link>
        </li>
      </ul>
    </nav>
  )
};
