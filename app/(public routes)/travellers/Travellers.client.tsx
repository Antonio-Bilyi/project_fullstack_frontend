"use client";

import {
  HydrationBoundary,
  useInfiniteQuery,
  DehydratedState,
} from "@tanstack/react-query";
import { getAllTravelers } from "@/lib/api/clientsApi/getAllTravelers";
import Pagination from "../../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import TravellersList from "@/components/TravellersList/TravellersList";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import css from "./travellers.module.css";
import type { TravelersResponse } from "@/types/traveller";
import { ApiResponse } from "@/types/api";
import React from "react";

interface AllTravelersProps {
  dehydratedState: DehydratedState;
}

export default function TravellersClient({
  dehydratedState,
}: AllTravelersProps) {
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 1440) setPerPage(8);
      else setPerPage(12);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["travelers", perPage] as const,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getAllTravelers(pageParam, perPage),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ApiResponse<TravelersResponse>) => {
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

  const allTravelers =
    data?.pages
      .flatMap((page) => page.data?.data || []) // Звертаємося до page.data?.data
      .filter(Boolean) || [];

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          {/* <div className={css.page}> */}
          <h2 className={css.title}>Мандрівники</h2>

          <TravellersList travelers={allTravelers} showViewAllButton={false} />

          <div className={css.paginationWrapper}>
            {isFetchingNextPage ? (
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
          </div>
          {/* </div> */}
        </Container>
      </Section>
    </HydrationBoundary>
  );
}
