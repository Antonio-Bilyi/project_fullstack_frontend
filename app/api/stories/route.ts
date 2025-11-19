import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
// import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    // const cookieStore = await cookies();
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}