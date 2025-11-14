"use client";

import { useState, useEffect } from "react";
import TravellersList from "../../../components/TravellersList/TravellersList";
import css from "./travellers.module.css";
import Container from '../../../components/Container/Container';
import Section from '../../../components/Section/Section';
import { getAllTravelers, Traveler } from "../../../lib/api/clientsApi/getAllTravelers";

export default function Travellers() {
  const getInitialVisibleCount = () => {
    if (typeof window === "undefined") return 8;
    if (window.innerWidth >= 1440) return 12;
    if (window.innerWidth >= 768) return 8;
    return 8;
  };

  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(getInitialVisibleCount);

  // Завантажуємо користувачів 
  useEffect(() => {
    async function loadUsers() {
      try {
        const allTravelers = await getAllTravelers();
        setTravelers(allTravelers);
      } catch (error) {
        console.error("Помилка завантаження користувачів:", error);
      }
    }

    loadUsers();
  }, []);

  // Динамічне оновлення при зміні розміру вікна
  useEffect(() => {
    const handleResize = () => setVisibleCount(getInitialVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Підвантажити ще 4 мандрівники
  function handleLoadMore() {
    setVisibleCount((c) => c + 4);
  }

  return (
    <Section>
      <Container>
        <div className={css.page}>
          <h2 className={css.title}>Мандрівники</h2>

          <TravellersList
            travelers={travelers.slice(0, visibleCount)}
            showPagination={visibleCount < travelers.length}
            onLoadMore={handleLoadMore}
// треба добавити в компонент TravellersList
//   <button className={css.paginationBtn} onClick={onLoadMore}>
//   Переглянути всіх </button>
//             та в 
// type TravellersListProps={
//   travelers: Traveler[];
//   limit?: number;
//   showPagination?: boolean;
//   onLoadMore?: () => void; 
// };
          />
        </div>
      </Container>    
    </Section>   
  );
}
