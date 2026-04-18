import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  listTestimonials,
  listAllTestimonials,
  createTestimonial,
} from '@/lib/repositories/testimonials.repo';
import { createTestimonialSchema } from '@/lib/validators/testimonials';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

// GET /api/testimonials — Public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    if (includeDeleted) {
      const guard = await adminGuard(request);
      if (!guard.authorized) return guard.response;
      const data = await listAllTestimonials(true);
      return successResponse(data);
    }

    const data = await listTestimonials();
    return successResponse(data);
  } catch (error) {
    console.error('List testimonials error:', error);
    return serverErrorResponse('Failed to fetch testimonials');
  }
}

// POST /api/testimonials — Admin
export async function POST(request: NextRequest) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const body = await request.json();
    const parsed = createTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    const id = await createTestimonial(parsed.data);
    return successResponse({ id }, undefined, 201);
  } catch (error) {
    console.error('Create testimonial error:', error);
    return serverErrorResponse('Failed to create testimonial');
  }
}
