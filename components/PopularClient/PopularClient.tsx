"use client";

import {
  HydrationBoundary,
  useQuery,
  DehydratedState,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllStories } from "@/lib/api/clientsApi/getAllStories";
import Section from "../Section/Section";
import Container from "../Container/Container";
import TravellersStories from "../TravellersStories/TravellersStories";

interface PopularClientProps {
  dehydratedState: DehydratedState;
}

export default function PopularClient({ dehydratedState }: PopularClientProps) {
  const page = 1;
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

  const {
    data,
    // , isLoading, isError, isSuccess
  } = useQuery({
    queryKey: ["stories", page, perPage],
    queryFn: () => getAllStories(page, perPage, "all", "favoriteCount", "desc"),
    refetchOnMount: false,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          <h2>Популярні історії</h2>
          {data?.data?.data?.length ? (
            <TravellersStories stories={data.data.data}></TravellersStories>
          ) : (
            <p>Something went wrong</p>
          )}
        </Container>
      </Section>
    </HydrationBoundary>
  );
}
