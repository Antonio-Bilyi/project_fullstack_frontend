import { NextResponse } from "next/server";
import { api, ApiError } from "../api";

export async function GET() {
    try {
        const { data } = await api('categories');

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
    }
};