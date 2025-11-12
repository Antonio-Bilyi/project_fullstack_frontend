// стилі
import css from "./page.module.css";
// компоненти
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
import TravellersList from "@/components/TravellersList/TravellersList";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";

export default function Home() {
  return (
    // <main>
    <>
      <section className={`${css.container} ${css.background}`} id="Hero">
        <Hero />
      </section>
      <section className={css.container}>
        <About />
      </section>
      <section className={css.container}>
        <Popular />
      </section>
      <section className={css.container}>
        <TravellersList />
      </section>
      <section className={css.container}>
        <Join />
      </section>
    </>
    // </main>
  );
}
