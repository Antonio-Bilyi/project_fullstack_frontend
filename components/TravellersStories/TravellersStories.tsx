"use client";

import React from "react";
import type { StoriesHttpResponse } from "@/types/story";
import type { ApiResponse } from "@/types/api";
// стилі
import css from "./TravellersStories.module.css";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";

interface TravellersStoriesProps {
  pages?: ApiResponse<StoriesHttpResponse>[];
}

export default function TravellersStories({ pages }: TravellersStoriesProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <>
      <ul className={css.storiesList}>
        {pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data?.data?.map((story) => (
              <TravellersStoriesItem
                story={story}
                key={story._id}
              ></TravellersStoriesItem>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}
