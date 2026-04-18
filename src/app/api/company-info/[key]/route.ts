import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  getCompanyInfoByKey,
  setCompanyInfo,
} from '@/lib/repositories/company-info.repo';
import { updateCompanyInfoSchema } from '@/lib/validators/company-info';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

type Params = { params: Promise<{ key: string }> };

// GET /api/company-info/[key] — Public
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { key } = await params;
    const info = await getCompanyInfoByKey(key);
    if (!info) return notFoundResponse('Company info key not found');

    // Try to parse JSON value
    let parsedValue: unknown = info.value;
    try {
      parsedValue = info.value ? JSON.parse(info.value) : null;
    } catch {
      // Keep as string
    }

    return successResponse({ ...info, parsedValue });
  } catch (error) {
    console.error('Get company info error:', error);
    return serverErrorResponse('Failed to fetch company info');
  }
}

// PUT /api/company-info/[key] — Admin
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { key } = await params;
    const body = await request.json();

    const parsed = updateCompanyInfoSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    await setCompanyInfo(key, parsed.data.value);
    return successResponse({ message: 'Company info updated' });
  } catch (error) {
    console.error('Update company info error:', error);
    return serverErrorResponse('Failed to update company info');
  }
}
