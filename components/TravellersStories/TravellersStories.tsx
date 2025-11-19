"use client";

import React from "react";
import type { Story, StoriesHttpResponse } from "@/types/story";
import type { TravelerStoriesHttpResponse } from "@/types/traveller";
import type { ApiResponse } from "@/types/api";
import css from "./TravellersStories.module.css";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";

interface TravellersStoriesProps {
  pages?: ApiResponse<StoriesHttpResponse | TravelerStoriesHttpResponse>[];
  stories?: Story[];
}

export default function TravellersStories({
  pages,
  stories,
}: TravellersStoriesProps) {
  if (stories) {
    if (stories.length === 0) {
      return null;
    }

    return (
      <ul className={css.storiesList}>
        {stories.map((story) => (
          <TravellersStoriesItem story={story} key={story._id} />
        ))}
      </ul>
    );
  }

  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <>
      <ul className={css.storiesList}>
        {pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data?.data && "stories" in group.data.data
              ? group.data.data.stories.map((story) => (
                  <TravellersStoriesItem story={story} key={story._id} />
                ))
              : Array.isArray(group.data?.data) &&
                group.data.data.map((story) => (
                  <TravellersStoriesItem story={story} key={story._id} />
                ))}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}
