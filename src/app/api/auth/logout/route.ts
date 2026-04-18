import { NextResponse } from 'next/server';
import { getLogoutCookieOptions } from '@/lib/auth';

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, data: { message: 'Logged out successfully' } },
      { status: 200 }
    );

    response.cookies.set(getLogoutCookieOptions());
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
