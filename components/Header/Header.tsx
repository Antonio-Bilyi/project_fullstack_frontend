"use client";

import Link from "next/link";
import css from "./Header.module.css";
import HeaderRight from "./HeaderRight";
import Container from "../Container/Container";

export default function Header({ isHome = false }) {
  return (
    <header className={isHome ? css.homeContainer : css.defaultContainer}>
      <Container>
        <div className={css.header_container}>
          <div className={css.logo_container}>
            <Link href="/" className={css.logo}>
              <svg width={22} height={22}>
                <use href="/svg-sprite.svg#icon-logo"></use>
              </svg>
              <p className={isHome ? css.homeLogoText : css.defaultLogoText}>
                Подорожники
              </p>
            </Link>
          </div>
          <HeaderRight isHome={isHome} />
        </div>
      </Container>
    </header>
  );
}
