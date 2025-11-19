"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useUserAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientsApi/clientApi";
import Image from "next/image";

type AuthNavigationProps = {
  isHome?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
};

export default function AuthNavigation({
  isHome = false,
  onClose,
  isMobile = false,
}: AuthNavigationProps) {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useUserAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/");
      if (onClose) onClose();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navItem}>
          <Link
            href="/auth/login"
            className={`${isHome ? css.homeLoginLink : css.defaultLoginLink} ${isMobile ? css.mobileLoginLink : ""}`}
            onClick={() => onClose && onClose()}
          >
            Вхід
          </Link>
        </li>

        <li className={css.navItem}>
          <Link
            href="/auth/register"
            className={`${isHome ? css.homeRegisterLink : css.defaultRegisterLink} ${isMobile ? css.mobileRegisterLink : ""}`}
            onClick={() => onClose && onClose()}
          >
            Реєстрація
          </Link>
        </li>
      </>
    );
  }

  return (
    <li
      className={`${css.navItem} ${css.authUser} ${isMobile ? css.authUserMobile : ""} ${!isMobile && isHome ? css.authUserHome : ""}`}
    >
      {/* Имя + аватар */}
      <div className={`${css.userInfo} ${isMobile ? css.userInfoMobile : ""}`}>
        {user?.avatarUrl && (
          <Image
            src={user.avatarUrl}
            alt="Avatar"
            width={32}
            height={32}
            className={css.avatar}
          />
        )}
        <span
          className={`${css.userName} ${isMobile ? css.userNameMobile : ""}`}
        >
          {user?.name || user?.email}
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`${css.logoutBtn} ${isMobile ? css.logoutBtnMobile : ""}`}
      >
        <svg width={24} height={24} className={css.logOutIcon}>
          <use href="/svg-sprite.svg#icon-logout"></use>
        </svg>
      </button>
    </li>
  );
}
