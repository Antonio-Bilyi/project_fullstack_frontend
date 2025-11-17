import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { api } from '../../api';

export async function POST() {
    const cookieStore = await cookies();

    await api.post('auth/logout', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' });
}