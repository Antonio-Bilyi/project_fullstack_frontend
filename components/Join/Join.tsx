"use client";

import { useRouter } from "next/navigation";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import css from "./Join.module.css";
import { useUserAuthStore } from "@/lib/store/authStore";

export default function Join() {
  const router = useRouter();
  const { isAuthenticated } = useUserAuthStore();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/auth/register");
    }
  };

  return (
    <Section idSection={"Join"}>
      <Container>
        <div className={css.join}>
          <h2 className={css.title}>
            Приєднуйтесь до нашої <span className={css.break}>спільноти</span>
          </h2>
          <p className={css.text}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <button className={css.button} onClick={handleClick}>
            {isAuthenticated ? "Збережені" : "Зареєструватися"}
          </button>
        </div>
      </Container>
    </Section>
  );
}
