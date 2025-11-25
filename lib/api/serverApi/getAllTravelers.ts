import { cookies } from "next/headers";
import { nextServer } from '@/lib/api/api';
import type { TravelersResponse } from "@/types/traveller";
import { ApiResponse } from "@/types/api";

export const getAllTravelers = async (page?: number, perPage?: number): Promise<ApiResponse<TravelersResponse>> => {
    const cookiesCurrent = await cookies();
  try {
    
    const response = await nextServer.get<ApiResponse<TravelersResponse>>("/users", {
      params: {
        page,
        perPage,
      }, 
      headers: { Cookie: cookiesCurrent.toString(), }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return {};
  }
};


