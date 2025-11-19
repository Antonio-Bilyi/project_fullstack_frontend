"use client";

import Link from "next/link";
import { useUserAuthStore } from "@/lib/store/authStore";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import css from "./DesktopNav.module.css";

export default function DesktopNav({ isHome = false }) {
  const { isAuthenticated } = useUserAuthStore();

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <div className={css.navGroup}>
          <li className={css.navGroupItem}>
            <Link
              href="/"
              className={
                isHome ? css.homeNavGroupLink : css.defaultNavGroupLink
              }
            >
              Головна
            </Link>
          </li>
          <li className={css.navGroupItem}>
            <Link
              href="/stories"
              className={
                isHome ? css.homeNavGroupLink : css.defaultNavGroupLink
              }
            >
              Історії
            </Link>
          </li>
          <li className={css.navGroupItem}>
            <Link
              href="/travellers"
              className={
                isHome ? css.homeNavGroupLink : css.defaultNavGroupLink
              }
            >
              Мандрівники
            </Link>
          </li>

          {isAuthenticated && (
            <li className={css.navGroupItem}>
              <Link
                href="/profile"
                className={
                  isHome ? css.homeNavGroupLink : css.defaultNavGroupLink
                }
              >
                Мій Профіль
              </Link>
            </li>
          )}
        </div>

        <div className={css.authGroup}>
          {isAuthenticated && (
            <li>
              <Link
                href="/stories/create"
                className={
                  isHome
                    ? css.homePublishStoryLink
                    : css.defaultPublishStoryLink
                }
              >
                Опублікувати історію
              </Link>
            </li>
          )}
          <AuthNavigation isHome={isHome} />
        </div>
      </ul>
    </nav>
  );
}
