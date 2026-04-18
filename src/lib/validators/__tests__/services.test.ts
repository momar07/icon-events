import { describe, it, expect } from 'vitest';
import { createServiceSchema, updateServiceSchema } from '../services';

describe('createServiceSchema', () => {
  it('accepts valid service', () => {
    const result = createServiceSchema.safeParse({
      title: 'Event Design',
      description: 'We design amazing events',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.displayOrder).toBe(0);
    }
  });

  it('rejects empty title', () => {
    const result = createServiceSchema.safeParse({
      title: '',
      description: 'Some description',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty description', () => {
    const result = createServiceSchema.safeParse({
      title: 'Event Design',
      description: '',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional icon', () => {
    const result = createServiceSchema.safeParse({
      title: 'Event Design',
      description: 'Description here',
      icon: 'Palette',
    });
    expect(result.success).toBe(true);
  });

  it('rejects title over 255 chars', () => {
    const result = createServiceSchema.safeParse({
      title: 'A'.repeat(256),
      description: 'Desc',
    });
    expect(result.success).toBe(false);
  });
});

describe('updateServiceSchema', () => {
  it('accepts partial update', () => {
    const result = updateServiceSchema.safeParse({ title: 'New Title' });
    expect(result.success).toBe(true);
  });

  it('accepts empty object', () => {
    const result = updateServiceSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});
