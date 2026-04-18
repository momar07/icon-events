import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validators/auth';
import { verifyPassword } from '@/lib/auth/password';
import { signToken, getTokenCookieOptions } from '@/lib/auth';
import { errorResponse, serverErrorResponse } from '@/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Invalid input', 400, {
        fields: parsed.error.errors.map((e) => e.message),
      });
    }

    const { email, password } = parsed.data;

    // Check email
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH not configured');
      return serverErrorResponse('Server configuration error');
    }

    console.log('DEBUG LOGIN:');
    console.log('  Input email:', email);
    console.log('  ENV email:', adminEmail);
    console.log('  Email match:', email.toLowerCase() === adminEmail.toLowerCase());
    console.log('  Hash length:', adminPasswordHash.length);
    console.log('  Hash first 10:', adminPasswordHash.substring(0, 10));

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      console.log('  REJECTED: email mismatch');
      return errorResponse('Invalid email or password', 401);
    }

    // Check password
    const valid = await verifyPassword(password, adminPasswordHash);
    console.log('  Password valid:', valid);
    if (!valid) {
      console.log('  REJECTED: password mismatch');
      return errorResponse('Invalid email or password', 401);
    }

    // Sign token and set cookie
    const token = signToken(email);
    const cookieOpts = getTokenCookieOptions(token);

    const response = NextResponse.json(
      {
        success: true,
        data: { email, role: 'admin' },
      },
      { status: 200 }
    );

    response.cookies.set(cookieOpts);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return serverErrorResponse('Login failed');
  }
}
