import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, ApiError } from "../api";

interface QueryParams {
  searchParams?: {
    page?: string;
    perPage?: string;
  };
}

export async function GET(req: Request, { searchParams }: QueryParams) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { status: 401, message: "Access token missing" },
        { status: 401 }
      );
    }

    const page = searchParams?.page ? Number(searchParams.page) : 1;
    const perPage = searchParams?.perPage ? Number(searchParams.perPage) : 10;

      const { data } = await api.get("/users", {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken || ""}`,
      },
      params: {
        page,
        perPage,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      {
        status: err.response?.status ?? 500,
        message: err.response?.data?.error ?? err.message,
      },
      { status: err.response?.status ?? 500 }
    );
  }
}
