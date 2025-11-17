import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionId = cookieStore.get("sessionId")?.value;
	
    // ---- 1. Якщо accessToken існує — сесія валідна ----
    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    // ---- 2. Якщо accessToken нема, але refreshToken є — пробуємо оновити ----
    if (refreshToken && sessionId) {
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const apiRes = await api.post("auth/refresh", null, {
        headers: {
          Cookie: cookieHeader,
        },
      });

      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options: Partial<Parameters<typeof cookieStore.set>[2]> = {
            httpOnly: true,
            secure: false, // або true у проді
            sameSite: "lax" as "lax" | "strict" | "none",
            path: parsed.Path ?? "/",
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          };

          if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken.toString(), options);
          if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken.toString(), options);
          if (parsed.sessionId) cookieStore.set("sessionId", parsed.sessionId.toString(), options);

          return NextResponse.json({ success: true }, { status: 200 });
        }
      }

      return NextResponse.json({ success: false }, { status: 200 });
    }
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
