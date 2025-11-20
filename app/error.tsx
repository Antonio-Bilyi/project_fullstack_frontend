"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by error boundary:", error);
  }, [error]);

  const isBadRequest = error.name === "BadRequestError";

  return (
    <>
      <Header />
      <Section>
        <Container>
          <div className={styles.wrapper}>
              {isBadRequest ? (
                <>
                  <h2 className={styles.title}>
                    400 - Невірний запит
                  </h2>
                  <p className={styles.description}>
                    {error.message || "Невірний ID або параметри запиту."}
                  </p>
                  <Link href="/stories" className={styles.link}>
                    Повернутися до списку історій
                  </Link>
                </>
              ) : (
                <>
                  <h2 className={styles.title}>
                    Щось пішло не так!
                  </h2>
                  <p className={styles.description}>
                    Виникла помилка при завантаженні сторінки. Спробуйте ще раз або
                    поверніться на головну.
                  </p>
                  <div className={styles.buttonGroup}>
                    <button onClick={reset} className={styles.retryButton}>
                      Спробувати ще раз
                    </button>
                    <Link href="/" className={styles.link}>
                      Повернутися на головну
                    </Link>
                  </div>
                </>
              )}
          </div>
        </Container>
      </Section>
    </>
  );
}