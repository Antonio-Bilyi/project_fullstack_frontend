import type { StoryFavHttpResponse } from "@/types/story";
import { ApiResponse } from "@/types/api";

import { nextServer } from "@/lib/api/api";

// Додати історію в збережені 
export const addStoryToSave = async (storyId: string): Promise<ApiResponse<StoryFavHttpResponse>> => {
    const endPoint = `/users/addStoryToDownloads`;

    const response = await nextServer.post<ApiResponse<StoryFavHttpResponse>>(endPoint, storyId);

    return response.data;
}