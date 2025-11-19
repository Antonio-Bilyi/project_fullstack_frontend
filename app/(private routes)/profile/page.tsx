"use client";

import { useState, useEffect } from "react";
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import type { User } from '@/types/user';
import type { Story } from '@/types/story';
import { toast } from 'react-hot-toast';
import { getUserProfile } from "@/lib/api/clientsApi/getUserProfile";
import styles from "./page.module.css"

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"own" | "saved">("own");
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserProfile();
        if (!userData) { 
          toast.error("Не вдалося отримати дані користувача");
          return;
        }

        setUser(userData);

        const res = await fetch(`/users/me/${userData.id}?storiesType=${activeTab}`, {
          credentials: "include",
        });

        if (res.status === 401) { 
          toast.error("Користувач не авторизований. Будь ласка, увійдіть у систему.");
          return;
        }

        if (res.status === 403) { 
          toast.error("Доступ заборонено. Ви намагаєтесь отримати не свої історії.");
          return;
        }

        if (res.status === 404) { 
          toast.error("Користувача не знайдено.");
          return;
        }

        if (!res.ok) {
          toast.error(`Помилка: ${res.status}`);
          return;
        }

        const result = await res.json();

        if (!result.data) { 
          toast.error("Некоректна відповідь від сервера");
          return;
        }
        
        setStories(result.data.stories);

      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Невідома помилка");
        }
      }
    }

    fetchData();
  }, [activeTab]);

  if (!user) return <p className={styles.noUser}>Немає даних користувача</p>;

  return (
    <div className={styles.profilePage}>
      <TravellerInfo user={user} />

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
        <TravellersStories stories={stories} />
      )}
    </div>
  );
}