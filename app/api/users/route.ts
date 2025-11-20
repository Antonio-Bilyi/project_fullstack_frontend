import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, ApiError } from "../api";

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 8);
    
    const cookieStore = await cookies();

        const cookieHeader = cookieStore.size > 0
            ? cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ')
            : '';

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
