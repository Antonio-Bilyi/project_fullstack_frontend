import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ storyId: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { storyId } = await params;

    const res = await api.get(`/stories/${storyId}`, {
      headers: {
        Cookie: cookieStore.toString(),
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

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { storyId } = await params;
    const body = await request.json();

    const res = await api.patch(`/stories/${storyId}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
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