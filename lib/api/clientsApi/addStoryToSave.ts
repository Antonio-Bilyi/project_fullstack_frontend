import type { StoryFavHttpResponse } from "@/types/story";
import { ApiResponse } from "@/types/api";

import { nextServer } from "@/lib/api/api";
// import { cookies } from "next/headers";

// Додати історію в збережені 
export const addStoryToSave = async (storyId: string): Promise<ApiResponse<StoryFavHttpResponse>> => {
    const endPoint = `/users/addStoryToSave`;

    // const cookiesCurrent = await cookies();

    const response = await nextServer.post<ApiResponse<StoryFavHttpResponse>>(endPoint, { storyId });

    return response.data;
}