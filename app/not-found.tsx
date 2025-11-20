import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: `Такої сторінки не знайдено`,
  openGraph: {
    title: "Подорожники",
    description: "Проєкт, створений для тих, хто живе подорожами.",
    url: "https://goit-08-zustand.vercel.app/not-found",
    // https://goit-08-zustand.vercel.app - треба замінити на посилання задеплоїного на версель проекту
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        //   можемо придумати свою картинку
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <>
      <Header />
      <Section>
        <Container>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>
              404 - Сторінку не знайдено
            </h2>
            <p className={styles.description}>
              На жаль, сторінка, яку ви шукаєте, не існує або була видалена.
            </p>
            <Link href="/" className={styles.link}>
              Повернутися на головну
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NotFound;
