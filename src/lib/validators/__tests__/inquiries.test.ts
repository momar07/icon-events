import { describe, it, expect } from 'vitest';
import { createInquirySchema } from '../inquiries';

describe('createInquirySchema', () => {
  it('accepts valid inquiry', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      message: 'I want to organize a corporate event',
    });
    expect(result.success).toBe(true);
  });

  it('rejects name under 2 chars', () => {
    const result = createInquirySchema.safeParse({
      name: 'A',
      email: 'a@b.com',
      message: 'Some long enough message here',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'invalid',
      message: 'Some long enough message here',
    });
    expect(result.success).toBe(false);
  });

  it('rejects message under 10 chars', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'ahmed@test.com',
      message: 'Short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects honeypot filled', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'ahmed@test.com',
      message: 'Valid message here',
      website: 'spam-bot-value',
    });
    expect(result.success).toBe(false);
  });

  it('accepts empty honeypot', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'ahmed@test.com',
      message: 'Valid message here',
      website: '',
    });
    expect(result.success).toBe(true);
  });

  it('accepts valid phone', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'ahmed@test.com',
      message: 'Valid message here',
      phone: '+20 123-456-7890',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone', () => {
    const result = createInquirySchema.safeParse({
      name: 'Ahmed',
      email: 'ahmed@test.com',
      message: 'Valid message here',
      phone: 'not-a-phone!',
    });
    expect(result.success).toBe(false);
  });
});
