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

        const cookieHeader = cookieStore.size > 0
            ? cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')
            : '';

    const page = searchParams?.page ? Number(searchParams.page) : 1;
    const perPage = searchParams?.perPage ? Number(searchParams.perPage) : 10;

      const { data } = await api.get("/users", {
       params: { page, perPage },
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
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
