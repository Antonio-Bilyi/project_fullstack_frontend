"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuthStore } from "@/lib/api/store/authStore";
// import { logOut } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useUserAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await logOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearIsAuthenticated();
      router.replace("/login");
    }
  };

  if (isAuthenticated) {
    return (
      <ul className={css.nav_list}>
        <li>
          <Link href="/">Головна</Link>
        </li>
        <li>
          <Link href="/stories">Історії</Link>
        </li>
        <li>
          <Link href="/travellers">Мандрівники</Link>
        </li>
        <li>
          <Link href="/profile">Мій Профіль</Link>
        </li>
        <li>
          <Link href="/stories/create">Опублікувати історію</Link>
        </li>
        <li>
          <Link href="/profile" className={css.profile_link}>
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || "User"}
                className={css.avatar}
              />
            ) : (
              <span>{user?.name}</span>
            )}
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className={css.logout_btn}>
            <svg width={24} height={24}>
              <use href="/svg-sprite.svg#icon-logout"></use>
            </svg>
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className={css.nav_list}>
      <li>
        <Link href="/">Головна</Link>
      </li>
      <li>
        <Link href="/stories">Історії</Link>
      </li>
      <li>
        <Link href="/travelers">Мандрівники</Link>
      </li>
      <li>
        <Link href="/login">Вхід</Link>
      </li>
      <li>
        <Link href="/register">Реєстрація</Link>
      </li>
    </ul>
  );
}
