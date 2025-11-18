"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import Section from "../Section/Section";
import Container from "../Container/Container";

export default function StoryDetails({ story }) {
  if (!story) {
    return <p>Статтю не знайдено</p>;
  }

  const { img, title, article, category, owner, date, favoriteCount, _id } =
    story;

  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  async function handleSave() {
    setSaveError("");

    try {
      const res = await fetch(
        `https://project-fullstack-backend.onrender.com/saved/${_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Помилка при збереженні");
      }

      setIsSaved(true);
    } catch (error) {
      setSaveError("Не вдалося зберегти історію. Спробуйте ще раз.");
    }
  }

  return (
    <Section>
      <Container>
        <div className={css.storyDatails}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.publish}>
            <div className={css.authorBox}>
              <p className={css.authorName}>{`Автор статті ${owner?.name}`}</p>
              <p className={css.date}>{`Опубліковано ${formattedDate}`}</p>
            </div >
            <p className={css.category}>{category?.name}</p>
          </div>
          <div className={css.imgBox}>
            <Image
              src={img}
              alt={title}
              width={1312}
              height={874}
              className={css.mainImg}
            />
          </div>
          <div className={css.saveWrapper}>
            <p className={css.article}>{article}</p>
            <div className={css.saveBlock}>
              <h2 className={css.saveTitle}>Збережіть собі історію</h2>
              <p className={css.saveText}>Вона буде доступна у вашому профілі у розділі збережене</p>

              <button
                onClick={handleSave}
                className={css.saveButton}
                disabled={isSaved}
              >
                {isSaved ? "Збережено ✓" : "Зберегти"}
              </button>
            </div>
            {saveError && <p className={css.error}>{saveError}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
}




