import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("auth/login", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          httpOnly: cookieStr.includes("HttpOnly"),
          secure: cookieStr.includes("Secure"),
          sameSite: cookieStr.includes("SameSite=None")
            ? "none"
            : cookieStr.includes("SameSite=Strict")
            ? "strict"
            : "lax" as "none" | "strict" | "lax",

          path: parsed.Path ?? "/", 
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        };

        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);

        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);

        if (parsed.sessionId)
          cookieStore.set("sessionId", parsed.sessionId, options);
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
