"use client";

import {
  HydrationBoundary,
  useInfiniteQuery,
  DehydratedState,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getTravellerStories } from "@/lib/api/clientsApi/getTravellerStories";
import Section from "../Section/Section";
import Container from "../Container/Container";
import TravellersStories from "../TravellersStories/TravellersStories";
import MessageNoStories from "../MessageNoStories/MessageNoStories";
import TravellerInfo from "../TravellerInfo/TravellerInfo";
import Pagination from "../Pagination/Pagination";
import { ApiResponse } from "@/types/api";
import { TravelerStoriesHttpResponse, Traveler } from "@/types/traveller";
import css from "./TravellerById.module.css";

interface TravellerByIdClientProps {
  dehydratedState: DehydratedState;
  travellerId: string;
  travellerInfo: Traveler;
}

export default function TravellerByIdClient({
  dehydratedState,
  travellerId,
  travellerInfo,
}: TravellerByIdClientProps) {
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) setPerPage(4);
      else if (windowWidth < 1440) setPerPage(4);
      else setPerPage(6);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["traveller-stories", travellerId, perPage] as const,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getTravellerStories(travellerId, pageParam, perPage),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ApiResponse<TravelerStoriesHttpResponse>) => {
        if (lastPage.data?.hasNextPage) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },
    });

  function handleLoadMore() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const hasStories =
    data?.pages &&
    data.pages.length > 0 &&
    data.pages[0].data?.data?.stories.length > 0;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          <TravellerInfo traveller={travellerInfo} />
          <h2 className={css.title}>Історії Мандрівника</h2>
          {hasStories ? (
            <>
              <TravellersStories pages={data?.pages} />
              {isFetchingNextPage ? (
                <Pagination name={"Вже скоро..."} onClick={handleLoadMore} />
              ) : hasNextPage ? (
                <Pagination name={"Показати ще"} onClick={handleLoadMore} />
              ) : null}
            </>
          ) : (
            <MessageNoStories variant="other" />
          )}
        </Container>
      </Section>
    </HydrationBoundary>
  );
}

