"use client";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import { getStory } from "@/lib/api/clientsApi/clientApi";
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import { removeStoryFromSave } from "@/lib/api/clientsApi/removeStoryFromSave";
import { addStoryToSave } from "@/lib/api/clientsApi/addStoryToSave";
import { useEffect, useState } from "react";
import { useUserAuthStore } from "@/lib/store/authStore";
import toast, { Toaster } from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";

export default function StoryDetailsClient() {
  const { storyId } = useParams<{ storyId: string }>();
  const {
    data: story,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStory(storyId),
    refetchOnMount: false,
  });

  const user = useUserAuthStore((state) => state.user);
  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);
  const updUserFavArticles = useUserAuthStore(
    (state) => state.updateFavouriteArticles
  );

  const ownerId =
    typeof story?.ownerId === "string" ? story.ownerId : story?.ownerId._id;

  const [isFavourite, setIsFavourite] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateStates = () => {
      if (!isAuthenticated || !user) return;
      if (ownerId === user._id) setIsOwner(true);
      if (!user.favouriteArticles) return;
      setIsFavourite(user.favouriteArticles.includes(storyId));
    };

    updateStates();
  }, [isAuthenticated, user, storyId, ownerId]);

  // видалення історії з улюблених
  const deleteStoryMutation = useMutation({
    mutationFn: async (storyId: string) => {
      const res = await removeStoryFromSave(storyId);
      return res.data;
    },
    onSuccess(data) {
      if (data?.user?.favouriteArticles)
        updUserFavArticles(data?.user?.favouriteArticles);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // додавання історії до улюблених
  const addStoryMutation = useMutation({
    // mutationKey: 'addStory',
    mutationFn: async (storyId: string) => {
      const res = await addStoryToSave(storyId);
      return res.data;
    },
    onSuccess(data) {
      if (data?.user?.favouriteArticles)
        updUserFavArticles(data?.user?.favouriteArticles);
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
    addStoryMutation.mutate(storyId);
    return;
  }

  function removeStory() {
    toast.success("Історія видаляється...", { duration: 1200 });
    deleteStoryMutation.mutate(storyId);
    return;
  }

  // обробник збереження/видалення/редагування історії
  function handleOnCLick() {
    if (!isAuthenticated) return setIsOpenModal(true);
    if (isOwner) {
      router.push(`/stories/${storyId}`);
    }
    if (isFavourite) {
      removeStory();
    } else {
      addStory();
    }
    return;
  }

  const categoryName =
    typeof story?.category !== "string" ? story?.category.name : "No Category";
  const ownerName =
    typeof story?.ownerId !== "string" ? story?.ownerId.name : "Default foto";
  const dateStory = story?.date ? getDate(story?.date) : "";

  return (
    <>
      <Section classes={["storyDetailSection"]}>
        <Container>
          {/* повідомлення про помилку */}
          {isLoading && <p>Loading, please wait...</p>}
          {(isError || !story) && (
            <p>Такої історії не існує. Перевірте, будь ласка, запит</p>
          )}
          {/* в разі успішного запиту */}
          {isSuccess && (
            <div className={css.storyWrapper}>
              <h2 className={css.title}>{story.title}</h2>
              <div className={css.withCategoryWrapper}>
                <div className={css.AboutInfoWrapper}>
                  <div className={css.AboutItemWrapper}>
                    <p className={css.headAboutInfo}>{"Автор статті"}</p>
                    <p className={css.aboutInfo}>{ownerName}</p>
                  </div>
                  <div className={css.AboutItemWrapper}>
                    <p className={css.headAboutInfo}>{"Опубліковано"}</p>
                    <p className={css.aboutInfo}>{dateStory}</p>
                  </div>
                </div>
                <div className={css.Category}>{categoryName}</div>
              </div>
              <Image
                src={story.img}
                alt={story.title}
                width={335}
                height={223}
                decoding="async"
                loading="lazy"
                className={css.storyImg}
              />
              <div className={css.articleWrapper}>
                <p className={css.article}>{story.article}</p>
                {/*компонент збереження історії*/}
                <div className={css.saveBox}>
                  <p className={css.headSave}>
                    {isOwner
                      ? "Редагувати історію"
                      : isFavourite
                        ? "Видалити із збережених"
                        : "Збережіть собі історію"}
                  </p>
                  <p className={css.textSave}>
                    {isOwner
                      ? "Додайте цікавинок до вашої історії"
                      : isFavourite
                        ? "Тут ви можете видалити історію із збережених"
                        : "Вона буде доступна у вашому профілі у розділі збережене"}
                  </p>
                  <button className={css.btnSave} onClick={handleOnCLick}>
                    {isOwner
                      ? "Редагувати"
                      : isFavourite
                        ? "Видалити"
                        : "Зберегти"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
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
