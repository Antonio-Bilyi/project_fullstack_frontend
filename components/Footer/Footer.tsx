import Link from "next/link";
import Container from "../Container/Container";
import css from './Footer.module.css';
import AuthNavigation from "../AuthNavigationFooter/AuthNavigationFooter";



export default function Footer() {
  return (

  <footer className={css.footer}>
    <Container>
      <div className={css.footer_box}>
        <div className={css.footer_content}>
          <Link href='/' aria-label="Home" className={css.footer_logo}>
            <svg width={20} height={22} className={css.footer_logo_item}>
              <use href="/svg-sprite.svg#icon-logo"></use>
            </svg>
            <span className={css.logo_span}>Подорожники</span>
          </Link>

          <ul className={css.footer_socialmedia_list}>
            <li className={css.footer_socialmedia_list_item}>
              <Link href='https://www.facebook.com' target="blank">
                <svg width={32} height={32} className={css.footer_socialmedia_icon}>
                  <use href="/svg-sprite.svg#icon-facebook"></use>
                </svg>
              </Link>
            </li>

            <li className={css.footer_socialmedia_list_item}>
              <Link href='https://www.instagram.com' target="blank">
                <svg width={32} height={32} className={css.footer_socialmedia_icon}>
                  <use href="/svg-sprite.svg#icon-instagram"></use>
                </svg>            
              </Link>
            </li>

            <li className={css.footer_socialmedia_list_item}>
              <Link href='https://www.x.com' target="blank">
                <svg width={32} height={32} className={css.footer_socialmedia_icon}>
                  <use href="/svg-sprite.svg#icon-twitter"></use>
                </svg>
              </Link>
            </li>

            <li className={css.footer_socialmedia_list_item}>
              <Link href='https://www.youtube.com' target="blank">
                <svg width={32} height={32} className={css.footer_socialmedia_icon}>
                  <use href="/svg-sprite.svg#icon-youtube"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
          <AuthNavigation />
      </div>

        <p className={css.footer_privacy_policy}>© 2025 Подорожники. Усі права захищені.</p>

          

     
    </Container>
  </footer>
  )
 
  
}
