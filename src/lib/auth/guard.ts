import { NextRequest } from 'next/server';
import { verifyToken } from './index';
import { unauthorizedResponse } from '../utils/api-response';

export type GuardResult =
  | { authorized: true; payload: import('./index').AdminTokenPayload }
  | { authorized: false; response: ReturnType<typeof unauthorizedResponse> };

export async function adminGuard(request: NextRequest): Promise<GuardResult> {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return {
      authorized: false,
      response: unauthorizedResponse('No token provided'),
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      authorized: false,
      response: unauthorizedResponse('Invalid or expired token'),
    };
  }

  return { authorized: true, payload };
}
