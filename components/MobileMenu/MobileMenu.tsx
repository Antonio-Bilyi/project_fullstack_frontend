"use client";

import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./MobileMenu.module.css";
import { useUserAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  isHome: boolean;
};

export default function MobileMenu({
  isOpen,
  onClose,
  isHome,
}: MobileMenuProps) {
  const { isAuthenticated } = useUserAuthStore();

  //Закрытие по Esc + Блокируем скролл страницы, когда меню открыто
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!isOpen) return null;

  // Закрытие при клике на backdrop
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.menu}>
        <div className={css.headerWrapper}>
          <div className={css.logo_container}>
            <Link href="/" className={css.logo} onClick={onClose}>
              <svg width={22} height={22} aria-hidden="true" focusable="false">
                <use href="/svg-sprite.svg#icon-logo"></use>
              </svg>
              <p className={css.logoText}>Подорожники</p>
            </Link>
          </div>

          <button
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <svg width={24} height={24} aria-hidden="true" focusable="false">
              <use href="/svg-sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>

        <nav className={css.nav} aria-label="Mobile navigation">
          <ul className={css.navList}>
            <li>
              <Link href="/" onClick={onClose} className={css.navLink}>
                Головна
              </Link>
            </li>
            <li>
              <Link href="/stories" onClick={onClose} className={css.navLink}>
                Історії
              </Link>
            </li>
            <li>
              <Link
                href="/travellers"
                onClick={onClose}
                className={css.navLink}
              >
                Мандрівники
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <Link href="/profile" onClick={onClose} className={css.navLink}>
                  Мій Профіль
                </Link>
              </li>
            )}
          </ul>

          {isAuthenticated && (
            <Link
              href="/stories/create"
              onClick={onClose}
              className={css.publishStoryBtn}
            >
              Опублікувати історію
            </Link>
          )}

          {/* Login/Register OR User Menu */}
          <ul className={css.authBlock}>
            <AuthNavigation isMobile onClose={onClose} />
          </ul>
        </nav>
      </div>
    </div>,
    document.body
  );
}
