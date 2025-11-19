import type { TravelerStoriesHttpResponse } from "@/types/traveller";
import { ApiResponse } from "@/types/api";
import { nextServer } from "@/lib/api/api";

export const getTravellerStories = async (
  travellerId: string,
  page: number,
  perPage: number
): Promise<ApiResponse<TravelerStoriesHttpResponse>> => {
  const endPoint = `/users/${travellerId}/stories`;

  const params = {
    page,
    perPage,
  };

  const response = await nextServer.get<ApiResponse<TravelerStoriesHttpResponse>>(
    endPoint,
    { params }
  );

  return response.data;
};

