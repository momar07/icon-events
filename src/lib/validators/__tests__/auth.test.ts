import { describe, it, expect } from 'vitest';
import { loginSchema } from '../auth';

describe('loginSchema', () => {
  it('accepts valid input', () => {
    const result = loginSchema.safeParse({
      email: 'admin@test.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@test.com',
      password: '1234567',
    });
    expect(result.success).toBe(false);
  });

  it('accepts 8 char password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@test.com',
      password: '12345678',
    });
    expect(result.success).toBe(true);
  });
});
