import { nextServer } from '@/lib/api/api';
import type { User } from "@/types/user";


export const getAllTravelers = async (): Promise<User[]> => {
  try {
    
    const response = await nextServer.get<{ data: User[] }>("/users", {
      params: {
        page: 1,
        perPage: 100,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return []; // Повертаємо порожній масив у разі помилки
  }
};