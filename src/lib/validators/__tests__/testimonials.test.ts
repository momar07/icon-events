import { describe, it, expect } from 'vitest';
import { createTestimonialSchema } from '../testimonials';

describe('createTestimonialSchema', () => {
  it('accepts valid testimonial', () => {
    const result = createTestimonialSchema.safeParse({
      clientName: 'John Smith',
      content: 'Amazing work on our exhibition!',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rating).toBe(5);
      expect(result.data.featured).toBe(false);
    }
  });

  it('rejects empty client name', () => {
    const result = createTestimonialSchema.safeParse({
      clientName: '',
      content: 'Good work',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty content', () => {
    const result = createTestimonialSchema.safeParse({
      clientName: 'John',
      content: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects rating below 1', () => {
    const result = createTestimonialSchema.safeParse({
      clientName: 'John',
      content: 'Good',
      rating: 0,
    });
    expect(result.success).toBe(false);
  });

  it('rejects rating above 5', () => {
    const result = createTestimonialSchema.safeParse({
      clientName: 'John',
      content: 'Good',
      rating: 6,
    });
    expect(result.success).toBe(false);
  });

  it('accepts rating 1 to 5', () => {
    for (let r = 1; r <= 5; r++) {
      const result = createTestimonialSchema.safeParse({
        clientName: 'John',
        content: 'Good work',
        rating: r,
      });
      expect(result.success).toBe(true);
    }
  });
});
