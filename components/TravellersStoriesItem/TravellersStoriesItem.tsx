"use client";

import type { Story } from "@/types/story.ts";
// import type { Category } from "@/types/categories.ts";
import Link from "next/link";
import Image from "next/image";

//стилі
import css from "./TravellersStoriesItem.module.css";

interface TravellersStoriesItemProps {
  story: Story;
}

export default function TravellersStoriesItem({
  story,
}: TravellersStoriesItemProps) {
  const dateStory = getDate(story.date);
  const categoryName =
    typeof story.category !== "string" ? story.category.name : "No Category";
  const ownerPhoto =
    typeof story.ownerId !== "string"
      ? story.ownerId.avatarUrl
      : "/avatar/defaultAvatar.webp";
  const ownerName =
    typeof story.ownerId !== "string" ? story.ownerId.name : "Default foto";

  return (
    <li className={css.StoryItem}>
      <Image
        src={story.img}
        alt={story.title}
        width={335}
        height={223}
        decoding="async"
        loading="lazy"
        className={css.storyImg}
        unoptimized
      />
      <div className={css.contentCard}>
        {/* <div className={css.storyInfoWrapper}> */}
        <p className={css.category}>{categoryName}</p>
        {/* замінити на отримання окремої категорії */}
        <h3 className={css.storyTittle}>{story.title}</h3>
        <p className={css.storyArticle}>{story.article}</p>
        {/* </div> */}
        <div className={css.userInfo}>
          <Image
            src={ownerPhoto}
            alt="user.name"
            width={48}
            height={48}
            decoding="async"
            loading="lazy"
            className={css.userImg}
            unoptimized
          />
          <div className={css.userNameWrapper}>
            <p className={css.userName}>{ownerName}</p>
            <div className={css.favWrapper}>
              <p className={css.storyDate}>{dateStory}</p>
              <p className={css.storyFavCnt}>
                {story.favoriteCount}
                <svg className={css.storySaveSvg} width="16" height="16">
                  <use href="/svg-sprite.svg#icon-bookmark"></use>
                </svg>
              </p>
            </div>
          </div>
        </div>
        <div className={css.buttonsSection}>
          <Link
            href="/stories/${story.id}"
            prefetch={false}
            className={css.storyDetailLink}
          >
            Переглянути статтю
          </Link>
          <Link
            href="/stories/${storyId}/edit"
            prefetch={false}
            className={css.storyEditLink}
          >
            <svg className={css.storySaveSvg} width="24" height="24">
              <use href="/svg-sprite.svg#icon-bookmark"></use>
            </svg>
          </Link>
        </div>
      </div>
    </li>
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
