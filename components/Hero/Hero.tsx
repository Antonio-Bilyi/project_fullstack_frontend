import css from "./Hero.module.css";
import Container from "../Container/Container";
import Section from "../Section/Section";

export default function Hero() {
  return (
    <Section classes={["hero"]}>
      <Container classes={["background"]}>
        <div className={css.hero_text}>
          <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={css.text}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
        </div>
        <a href="#Join" className={css.button}>
          Доєднатись
        </a>
      </Container>
    </Section>
  );
}
