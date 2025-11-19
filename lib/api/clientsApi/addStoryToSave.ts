import type { StoryFavHttpResponse } from "@/types/story";
import { ApiResponse } from "@/types/api";

import { nextServer } from "@/lib/api/api";

// отримати список всіх історій
export const addStoryToSave = async (userId:string, storyId: string): Promise<ApiResponse<StoryFavHttpResponse>> => {
    const endPoint = '/users/${userId}';

    const response = await nextServer.get<ApiResponse<StoryFavHttpResponse>>(endPoint, { params},);

    return response.data;
}