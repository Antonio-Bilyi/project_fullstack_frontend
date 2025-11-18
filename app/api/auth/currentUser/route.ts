import { NextRequest, NextResponse } from 'next/server';
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

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: (error as ApiError).response?.data?.error ?? (error as ApiError).message },
            { status: (error as ApiError).status },
        )
    }
}

export async function PATCH(request: NextRequest) {
    const cookieStore = await cookies();

    try {
        const formData = await request.formData();

        // Проксі-запит на бекенд для оновлення поточного користувача
        const { data } = await api.patch(`users/current`, formData, {
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
                error: errorData?.error || errorData?.message || apiError.message || 'Failed to update profile'
            },
            { status: apiError.response?.status || 500 }
        );
    }
}