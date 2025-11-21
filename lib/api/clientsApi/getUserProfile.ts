import type { User } from "@/types/user";
import { nextServer } from "@/lib/api/api";

type GetUserProfileResponse = {
  status: number;
  message: string;
  data: User;
};

export const getUserProfile = async (): Promise<User> => {
  const endPoint = "/users/current";
  const response = await nextServer.get<GetUserProfileResponse>(endPoint);
  return response.data.data;
};
