import type { User } from "@/types/user";

export const updateUserProfile = async (formData: FormData): Promise<User> => {
  // Надсилаємо всі дані (avatar, description) на Next API,
  // який проксить далі на бекенд /api/users/avatar.
  const res = await fetch("/api/users/avatar", {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to update profile");
  }

  return result.data?.data || result.data || result;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await fetch("/api/auth/currentUser", {
    method: "GET",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to fetch user");
  }

  return result.data?.data || result.data || result;
};

