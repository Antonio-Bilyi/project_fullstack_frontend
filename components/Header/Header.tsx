"use client";

import Link from "next/link";
import { useUserAuthStore } from "@/lib/api/store/authStore";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  const { isAuthenticated } = useUserAuthStore();

  return (
    <header className={css.container}>
      <div className={css.header_container}>
        <div className={css.logo_container}>
          <Link href="/" className={css.logo}>
            <svg width={22} height={22}>
              <use href="/svg-sprite.svg#icon-logo"></use>
            </svg>
            <svg width={123} height={20}>
              <use href="/svg-sprite.svg#icon-logo-text"></use>
            </svg>
          </Link>
        </div>

        {/*навігація планшет/мобілка*/}
        <div className={css.nav_tablet}>
          {isAuthenticated && (
            <Link
              href="/stories/create/page.tsx"
              className={css.create_story_btn}
            >
              Опублікувати історію
            </Link>
          )}

          <button className={css.burger_btn}>
            <div className={css.btn_background}>
              <svg width={24} height={24} className={css.burger_icon}>
                <use href="/svg-sprite.svg#icon-burger-menu"></use>
              </svg>
            </div>
          </button>
        </div>

        {/* Навигація десктоп */}
        <nav className={css.nav_desktop}>
          <AuthNavigation />
        </nav>
      </div>
    </header>
  );
}
