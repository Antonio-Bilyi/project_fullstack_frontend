import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";
import { logErrorResponse } from "../_utils/utils";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 3);
    const sortBy = request.nextUrl.searchParams.get('sortBy') ?? ' ';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') ?? ' ';
    const filter = request.nextUrl.searchParams.get('filter') ?? { category: 'all' };

    const res = await api('/stories', {
      params: {
        page,
        perPage,
        filter,
        sortOrder,
        sortBy
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    const formData = await request.formData();

    const res = await api.post("/stories", formData, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": 'multipart/form-data',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}