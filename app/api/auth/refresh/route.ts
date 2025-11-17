import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!refreshToken || !sessionId) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 401 });
    }

    const apiRes = await api.post("auth/refresh", null, {
      headers: {
        Cookie: `refreshToken=${refreshToken}; sessionId=${sessionId}`,
      },
    });

    const setCookieHeaders = apiRes.headers["set-cookie"];
    if (setCookieHeaders) {
      const setArray = Array.isArray(setCookieHeaders)
        ? setCookieHeaders
        : [setCookieHeaders];

      for (const cookieStr of setArray) {
        const parsed = parse(cookieStr);

        const sameSite: "lax" | "strict" | "none" = cookieStr.includes("SameSite=None")
          ? "none"
          : cookieStr.includes("SameSite=Strict")
          ? "strict"
          : "lax";

        const options: Partial<Parameters<typeof cookieStore.set>[0]> = {
          httpOnly: cookieStr.includes("HttpOnly"),
          path: parsed.Path || "/",
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          secure: cookieStr.includes("Secure"),
          sameSite,
        };

        if (parsed.accessToken) cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set("refreshToken", parsed.refreshToken, options);
        if (parsed.sessionId) cookieStore.set("sessionId", parsed.sessionId, options);
      }
    }

    return NextResponse.json(
      { status: 200, message: "Session refreshed" },
      { status: 200 }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}