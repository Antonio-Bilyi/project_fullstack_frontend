import { cookies } from 'next/headers';
import { nextServer } from '../api';
import type { AxiosResponse } from "axios";

export const checkServerSession = async (): Promise<AxiosResponse> => {
  // Дістаємо поточні cookie
  const cookieStore =  cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};
