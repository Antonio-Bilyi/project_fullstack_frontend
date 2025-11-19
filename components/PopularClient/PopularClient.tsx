"use client";

import {
  HydrationBoundary,
  useInfiniteQuery,
  //   keepPreviousData,
  DehydratedState,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllStories } from "@/lib/api/clientsApi/getAllStories";
import Section from "../Section/Section";
import Container from "../Container/Container";
// import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./PopularClient.module.css";
import { ApiResponse } from "@/types/api";
import { StoriesHttpResponse } from "@/types/story";
import Pagination from "../Pagination/Pagination";

interface PopularClientProps {
  dehydratedState: DehydratedState;
}

export default function PopularClient({ dehydratedState }: PopularClientProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) setPerPage(3);
      else if (windowWidth < 1440) setPerPage(4);
      else setPerPage(3);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  function handleLoadMore() {
    if (hasNextPage && !isFetchingNextPage) {
      setPage((prev) => prev + 1);
    }
  }

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    isLoading,
    error,
    // isSuccess,
  } = useInfiniteQuery({
    queryKey: [
      "stories",
      page,
      perPage,
      "ALL",
      "desc",
      "favoriteCount",
    ] as const,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getAllStories(pageParam, perPage, "ALL", "desc", "favoriteCount"),
    initialPageParam: page, // Используем page из useState
    getNextPageParam: (lastPage: ApiResponse<StoriesHttpResponse>) => {
      // Если есть данные и есть еще страницы
      if (lastPage.data?.hasNextPage) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
    //   useInfinityQuery({
    // queryKey: ["stories", page, perPage],
    // queryFn: ({ pageParam }: { pageParam: number }) =>
    //   getAllStories(pageParam, perPage, "ALL", "desc", "favoriteCount"),
    // initialPageParam: page,
    //   getNextPageParam: (lastPage): ApiResponse<StoriesHttpResponse> => {
    //       if (lastPage.data?.hasMore) {
    //           return lastPage.data.currentPage + 1;
    //       }
    //       return undefined;
    //     };
    // // queryFn: () => getAllStories(page, perPage, "all", "desc", "favoriteCount"),
    // placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          <h2 className={css.title}>Популярні історії</h2>
          {/* {data?.data?.data?.length ? (
            <TravellersStories stories={data.data}></TravellersStories>
          ) : (
            <p>Something went wrong</p>
          )} */}

          {!isFetchingNextPage ? (
            <Pagination
              name={"Завантажується..."}
              onClick={handleLoadMore}
            ></Pagination>
          ) : hasNextPage ? (
            <Pagination
              name={"Переглянути ще"}
              onClick={handleLoadMore}
            ></Pagination>
          ) : null}

          {/* <button className={css.btnLoadMore} onClick={handleLoadMore}>
            Переглянути ще
          </button> */}
        </Container>
      </Section>
    </HydrationBoundary>
  );
}
