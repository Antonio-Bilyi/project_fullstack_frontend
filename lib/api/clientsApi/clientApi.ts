'use client';

import { handleApiError } from "../handleApiError";
import { User } from '../../../types/user';
import { Story, PaginatedStoriesResponse, GetStoriesParams } from '../../../types/story';
import { Category } from '../../../types/category';
import { nextServer } from '../api';

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post('/auth/logout');
  } catch (error) {
    handleApiError(error, 'logout');
    throw error;
  }
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.post<{ success: boolean }>('/auth/refresh');
  return res.data.success;
};

export const getStories = async (params?: GetStoriesParams): Promise<PaginatedStoriesResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
  if (params?.category) queryParams.append('category', params.category);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const url = `/stories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await nextServer.get<{ data: PaginatedStoriesResponse }>(url);

  return res.data.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await nextServer.get<{ data: Category[] }>('/categories');
  return res.data.data;
};

export const addStoryToFavorites = async (storyId: string): Promise<{ story: Story; user: User }> => {
  const res = await nextServer.post<{ data: { story: Story; user: User } }>('/users/addStoryToSave', { storyId });
  return res.data.data;
};

export const removeStoryFromFavorites = async (storyId: string): Promise<{ story: Story; user: User }> => {
  const res = await nextServer.delete<{ data: { story: Story; user: User } }>('/users/removeStoryFromSave', { data: { storyId } });
  return res.data.data;
};
