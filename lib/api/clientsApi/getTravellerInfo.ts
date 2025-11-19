import type { Traveler } from "@/types/traveller";
import { nextServer } from "@/lib/api/api";

interface TravellerInfoResponse {
  data: Traveler;
}

export const getTravellerInfo = async (
  travellerId: string
): Promise<Traveler | null> => {
  try {
    const response = await nextServer.get<TravellerInfoResponse>(
      `/users/${travellerId}`
    );

    return response.data.data ?? null;
  } catch (error) {
    console.error("Error fetching traveller info:", error);
    return null;
  }
};

