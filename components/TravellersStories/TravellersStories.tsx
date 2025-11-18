"use client";

import type { Story } from "@/types/story";
// стилі
import css from "./TravellersStories.module.css";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";

interface TravellersStoriesProps {
  stories: Story[];
}

export default function TravellersStories({ stories }: TravellersStoriesProps) {
  return (
    <ul className={css.storiesList}>
      {stories.map((story) => (
        <li key={story._id} className={css.StoryItem}>
          <TravellersStoriesItem story={story}></TravellersStoriesItem>
        </li>
      ))}
    </ul>
  );
}
