import type { StoryFavHttpResponse } from "@/types/story";
import { ApiResponse } from "@/types/api";
import { AxiosRequestConfig } from "axios";
import { StoryRequest } from "@/types/story";

import { nextServer } from "@/lib/api/api";
// import { cookies } from "next/headers";

// Додати історію в збережені 
export const removeStoryFromSave = async (storyId: string): Promise<ApiResponse<StoryFavHttpResponse>> => {
    const endPoint = `/users/removeStoryFromSave/${storyId}`;
   
    const response = await nextServer.delete<ApiResponse<StoryFavHttpResponse>, AxiosRequestConfig<StoryRequest>>(endPoint);
    
    return response.data;
}