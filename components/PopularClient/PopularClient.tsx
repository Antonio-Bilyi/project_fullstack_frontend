"use client";

import {
  HydrationBoundary,
  useInfiniteQuery,
  //   keepPreviousData,
  DehydratedState,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getAllStories } from "@/lib/api/clientsApi/getAllStories";
import Section from "../Section/Section";
import Container from "../Container/Container";
// import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./PopularClient.module.css";
import { ApiResponse } from "@/types/api";
import { StoriesHttpResponse } from "@/types/story";
import Pagination from "../Pagination/Pagination";
import TravellersStories from "@/components/TravellersStories/TravellersStories";

interface PopularClientProps {
  dehydratedState?: DehydratedState;
  mobPerPage: number;
  // tabPerPage: number;
  // deskPerPage: number;
  paginationShow: boolean;
}

export default function PopularClient({
  dehydratedState,
  mobPerPage,
  // tabPerPage,
  // deskPerPage,
  paginationShow,
}: PopularClientProps) {
  const [perPage, setPerPage] = useState(mobPerPage);
  const [isPagination, setIsPagination] = useState(paginationShow);

  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) setPerPage(mobPerPage);
      else if (windowWidth < 1440) setPerPage(4);
      else setPerPage(3);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, [mobPerPage]);

  useEffect(() => {
    const updatePagination = () => {
      setIsPagination(paginationShow);
    };

    updatePagination();
  }, [paginationShow]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["stories", perPage, "ALL", "desc", "favoriteCount"] as const,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getAllStories(pageParam, perPage, "ALL", "desc", "favoriteCount"),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ApiResponse<StoriesHttpResponse>) => {
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

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          <h2 className={css.title}>Популярні історії</h2>
          <TravellersStories pages={data?.pages} />

          {isPagination && isFetchingNextPage ? (
            <Pagination
              name={"Вже скоро..."}
              onClick={handleLoadMore}
            ></Pagination>
          ) : hasNextPage ? (
            <Pagination
              name={"Показати ще"}
              onClick={handleLoadMore}
            ></Pagination>
          ) : null}
        </Container>
      </Section>
    </HydrationBoundary>
  );
}
