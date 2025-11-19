import { cookies } from "next/headers";
import { nextServer } from '@/lib/api/api';
import type {TravelersResponse, TravelersList} from "@/types/user";

export const getAllTravelers = async (): Promise<TravelersList| null> => {
    const cookiesCurrent = await cookies();
  try {
    
    const response = await nextServer.get<TravelersResponse>("/users", {
      params: {
        page: 1,
        }, 
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return null;
  }
};


