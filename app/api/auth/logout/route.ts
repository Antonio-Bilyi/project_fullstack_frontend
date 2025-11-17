import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value ?? "";
    const refreshToken = cookieStore.get("refreshToken")?.value ?? "";
    const sessionId = cookieStore.get("sessionId")?.value ?? "";

    const apiRes = await api.post(
      "auth/logout",
      null,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`,
        },
      }
    );

    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if ("accessToken" in parsed) cookieStore.delete("accessToken");
        if ("refreshToken" in parsed) cookieStore.delete("refreshToken");
        if ("sessionId" in parsed) cookieStore.delete("sessionId");
      }
    }

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
