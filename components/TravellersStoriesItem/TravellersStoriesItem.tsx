"use client";

import type { Story } from "@/types/story.ts";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { addStoryToSave } from "@/lib/api/clientsApi/addStoryToSave";
import { removeStoryFromSave } from "@/lib/api/clientsApi/removeStoryFromSave";
import { useUserAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

//стилі
import css from "./TravellersStoriesItem.module.css";
import { useMutation } from "@tanstack/react-query";

// пропси
interface TravellersStoriesItemProps {
  story: Story;
}

// розмітка карткти з Історією та обробка
export default function TravellersStoriesItem({
  story,
}: TravellersStoriesItemProps) {
  // стани
  const ownerId =
    typeof story.category !== "string" ? story.ownerId._id : story.ownerId;

  const user = useUserAuthStore((state) => state.user);
  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);
  const updUserFavArticles = useUserAuthStore(
    (state) => state.updateFavouriteArticles
  );

  const [isOwner, setIsOwner] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [favoriteCount, setfavoriteCount] = useState(story.favoriteCount);

  const router = useRouter();

  useEffect(() => {
    const updateStates = () => {
      if (!isAuthenticated || !user) return;
      if (ownerId === user._id) setIsOwner(true);
      if (!user.favouriteArticles) return;
      setIsFavourite(user.favouriteArticles.includes(story._id));
    };

    updateStates();
  }, [isAuthenticated, user, story._id, ownerId]);

  // видалення історії з улюблених
  const deleteStoryMutation = useMutation({
    mutationFn: async () => {
      const res = await removeStoryFromSave(story._id);
      return res.data;
    },
    onSuccess(data) {
      if (data?.user?.favouriteArticles)
        updUserFavArticles(data?.user?.favouriteArticles);
      if (data?.story) setfavoriteCount(data.story.favoriteCount);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // додавання історії до улюблених
  const addStoryMutation = useMutation({
    // mutationKey: 'addStory',
    mutationFn: async () => {
      const res = await addStoryToSave(story._id);
      return res.data;
    },
    onSuccess(data) {
      if (data?.user?.favouriteArticles)
        updUserFavArticles(data?.user?.favouriteArticles);
      if (data?.story) setfavoriteCount(data.story.favoriteCount);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // перенаправляємо користувача на сторінку реєстрації
  function pushToRegister() {
    router.push("/auth/register");
    return;
  }

  // перенаправляємо користувача на сторінку входу
  function pushToLogin() {
    router.push("/auth/login");
    return;
  }

  // закрити вікно
  function closeModal() {
    setIsOpenModal(false);
    // router.back();
    return;
  }

  // додати історію
  function addStory() {
    toast.success("Історія додається...", { duration: 1200 });
    addStoryMutation.mutate(story._id);
    return;
  }

  function removeStory() {
    toast.success("Історія видаляється...", { duration: 1200 });
    deleteStoryMutation.mutate(story._id);
    return;
  }

  // обробник збереження/видалення/редагування історії
  function handleOnCLick() {
    if (!isAuthenticated) return setIsOpenModal(true);
    if (isOwner) {
      router.push(`/stories/${story._id}`);
    }
    if (isFavourite) {
      removeStory();
    } else {
      addStory();
    }
    return;
  }

  const dateStory = getDate(story.date);

  const categoryName =
    typeof story.category !== "string" ? story.category.name : "No Category";
  const ownerPhoto =
    typeof story.ownerId !== "string"
      ? story.ownerId.avatarUrl
      : "/avatar/defaultAvatar.webp";
  const ownerName =
    typeof story.ownerId !== "string" ? story.ownerId.name : "Default foto";

  return (
    <>
      <li className={css.StoryItem}>
        <Image
          src={story.img}
          alt={story.title}
          width={335}
          height={223}
          decoding="async"
          loading="lazy"
          className={css.storyImg}
        />
        <div className={css.contentCard}>
          {/* <div className={css.storyInfoWrapper}> */}
          <p className={css.category}>{categoryName}</p>
          <h3 className={css.storyTittle}>{story.title}</h3>
          <p className={css.storyArticle}>{story.article}</p>
          {/* </div> */}
          <div className={css.userInfo}>
            <Image
              src={ownerPhoto}
              alt="user.name"
              width={48}
              height={48}
              decoding="async"
              loading="lazy"
              className={css.userImg}
            />
            <div className={css.userNameWrapper}>
              <p className={css.userName}>{ownerName}</p>
              <div className={css.favWrapper}>
                <p className={css.storyDate}>{dateStory}</p>
                <p className={css.storyFavCnt}>
                  {favoriteCount}
                  {/* {story.favoriteCount} */}
                  <svg className={css.storySaveSvg} width="16" height="16">
                    <use href="/svg-sprite.svg#icon-bookmark"></use>
                  </svg>
                </p>
              </div>
            </div>
          </div>
          <div className={css.buttonsSection}>
            <Link
              href={`/stories/${story._id}`}
              prefetch={false}
              className={css.storyDetailLink}
            >
              Переглянути статтю
            </Link>
            <button
              // href={`/stories/${storyId}/edit`}
              onClick={handleOnCLick}
              // onClick={pushToLogin}
              className={
                isFavourite
                  ? `${css.storyEditLink} || ' ' || ${css.isFavourite}`
                  : css.storyEditLink
              }
            >
              <svg className={css.storySaveSvg} width="24" height="24">
                {isOwner ? (
                  <use href="/svg-sprite.svg#icon-edit"></use>
                ) : (
                  <use href="/svg-sprite.svg#icon-bookmark"></use>
                )}
              </svg>
            </button>
          </div>
        </div>
      </li>
      {isOpenModal && (
        <ConfirmModal
          isOpen={true}
          title="Помилка під час збереження"
          description="Щоб зберегти статтю вам потрібно увійти, якщо немає облікового запису, зареєструйтесь."
          confirmButtonText="Зареєструватись"
          cancelButtonText="Увійти"
          onConfirm={pushToRegister}
          onCancel={pushToLogin}
          onClose={closeModal}
        ></ConfirmModal>
      )}
      <Toaster position="top-center" />
    </>
  );
}

//переводимо дату в належний вигляд
function getDate(date: string): string {
  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}
