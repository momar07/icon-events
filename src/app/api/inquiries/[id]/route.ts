import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from '@/lib/repositories/inquiries.repo';
import { updateInquiryStatusSchema } from '@/lib/validators/inquiries';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

type Params = { params: Promise<{ id: string }> };

// GET /api/inquiries/[id] — Admin
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const inquiry = await getInquiryById(numId);
    if (!inquiry) return notFoundResponse('Inquiry not found');

    return successResponse(inquiry);
  } catch (error) {
    console.error('Get inquiry error:', error);
    return serverErrorResponse('Failed to fetch inquiry');
  }
}

// PUT /api/inquiries/[id] — Admin (update status)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getInquiryById(numId);
    if (!existing) return notFoundResponse('Inquiry not found');

    const body = await request.json();
    const parsed = updateInquiryStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    await updateInquiryStatus(numId, parsed.data.status);
    return successResponse({ message: 'Inquiry status updated' });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return serverErrorResponse('Failed to update inquiry');
  }
}

// DELETE /api/inquiries/[id] — Admin (hard delete)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getInquiryById(numId);
    if (!existing) return notFoundResponse('Inquiry not found');

    await deleteInquiry(numId);
    return successResponse({ message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return serverErrorResponse('Failed to delete inquiry');
  }
}
