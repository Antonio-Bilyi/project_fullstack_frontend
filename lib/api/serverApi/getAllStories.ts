import type { StoriesHttpResponse } from "@/types/story.ts";
import type { ApiResponse } from "@/types/api";
import { nextServer } from "@/lib/api/api";
import { cookies } from "next/headers";

// отримати список всіх історій
export const getAllStoriesServer = async (page: number, perPage: number, category?: string, sortOrder?: string, sortBy?: string): Promise<ApiResponse<StoriesHttpResponse>> => {
    const endPoint = '/stories';

    const params = {
        page,
        perPage,
        filter: category ? { category } : { category: 'all' },
        sortOrder: sortOrder ? sortOrder : '',
        sortBy: sortBy ? sortBy : '',
    }

    const cookiesCurrent = await cookies();

    const response = await nextServer.get<ApiResponse<StoriesHttpResponse>>(endPoint, { params, headers: { Cookie: cookiesCurrent.toString(), }, },);

    return response.data;
}
