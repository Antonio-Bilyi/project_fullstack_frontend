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
import type { User } from "@/types/user";

interface AllTravelersProps {
  dehydratedState: DehydratedState;
}

export default function TravellersClient({dehydratedState}: AllTravelersProps) {
    const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1440) setPerPage(12);
      else setPerPage(8);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

   const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<
  TravelersResponse, Error, TravelersResponse, [string, number]
>({
  queryKey: ["traveler", perPage],
  queryFn: ({ pageParam = 1 }: { pageParam?: number }) => 
    getAllTravelers(pageParam, perPage),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined,
});
      

const travelers: User[] = data?.pages.flatMap(page => page.data) ?? [];

 function handleLoadMore() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          {/* <div className={css.page}> */}
            <h2 className={css.title}>Мандрівники</h2>

            <TravellersList
              travelers={travelers}
              showViewAllButton={false}
          />
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