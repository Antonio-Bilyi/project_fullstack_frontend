import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const formData = await request.formData();

    const { data } = await api.patch('users/avatar', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;
    const errorData = apiError.response?.data as { error?: string; message?: string } | undefined;

    return NextResponse.json(
      {
        error:
          errorData?.error ||
          errorData?.message ||
          apiError.message ||
          'Failed to update avatar',
      },
      { status: apiError.response?.status || 500 },
    );
  }
}