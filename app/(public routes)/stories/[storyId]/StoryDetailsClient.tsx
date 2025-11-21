"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import { getStory } from "@/lib/api/clientsApi/clientApi";
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";

export default function StoryDetailsClient() {
  const { storyId } = useParams<{ storyId: string }>();

  const {
    data: story,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStory(storyId),
    refetchOnMount: false,
  });

  /* повідомлення про завантаження */
  // if (isLoading) {
  //   return (
  //     <Section>
  //       <Container>
  //         <p>Loading, please wait...</p>
  //       </Container>
  //     </Section>
  //   );
  // }

  const categoryName =
    typeof story?.category !== "string" ? story?.category.name : "No Category";
  const ownerName =
    typeof story?.ownerId !== "string" ? story?.ownerId.name : "Default foto";
  const dateStory = story?.date ? getDate(story?.date) : "";

  return (
    <Section classes={["storyDetailSection"]}>
      <Container>
        {/* повідомлення про помилку */}
        {isLoading && <p>Loading, please wait...</p>}
        {(isError || !story) && (
          <p>Такої історії не існує. Перевірте, будь ласка, запит</p>
        )}
        {/* в разі успішного запиту */}
        {isSuccess && (
          <div className={css.storyWrapper}>
            <h2 className={css.title}>{story.title}</h2>
            <div className={css.withCategoryWrapper}>
              <div className={css.AboutInfoWrapper}>
                <div className={css.AboutItemWrapper}>
                  <p className={css.headAboutInfo}>{"Автор статті"}</p>
                  <p className={css.aboutInfo}>{ownerName}</p>
                </div>
                <div className={css.AboutItemWrapper}>
                  <p className={css.headAboutInfo}>{"Опубліковано"}</p>
                  <p className={css.aboutInfo}>{dateStory}</p>
                </div>
              </div>
              <div className={css.Category}>{categoryName}</div>
            </div>
            <Image
              src={story.img}
              alt={story.title}
              width={335}
              height={223}
              decoding="async"
              loading="lazy"
              className={css.storyImg}
            />
            <div className={css.articleWrapper}>
              <p className={css.article}>{story.article}</p>
              {/*компонент збереження історії*/}
              <div className={css.saveBox}>
                <p className={css.headSave}>Збережіть собі історію</p>
                <p className={css.textSave}>
                  Вона буде доступна у вашому профілі у розділі збережене
                </p>
                <button className={css.btnSave}>Зберегти</button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

//переводимо дату в належний вигляд
function getDate(date: string): string {
  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}
