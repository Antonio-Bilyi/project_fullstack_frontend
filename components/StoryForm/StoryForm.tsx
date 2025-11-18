"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {ChangeEvent, useState} from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import * as StoryService from "@/lib/api/clientsApi/clientApi";
import type { Story } from "@/types/story";
import type { Category } from "@/types/category";
import Container from "@/components/Container/Container";
import Modal from "@/components/Modal/Modal";
import styles from "./StoryForm.module.css";

interface StoryFormValues {
  title: string;
  category: string;
  article: string;
  img: File | null;
}

interface StoryFormProps {
  story?: Story;
  mode: "create" | "edit";
  onCancel?: () => void;
}

const createValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    title: Yup.string()
      .min(3, "Заголовок має містити мінімум 3 символи")
      .max(80, "Заголовок має містити максимум 80 символів")
      .required("Заголовок є обов'язковим"),
    category: Yup.string()
      .required("Категорія є обов'язковою"),
    article: Yup.string()
      .min(10, "Текст історії має містити мінімум 10 символів")
      .max(2500, "Текст історії має містити максимум 2500 символів")
      .required("Текст історії є обов'язковим"),
    img: isEditMode
      ? Yup.mixed<File>()
          .nullable()
          .test("fileSize", "Файл занадто великий (максимум 5MB)", (value) => {
            if (!value) return true;
            return value instanceof File && value.size <= 5 * 1024 * 1024;
          })
          .test(
            "fileType",
            "Підтримуються лише зображення (JPEG, PNG, WebP)",
            (value) => {
              if (!value) return true;
              return (
                value instanceof File &&
                ["image/jpeg", "image/png", "image/webp"].includes(value.type)
              );
            }
          )
      : Yup.mixed<File>()
          .required("Обкладинка статті є обов'язковою")
          .test("fileSize", "Файл занадто великий (максимум 5MB)", (value) => {
            if (!value) return false;
            return value instanceof File && value.size <= 5 * 1024 * 1024;
          })
          .test(
            "fileType",
            "Підтримуються лише зображення (JPEG, PNG, WebP)",
            (value) => {
              if (!value) return false;
              return (
                value instanceof File &&
                ["image/jpeg", "image/png", "image/webp"].includes(value.type)
              );
            }
          ),
  });

export default function StoryForm({ story, mode, onCancel }: StoryFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [existingImageUrl] = useState<string | undefined>(story?.img);

  const isEditMode = mode === "edit" && !!story;

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: StoryService.getCategories,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return isEditMode
        ? StoryService.updateStory(story._id, formData)
        : StoryService.createStory(formData);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
      router.push(`/stories/${data._id}`);
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  const formik = useFormik<StoryFormValues>({
    initialValues: {
      title: story?.title || "",
      category: typeof story?.category === 'object' ? story.category._id : story?.category || "",
      article: story?.article || "",
      img: null,
    },
    validationSchema: createValidationSchema(isEditMode),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("article", values.article);

      if (values.img) {
        formData.append(isEditMode ? "photo" : "img", values.img);
      }
      mutation.mutate(formData);
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("img", file);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      <Container>
        <h1 className={styles.title}>
          {isEditMode ? "Редагувати історію" : "Створити нову історію"}
        </h1>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.leftSection}>
                <div className={styles.discussionSection}>
                  <label className={styles.sectionLabel}>Обкладинка статті</label>
                  <div className={styles.imageUpload}>
                    {formik.values.img ? (
                      <Image
                        src={URL.createObjectURL(formik.values.img)}
                        alt="Preview"
                        width={800}
                        height={576}
                        style={{ width: "100%", height: "576px", objectFit: "cover", borderRadius: "16px" }}
                      />
                    ) : existingImageUrl ? (
                      <Image
                        src={existingImageUrl}
                        alt="Existing"
                        width={800}
                        height={576}
                        style={{ width: "100%", height: "576px", objectFit: "cover", borderRadius: "16px" }}
                      />
                    ) : (
                      <Image
                        src="/form/placeholder.png"
                        alt="Placeholder"
                        width={800}
                        height={576}
                        style={{ width: "100%", height: "576px", objectFit: "cover", borderRadius: "16px" }}
                      />
                    )}
                    <input
                      type="file"
                      id="img"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className={styles.uploadButton}
                      onClick={() => document.getElementById("img")?.click()}
                    >
                      Завантажити фото
                    </button>
                  </div>
                  {formik.touched.img && formik.errors.img && (
                    <div className={styles.error}>{formik.errors.img}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>
                    Заголовок
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={styles.input}
                    placeholder="Введіть заголовок історії"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className={styles.error}>{formik.errors.title}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.label}>
                    Категорія
                  </label>
                  <select
                    id="category"
                    name="category"
                    className={styles.select}
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Категорія</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <div className={styles.error}>{formik.errors.category}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="article" className={styles.label}>
                    Текст історії
                  </label>
                  <textarea
                    id="article"
                    name="article"
                    className={styles.textarea}
                    placeholder="Ваша історія тут"
                    value={formik.values.article}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={10}
                  />
                  {formik.touched.article && formik.errors.article && (
                    <div className={styles.error}>{formik.errors.article}</div>
                  )}
                </div>
              </div>

              <div className={styles.rightSection}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={mutation.isPending || !formik.isValid}
                >
                  {mutation.isPending ? "Збереження..." : "Зберегти"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={mutation.isPending}
                >
                  Відхилити
                </button>
              </div>
            </div>
        </form>
      </Container>

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Помилка"
        message="При збереженні історії сталася помилка"
        buttons={[
          {
            label: "Закрити",
            onClick: () => setShowErrorModal(false),
            variant: "primary",
          },
        ]}
      />
    </>
  );
}
