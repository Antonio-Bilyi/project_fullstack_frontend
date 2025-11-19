import { cookies } from "next/headers";
import { nextServer } from '@/lib/api/api';
import type {TravelersResponse} from "@/types/traveller";
import type { User } from "@/types/user";

export const getAllTravelers = async (page: number, perPage: number): Promise<User[]> => {
    const cookiesCurrent = await cookies();
  try {
    
    const response = await nextServer.get<TravelersResponse>("/users", {
      params: {
        page,
        perPage,
      }, 
      headers: { Cookie: cookiesCurrent.toString(), }
    });

    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching travelers:", error);
    return [];
  }
};


