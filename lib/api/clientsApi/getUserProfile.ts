import type { User } from "@/types/user";
import { nextServer } from "@/lib/api/api";

export const getUserProfile = async (): Promise<User> => {
    const endPoint = '/users/current';

    const response = await nextServer.get<User>(endPoint);

    return response.data
}
