import { cookies } from 'next/headers';
import { nextServer } from '../api';
import type { AxiosResponse } from "axios";
import { PaginatedStoriesResponse, GetStoriesParams } from '../../../types/story';
import { Category } from '../../../types/category';

export const checkServerSession = async (): Promise<AxiosResponse> => {
  // Дістаємо поточні cookie
  const cookieStore =  cookies();
  const res = await nextServer.post('/auth/refresh', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getStoriesServer = async (params?: GetStoriesParams): Promise<PaginatedStoriesResponse> => {
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

export const getCategoriesServer = async (): Promise<Category[]> => {
  const res = await nextServer.get<{ data: Category[] }>('/categories');
  return res.data.data;
};
