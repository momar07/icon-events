import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  listPortfolioProjects,
  createPortfolioProject,
  getPortfolioCategories,
} from '@/lib/repositories/portfolio.repo';
import { createPortfolioSchema, portfolioFiltersSchema } from '@/lib/validators/portfolio';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';
import { paginationMeta } from '@/lib/utils/pagination';

// GET /api/portfolio
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    if (includeDeleted) {
      const guard = await adminGuard(request);
      if (!guard.authorized) return guard.response;
    }

    const filterInput = {
      category: searchParams.get('category') || undefined,
      featured: searchParams.get('featured') || undefined,
      year: searchParams.get('year') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '12',
    };

    const parsed = portfolioFiltersSchema.safeParse(filterInput);
    if (!parsed.success) {
      return errorResponse('Invalid filters', 400);
    }

    const { data, total } = await listPortfolioProjects({
      ...parsed.data,
      includeDeleted,
    });

    const meta = paginationMeta(total, parsed.data.page, parsed.data.limit);

    if (searchParams.get('withCategories') === 'true') {
      const categories = await getPortfolioCategories();
      return successResponse({ projects: data, categories }, meta);
    }

    return successResponse(data, meta);
  } catch (error) {
    console.error('List portfolio error:', error);
    return serverErrorResponse('Failed to fetch portfolio');
  }
}

// POST /api/portfolio
export async function POST(request: NextRequest) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const body = await request.json();
    const parsed = createPortfolioSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    // Don't stringify images — Drizzle handles JSON columns automatically
    const id = await createPortfolioProject(parsed.data as any);
    return successResponse({ id }, undefined, 201);
  } catch (error) {
    console.error('Create portfolio error:', error);
    return serverErrorResponse('Failed to create portfolio project');
  }
}
