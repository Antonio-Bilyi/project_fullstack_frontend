import type { User } from "@/types/user";

export const getUserProfile = async (): Promise<User | null> => {
  try {
    const res = await fetch("/api/auth/currentUser", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return (result.data?.data || result.data || result) as User;
  } catch {
    return null;
  }
};
