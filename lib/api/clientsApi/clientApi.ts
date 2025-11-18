"use client";

import { handleApiError } from "../handleApiError";
import { User } from "@/types/user";
import { Story } from "@/types/story";
import { Category } from "@/types/category";
import { nextServer } from "../api";

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

interface ApiResponse<T> {
  status?: number;
  data?: T;
  message?: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<ApiResponse<User>> => {
  const res = await nextServer.post<ApiResponse<User>>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post("/auth/logout");
  } catch (error) {
    handleApiError(error, "logout");
    throw error;
  }
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.post<{ success: boolean }>("/auth/refresh");
    return res.status === 200 && res.data.success === true;
  } catch (error) {
    return false;
  }
};

export const createStory = async (formData: FormData): Promise<Story> => {
  const res = await nextServer.post<ApiResponse<Story>>("/stories", formData);

  if (res.data.status && res.data.status >= 400) {
    throw new Error(res.data.message || "Failed to create story");
  }

  if (!res.data.data) {
    throw new Error("No data returned from server");
  }

  return res.data.data;
};

export const updateStory = async (
  storyId: string,
  formData: FormData
): Promise<Story> => {
  const res = await nextServer.patch<ApiResponse<Story>>(
    `/stories/${storyId}`,
    formData
  );

  if (res.data.status && res.data.status >= 400) {
    throw new Error(res.data.message || "Failed to update story");
  }

  if (!res.data.data) {
    throw new Error("No data returned from server");
  }

  return res.data.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await nextServer.get<{ data: Category[] }>("/categories");
  return res.data.data;
};

export const getStory = async (storyId: string): Promise<Story> => {
  const res = await nextServer.get<ApiResponse<Story>>(`/stories/${storyId}`);

  if (res.data.status && res.data.status >= 400) {
    throw new Error(res.data.message || "Failed to fetch story");
  }

  if (!res.data.data) {
    throw new Error("No data returned from server");
  }

  return res.data.data;
};
