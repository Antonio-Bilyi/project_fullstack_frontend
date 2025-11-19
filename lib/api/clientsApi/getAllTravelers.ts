import { nextServer } from "@/lib/api/api";
import type { TravelersResponse } from "@/types/user";
import type { User } from "@/types/user";

export const getAllTravelers = async (): Promise<User[]> => {
  try {
    const response = await nextServer.get<TravelersResponse>("/users", {
      params: {
        page: 1,
      },
    });

    return response.data.data?.data ?? [];
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return [];
  }
};
