import { nextServer } from '@/lib/api/api';
import type { TravelersResponse } from "@/types/traveller";
import type { User } from "@/types/user";

export const getAllTravelers = async (page: number, perPage: number): Promise<User[]> => {
  try {    
    const response = await nextServer.get<TravelersResponse>("/users", {
      params: {
        page,
        perPage,
      },
    });

    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return [];
  }
};