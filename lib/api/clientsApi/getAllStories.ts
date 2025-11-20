import type { StoriesHttpResponse } from "@/types/story";
import { ApiResponse } from "@/types/api";

import { nextServer } from "@/lib/api/api";

// отримати список всіх історій
export const getAllStories = async (page: number, perPage: number, category?: string, sortOrder?: string, sortBy?: string): Promise<ApiResponse<StoriesHttpResponse>> => {
    const endPoint = '/stories';

    const params: Record<string, string | number> = {
        page,
        perPage,
    };

    if (category && category !== 'ALL' && category !== 'All') {
        params.category = category;
    }

    if (sortOrder) {
        params.sortOrder = sortOrder;
    }

    if (sortBy) {
        params.sortBy = sortBy;
    }

    const response = await nextServer.get<ApiResponse<StoriesHttpResponse>>(endPoint, { params },);

    return response.data;
}