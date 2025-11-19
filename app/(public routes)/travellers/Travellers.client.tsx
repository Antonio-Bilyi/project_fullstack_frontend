"use client";

import { useState, useEffect } from "react";
import TravellersList from "@/components/TravellersList/TravellersList";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import css from "./travellers.module.css";
import type { TravelersList } from "@/types/user";


interface Props {
 initialTravelers: TravelersList}

export default function TravellersClient({ initialTravelers }: Props) {
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 8;
    if (window.innerWidth >= 1440) return 12;
    return 8;
  });

    useEffect(() => {
      const resizeHandler = () => {
        if (window.innerWidth >= 1440) setVisibleCount(12);
        else setVisibleCount(8);
      };

      window.addEventListener("resize", resizeHandler);
      return () => window.removeEventListener("resize", resizeHandler);
    }, []);


    const handleLoadMore = () => {
      setVisibleCount((c) => c + 4);
    };
  
  const hasMore = visibleCount < initialTravelers.data.length;
  console.log(initialTravelers.data.slice(0, visibleCount));

    return (
      <Section>
        <Container>
          <div className={css.page}>
            <h2 className={css.title}>Мандрівники</h2>

            <TravellersList
              travelers={initialTravelers.data.slice(0, visibleCount)}
              showViewAllButton={false}
            />
            {hasMore && (
            <button
              onClick={handleLoadMore}
              className={css.loadMoreButton}
            >
              Показати ще
            </button>
          )}
          </div>
        </Container>
      </Section>
    );
  }