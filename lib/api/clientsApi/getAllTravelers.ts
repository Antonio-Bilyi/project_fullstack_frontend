import { nextServer } from '@/lib/api/api';
import type { TravelersResponse } from "@/types/traveller";
import type { ApiResponse } from '@/types/api';
// import type { User } from "@/types/user";

export const getAllTravelers = async (page?: number, perPage?: number): Promise<ApiResponse<TravelersResponse>> => {

  try {    
    const response = await nextServer.get<ApiResponse<TravelersResponse>>("/users", {
      params: {
        page,
        perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return {};
  }
};
