import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import {
  getPortfolioProjectById,
  updatePortfolioProject,
  softDeletePortfolioProject,
  restorePortfolioProject,
} from '@/lib/repositories/portfolio.repo';
import { updatePortfolioSchema } from '@/lib/validators/portfolio';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';

type Params = { params: Promise<{ id: string }> };

// GET /api/portfolio/[id] — Public
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const project = await getPortfolioProjectById(numId);
    if (!project) return notFoundResponse('Project not found');

    // Don't show soft-deleted to public
    if (project.deletedAt) return notFoundResponse('Project not found');

    return successResponse(project);
  } catch (error) {
    console.error('Get portfolio project error:', error);
    return serverErrorResponse('Failed to fetch project');
  }
}

// PUT /api/portfolio/[id] — Admin
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getPortfolioProjectById(numId);
    if (!existing) return notFoundResponse('Project not found');

    const body = await request.json();

    // Handle restore
    if (body._action === 'restore') {
      await restorePortfolioProject(numId);
      return successResponse({ message: 'Project restored' });
    }

    const parsed = updatePortfolioSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Validation failed', 400, {
        fields: parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }

    const updateData = {
      ...parsed.data,
      images: parsed.data.images ? JSON.stringify(parsed.data.images) : undefined,
    };

    await updatePortfolioProject(numId, updateData as any);
    return successResponse({ message: 'Project updated' });
  } catch (error) {
    console.error('Update portfolio error:', error);
    return serverErrorResponse('Failed to update project');
  }
}

// DELETE /api/portfolio/[id] — Admin (soft delete)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return errorResponse('Invalid ID', 400);

    const existing = await getPortfolioProjectById(numId);
    if (!existing) return notFoundResponse('Project not found');

    await softDeletePortfolioProject(numId);
    return successResponse({ message: 'Project archived' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    return serverErrorResponse('Failed to archive project');
  }
}
