import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get('users/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as ApiError).response?.data?.error ?? (error as ApiError).message },
      { status: (error as ApiError).status || 401 },
    );
  }
}