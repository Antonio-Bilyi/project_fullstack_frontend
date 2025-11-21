"use client";

import { useState, useEffect } from "react";
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import Pagination from "@/components/Pagination/Pagination";
import type { User } from '@/types/user';
import type { Story } from '@/types/story';
import { toast } from 'react-hot-toast';
import { getUserProfile } from "@/lib/api/clientsApi/getUserPrivateProfile"
import styles from "./page.module.css"
import Container from "@/components/Container/Container";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"own" | "saved">("own");
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4); 
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const updatePerPage = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1440) setPerPage(6);
      else setPerPage(4);
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  async function fetchStories(currentPage: number, reset = false) {
    try {
      if (!user) return;
      setIsLoading(true);

      const res = await fetch(
        `/api/users/me/${user._id}?storiesType=${activeTab}&page=${currentPage}&perPage=${perPage}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        toast.error(`Помилка: ${res.status}`);
        return;
      }

      const result = await res.json();

      if (!result.data) {
        toast.error("Некоректна відповідь від сервера");
        return;
      }

      if (reset) {
        setStories(result.data.stories);
      } else {
        setStories(prev => [...prev, ...result.data.stories]);
      }

      setHasNextPage(result.data.hasNextPage ?? false);
    } catch (err: unknown) {
      toast.error("Помилка отримання історій");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const userData = await getUserProfile();
        if (!userData) {
          toast.error("Не вдалося отримати дані користувача");
          setUser(null);
        }
        setUser(userData);
        setPage(1);
        await fetchStories(1, true);
      } catch {
        toast.error("Помилка отримання користувача");
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [activeTab, perPage]);

  if (isLoading) return <p className={styles.noUser}>Завантаження...</p>;

  if (!user) return <p className={styles.noUser}>Немає даних користувача</p>;

  return (
    <div className={styles.profilePage}>
      <Container>
        <section className={styles.infoSection}>
          <TravellerInfo user={user} />
        </section>
        
        <section className={styles.storiesSection}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "saved" ? styles.active : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Збережені історії
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "own" ? styles.active : ""}`}
              onClick={() => setActiveTab("own")}
            >
              Мої історії
            </button>
          </div>

          {stories.length === 0 ? (
            <MessageNoStories variant={activeTab} />
          ) : (
            <>
              <TravellersStories stories={stories} />
              {isLoading ? (
                <Pagination name="Завантаження..." onClick={() => {}} />
              ) : hasNextPage ? (
                <Pagination
                  name="Показати ще"
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchStories(nextPage);
                  }}
                />
              ) : null}
            </>
          )}
        </section>
      </Container>
    </div>
  );
}
