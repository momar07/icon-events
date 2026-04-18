import { NextRequest } from 'next/server';
import { adminGuard } from '@/lib/auth/guard';
import { storeImage } from '@/lib/repositories/images.repo';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/utils/api-response';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/lib/utils/constants';

// POST /api/upload — Admin: upload image to DB as LONGBLOB
export async function POST(request: NextRequest) {
  try {
    const guard = await adminGuard(request);
    if (!guard.authorized) return guard.response;

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const alt = (formData.get('alt') as string) || '';

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      return errorResponse(
        `Invalid file type. Accepted: ${ACCEPTED_IMAGE_TYPES.join(', ')}`,
        400
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(
        `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        400
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const id = await storeImage({
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      data: buffer,
      alt,
    });

    return successResponse(
      {
        id,
        url: `/api/images/${id}`,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        alt,
      },
      undefined,
      201
    );
  } catch (error) {
    console.error('Upload error:', error);
    return serverErrorResponse('Failed to upload image');
  }
}
