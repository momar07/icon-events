import { NextRequest, NextResponse } from 'next/server';
import { getImageFull } from '@/lib/repositories/images.repo';

type Params = { params: Promise<{ id: string }> };

// GET /api/images/[id] — Public: serve image blob
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);

    if (isNaN(numId) || numId <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid image ID' },
        { status: 400 }
      );
    }

    const image = await getImageFull(numId);

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }

    const buffer = image.data as Buffer;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': image.mimeType,
        'Content-Length': String(image.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${image.filename}"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Serve image error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to serve image' },
      { status: 500 }
    );
  }
}
