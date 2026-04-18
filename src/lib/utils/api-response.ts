import { NextResponse } from 'next/server';

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  details?: Record<string, string[]>;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(
  data: T,
  meta?: ApiSuccessResponse<T>['meta'],
  status = 200
) {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (meta) body.meta = meta;
  return NextResponse.json(body, { status });
}

export function errorResponse(
  error: string,
  status = 400,
  details?: Record<string, string[]>
) {
  const body: ApiErrorResponse = { success: false, error };
  if (details) body.details = details;
  return NextResponse.json(body, { status });
}

export function notFoundResponse(message = 'Resource not found') {
  return errorResponse(message, 404);
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = 'Forbidden') {
  return errorResponse(message, 403);
}

export function serverErrorResponse(message = 'Internal server error') {
  return errorResponse(message, 500);
}
