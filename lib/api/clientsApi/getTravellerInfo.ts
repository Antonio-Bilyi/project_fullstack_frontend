import type { Traveler, TravelerStoriesHttpResponse } from "@/types/traveller";
import type { ApiResponse } from "@/types/api";
import { nextServer } from "@/lib/api/api";

/**
 * Отримати інформацію про мандрівника.
 * Бекенд повертає /users/{id} у форматі ApiResponse<TravelerStoriesHttpResponse>,
 * де в полі data.user лежить сам мандрівник.
 */
export const getTravellerInfo = async (
  travellerId: string
): Promise<Traveler | null> => {
  try {
    const response = await nextServer.get<
      ApiResponse<TravelerStoriesHttpResponse>
    >(`/users/${travellerId}`);

    return response.data.data?.user ?? null;
  } catch (error) {
    console.error("Error fetching traveller info:", error);
    return null;
  }
};

