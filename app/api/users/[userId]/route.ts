import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api, ApiError } from "../../api";

interface RouteContext {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(req: Request, context: RouteContext) {
  try {
    const { userId } = await context.params;
    const { searchParams } = new URL(req.url);
    const cookieStore = await cookies();

    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("perPage") || "10";

    const cookieHeader =
      cookieStore.size > 0
        ? cookieStore.getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; ")
        : "";

    const { data } = await api.get(`/users/${userId}`, {
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

