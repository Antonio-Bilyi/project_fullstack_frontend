import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { nextServer } from '../api';
import type { AxiosResponse } from "axios";
import type { Story } from '@/types/story';

interface ApiResponse<T> {
  status?: number;
  data?: T;
  message?: string;
}

export const checkServerSession = async (): Promise<AxiosResponse> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.post('/auth/refresh', {}, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export class BadRequestError extends Error {
  constructor(message: string = 'Invalid request') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export const getServerStory = async (storyId: string): Promise<Story> => {
  const cookieStore = await cookies();

  try {
    const res = await nextServer.get<ApiResponse<Story>>(`/stories/${storyId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (res.data.status === 404) {
      notFound();
    }

    if (res.data.status === 400) {
      throw new BadRequestError('Невірний ID історії');
    }

    if (res.data.status && res.data.status >= 400) {
      throw new Error(res.data.message || 'Server error');
    }

    if (!res.data.data) {
      notFound();
    }

    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound();
    }

    if (error.response?.status === 400) {
      throw new BadRequestError('Невірний ID історії');
    }

    throw error;
  }
};
