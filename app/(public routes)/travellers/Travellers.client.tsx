"use client";

import { useState, useEffect } from "react";
import TravellersList from "@/components/TravellersList/TravellersList";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import css from "./travellers.module.css";
import { User } from "../../../types/user";


interface Props {
  initialTravelers: User[];
}

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

    return (
      <Section>
        <Container>
          <div className={css.page}>
            <h2 className={css.title}>Мандрівники</h2>

            <TravellersList
              travelers={initialTravelers.slice(0, visibleCount)}
              showPagination={visibleCount < initialTravelers.length}
              onLoadMore={handleLoadMore}
            />
          </div>
        </Container>
      </Section>
    );
  }