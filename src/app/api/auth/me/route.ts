import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import { successResponse, serverErrorResponse } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const guard = await adminGuard(request);

    if (!guard.authorized) {
      return guard.response;
    }

    return successResponse({
      email: guard.payload.email,
      role: guard.payload.role,
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return serverErrorResponse('Failed to get session');
  }
}
