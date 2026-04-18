import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  getServiceById,
  updateService,
  softDeleteService,
  restoreService,
} from '@/lib/repositories/services.repo';
import { updateServiceSchema } from '@/lib/validators/services';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

type Params = { params: Promise<{ id: string }> };

// GET /api/services/[id] — Public
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const service = await getServiceById(numId);
    if (!service) return notFoundResponse('Service not found');

    return successResponse(service);
  } catch (error) {
    console.error('Get service error:', error);
    return serverErrorResponse('Failed to fetch service');
  }
}

// PUT /api/services/[id] — Admin
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getServiceById(numId);
    if (!existing) return notFoundResponse('Service not found');

    const body = await request.json();

    // Handle restore action
    if (body._action === 'restore') {
      await restoreService(numId);
      return successResponse({ message: 'Service restored' });
    }

    const parsed = updateServiceSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    await updateService(numId, parsed.data);
    return successResponse({ message: 'Service updated' });
  } catch (error) {
    console.error('Update service error:', error);
    return serverErrorResponse('Failed to update service');
  }
}

// DELETE /api/services/[id] — Admin (soft delete)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getServiceById(numId);
    if (!existing) return notFoundResponse('Service not found');

    await softDeleteService(numId);
    return successResponse({ message: 'Service archived' });
  } catch (error) {
    console.error('Delete service error:', error);
    return serverErrorResponse('Failed to archive service');
  }
}
