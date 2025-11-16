import css from "./About.module.css";
import Container from "../Container/Container";
import Section from "../Section/Section";

export default function About() {
  return (
    <Section>
      <Container>
        <div className={css.about_header}>
          <h2 className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.text}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об`єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        <ul className={css.list}>
          <li className={css.list_item}>
            <svg className={css.about_svg} width="48" height="48">
              <use href="/svg-sprite.svg#icon-about-1-star"></use>
            </svg>
            <p className={css.list_title}>Наша місія</p>
            <p className={css.list_text}>
              Об`єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>
          <li className={css.list_item}>
            <svg className={css.about_svg} width="48" height="48">
              <use href="/svg-sprite.svg#icon-about-2-bag"></use>
            </svg>
            <p className={css.list_title}>Автентичні історії</p>
            <p className={css.list_text}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>
          <li className={css.list_item}>
            <svg className={css.about_svg} width="48" height="48">
              <use href="/svg-sprite.svg#icon-about-3-persons"></use>
            </svg>
            <p className={css.list_title}>Ваша спільнота</p>
            <p className={css.list_text}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
