"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateUserProfile } from "@/lib/api/clientsApi/editProfileApi";
import type { User } from "@/types/user";
import Container from "@/components/Container/Container";
import Modal from "@/components/Modal/Modal";
import styles from "./EditProfileForm.module.css";

interface EditProfileFormValues {
  description: string;
  avatar: File | null;
}

const MAX_DESCRIPTION_LENGTH = 150;

const validationSchema = Yup.object({
  description: Yup.string()
    .max(MAX_DESCRIPTION_LENGTH, `Опис має містити максимум ${MAX_DESCRIPTION_LENGTH} символів`)
    .nullable(),
  avatar: Yup.mixed<File>()
    .nullable()
    .test("fileSize", "Файл занадто великий (максимум 500KB)", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 500 * 1024;
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
    ),
});

export default function EditProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return updateUserProfile(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      setShowSuccessModal(true);
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      description: currentUser?.description || "",
      avatar: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (values.description !== (currentUser?.description || "")) {
        formData.append("description", values.description.trim());
      }

      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      if (formData.has("description") || formData.has("avatar")) {
        mutation.mutate(formData);
      }
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("avatar", file);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("avatar", null);
    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const remainingChars = MAX_DESCRIPTION_LENGTH - formik.values.description.length;

  const hasRealAvatar = Boolean(
    currentUser?.avatarUrl && 
    currentUser.avatarUrl.trim() !== "" && 
    !currentUser.avatarUrl.includes("placeholder") &&
    !currentUser.avatarUrl.includes("default") &&
    !currentUser.avatarUrl.includes("istockphoto")
  );

  const hasChanges =
    formik.values.description !== (currentUser?.description || "") ||
    formik.values.avatar !== null;

  if (isLoading) {
    return (
      <Container>
        <div className={styles.loading}>Завантаження...</div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.header}>
              <h1 className={styles.title}>Давайте познайомимось ближче</h1>
            </div>

            <div className={styles.content}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Аватар</label>
                <div className={styles.avatarSection}>
                  <div className={styles.avatarPreview}>
                    {formik.values.avatar ? (
                      <img
                        src={URL.createObjectURL(formik.values.avatar)}
                        alt="Preview"
                        className={styles.avatarImage}
                      />
                    ) : hasRealAvatar && currentUser?.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt="Avatar"
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path
                            d="M24 24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C19.5817 8 16 11.5817 16 16C16 20.4183 19.5817 24 24 24Z"
                            fill="currentColor"
                            opacity="0.3"
                          />
                          <path
                            d="M24 28C16.268 28 10 34.268 10 42H38C38 34.268 31.732 28 24 28Z"
                            fill="currentColor"
                            opacity="0.3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {formik.values.avatar || hasRealAvatar ? (
                    <button
                      type="button"
                      className={styles.uploadButton}
                      onClick={handleRemoveImage}
                    >
                      Видалити фото
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.uploadButton}
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      Завантажити фото
                    </button>
                  )}
                </div>
                {formik.touched.avatar && formik.errors.avatar && (
                  <div className={styles.error}>{formik.errors.avatar}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  Короткий опис
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={styles.textarea}
                  placeholder="Розкажіть більше про вас"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  rows={5}
                />
                <div className={styles.charCounter}>
                  Лишилось символів: {remainingChars}
                </div>
                {formik.touched.description && formik.errors.description && (
                  <div className={styles.error}>{formik.errors.description}</div>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={mutation.isPending || !formik.isValid || !hasChanges}
              >
                {mutation.isPending ? "Збереження..." : "Зберегти"}
              </button>
            </div>
          </form>
        </div>
      </Container>

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Помилка"
        message="При збереженні профілю сталася помилка"
        buttons={[
          {
            label: "Закрити",
            onClick: () => setShowErrorModal(false),
            variant: "primary",
          },
        ]}
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/profile");
        }}
        title="Успішно"
        message="Профіль успішно оновлено"
        buttons={[
          {
            label: "До профілю",
            onClick: () => {
              setShowSuccessModal(false);
              router.push("/profile");
            },
            variant: "primary",
          },
        ]}
      />
    </>
  );
}

