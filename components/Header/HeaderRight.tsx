"use client";

import css from "./HeaderRight.module.css";
import { useUserAuthStore } from "@/lib/store/authStore";
import DesktopNav from "./DesktopNav";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function HeaderRight({ isHome = false }) {
  const { isAuthenticated } = useUserAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={css.right}>
      {/* Desktop navigation */}
      <div className={css.desktopOnly}>
        <DesktopNav isHome={isHome} />
      </div>

      {/* Tablet: publish button */}
      <div className={css.tabletOnly}>
        {isAuthenticated && (
          <Link
            href="/stories/create"
            className={isHome ? css.homePublishBtn : css.defaultPublishBtn}
          >
            Опублікувати історію
          </Link>
        )}
      </div>

      {/* Always visible on mobile + tablet */}
      <div className={css.mobileMenuBtn}>
        <button className={css.burgerBtn} onClick={() => setIsMenuOpen(true)}>
          <svg width={24} height={24} className={css.burgerIcon}>
            <use href="/svg-sprite.svg#icon-burger-menu"></use>
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isHome={isHome}
      />
    </div>
  );
}
