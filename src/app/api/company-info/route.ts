import { NextRequest } from 'next/server';
import { listCompanyInfo } from '@/lib/repositories/company-info.repo';
import { successResponse, serverErrorResponse } from '@/lib/utils/api-response';

// GET /api/company-info — Public: list all
export async function GET(_request: NextRequest) {
  try {
    const data = await listCompanyInfo();
    return successResponse(data);
  } catch (error) {
    console.error('List company info error:', error);
    return serverErrorResponse('Failed to fetch company info');
  }
}
