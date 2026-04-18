import { describe, it, expect } from 'vitest';
import { createPortfolioSchema, updatePortfolioSchema, portfolioFiltersSchema } from '../portfolio';

describe('createPortfolioSchema', () => {
  it('accepts valid portfolio', () => {
    const result = createPortfolioSchema.safeParse({
      title: 'Tech Exhibition 2024',
      description: 'A stunning tech exhibition',
      category: 'Exhibitions',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty title', () => {
    const result = createPortfolioSchema.safeParse({
      title: '',
      description: 'Description',
      category: 'Exhibitions',
    });
    expect(result.success).toBe(false);
  });

  it('rejects budgetMin greater than budgetMax', () => {
    const result = createPortfolioSchema.safeParse({
      title: 'Project',
      description: 'Description',
      category: 'Exhibitions',
      budgetMin: 50000,
      budgetMax: 10000,
    });
    expect(result.success).toBe(false);
  });

  it('accepts budgetMin less than budgetMax', () => {
    const result = createPortfolioSchema.safeParse({
      title: 'Project',
      description: 'Description',
      category: 'Exhibitions',
      budgetMin: 10000,
      budgetMax: 50000,
    });
    expect(result.success).toBe(true);
  });
});

describe('updatePortfolioSchema', () => {
  it('accepts partial update', () => {
    const result = updatePortfolioSchema.safeParse({ title: 'New Title' });
    expect(result.success).toBe(true);
  });

  it('accepts empty object', () => {
    const result = updatePortfolioSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});

describe('portfolioFiltersSchema', () => {
  it('uses defaults', () => {
    const result = portfolioFiltersSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(12);
    }
  });

  it('rejects limit over 100', () => {
    const result = portfolioFiltersSchema.safeParse({ limit: 200 });
    expect(result.success).toBe(false);
  });

  it('accepts category filter', () => {
    const result = portfolioFiltersSchema.safeParse({ category: 'Exhibitions' });
    expect(result.success).toBe(true);
  });
});
