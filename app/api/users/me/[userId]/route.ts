import { NextResponse } from "next/server";

interface RouteContext {
    params: {
        userId: string;
    };
}

export async function GET(request: Request, context: RouteContext) {
  const params = await context.params;
  const userId = params.userId;

  const { searchParams } = new URL(request.url);
  const storiesType = searchParams.get("storiesType") ?? "own";
  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "4";

  const backend = process.env.HANDLER_API_URL;

  try {
    const backendUrl = `${backend}/api/users/me/${userId}?storiesType=${storiesType}&page=${page}&perPage=${perPage}`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Помилка: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}
