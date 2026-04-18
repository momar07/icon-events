import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  getTestimonialById,
  updateTestimonial,
  softDeleteTestimonial,
  restoreTestimonial,
} from '@/lib/repositories/testimonials.repo';
import { updateTestimonialSchema } from '@/lib/validators/testimonials';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

type Params = { params: Promise<{ id: string }> };

// GET /api/testimonials/[id] — Public
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const testimonial = await getTestimonialById(numId);
    if (!testimonial) return notFoundResponse('Testimonial not found');

    return successResponse(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    return serverErrorResponse('Failed to fetch testimonial');
  }
}

// PUT /api/testimonials/[id] — Admin
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getTestimonialById(numId);
    if (!existing) return notFoundResponse('Testimonial not found');

    const body = await request.json();

    if (body._action === 'restore') {
      await restoreTestimonial(numId);
      return successResponse({ message: 'Testimonial restored' });
    }

    const parsed = updateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    await updateTestimonial(numId, parsed.data);
    return successResponse({ message: 'Testimonial updated' });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return serverErrorResponse('Failed to update testimonial');
  }
}

// DELETE /api/testimonials/[id] — Admin (soft delete)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getTestimonialById(numId);
    if (!existing) return notFoundResponse('Testimonial not found');

    await softDeleteTestimonial(numId);
    return successResponse({ message: 'Testimonial archived' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return serverErrorResponse('Failed to archive testimonial');
  }
}
