import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  listInquiries,
  createInquiry,
} from '@/lib/repositories/inquiries.repo';
import { createInquirySchema, inquiryFiltersSchema } from '@/lib/validators/inquiries';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';
import { paginationMeta } from '@/lib/utils/pagination';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// GET /api/inquiries — Admin only
export async function GET(request: NextRequest) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { searchParams } = new URL(request.url);
    const filterInput = {
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    };

    const parsed = inquiryFiltersSchema.safeParse(filterInput);
    if (!parsed.success) {
      return errorResponse('Invalid filters', 400);
    }

    const { data, total } = await listInquiries(parsed.data);
    const meta = paginationMeta(total, parsed.data.page, parsed.data.limit);

    return successResponse(data, meta);
  } catch (error) {
    console.error('List inquiries error:', error);
    return serverErrorResponse('Failed to fetch inquiries');
  }
}

// POST /api/inquiries — Public (contact form submission)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    if (!checkRateLimit(ip)) {
      return errorResponse('Too many submissions. Please try again later.', 429);
    }

    const body = await request.json();
    const parsed = createInquirySchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    // Honeypot check
    if (parsed.data.website && parsed.data.website.length > 0) {
      // Silently accept but don't store (bot detected)
      return successResponse({ message: 'Inquiry submitted successfully' }, undefined, 201);
    }

    // Prepare data (remove honeypot field)
    const { website, eventDate, ...rest } = parsed.data;
    const inquiryData = {
      ...rest,
      eventDate: eventDate ? new Date(eventDate) : null,
    };

    const id = await createInquiry(inquiryData);

    // TODO: Send notification email (Phase 5)
    // Fallback: inquiry is persisted regardless of notification status

    return successResponse(
      { id, message: 'Inquiry submitted successfully' },
      undefined,
      201
    );
  } catch (error) {
    console.error('Create inquiry error:', error);
    return serverErrorResponse('Failed to submit inquiry');
  }
}
