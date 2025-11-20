import { Metadata } from "next";
import css from "./page.module.css";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";

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
    <Section>
      <Container>
        <div className={css.wrapper}>
          <h2 className={css.title}>404 - Page not found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </Container>
    </Section>
  );
};

export default NotFound;
