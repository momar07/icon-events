import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import { listServices, listAllServices, createService } from '@/lib/repositories/services.repo';
import { createServiceSchema } from '@/lib/validators/services';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

// GET /api/services — Public: list active services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    // If requesting deleted items, must be admin
    if (includeDeleted) {
      const guard = await adminGuard(request);
      if (!guard.authorized) return guard.response;
      const data = await listAllServices(true);
      return successResponse(data);
    }

    const data = await listServices();
    return successResponse(data);
  } catch (error) {
    console.error('List services error:', error);
    return serverErrorResponse('Failed to fetch services');
  }
}

// POST /api/services — Admin: create service
export async function POST(request: NextRequest) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const body = await request.json();
    const parsed = createServiceSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    const id = await createService(parsed.data);
    return successResponse({ id }, undefined, 201);
  } catch (error) {
    console.error('Create service error:', error);
    return serverErrorResponse('Failed to create service');
  }
}
