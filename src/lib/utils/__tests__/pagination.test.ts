import { describe, it, expect } from 'vitest';
import { parsePagination, paginationMeta, paginationOffset } from '../pagination';

describe('parsePagination', () => {
  it('returns defaults when no params', () => {
    const sp = new URLSearchParams();
    expect(parsePagination(sp)).toEqual({ page: 1, limit: 12 });
  });

  it('parses valid page and limit', () => {
    const sp = new URLSearchParams({ page: '3', limit: '20' });
    expect(parsePagination(sp)).toEqual({ page: 3, limit: 20 });
  });

  it('clamps page to minimum 1', () => {
    const sp = new URLSearchParams({ page: '-5' });
    expect(parsePagination(sp).page).toBe(1);
  });

  it('clamps limit to maximum 100', () => {
    const sp = new URLSearchParams({ limit: '500' });
    expect(parsePagination(sp).limit).toBe(100);
  });

  it('falls back to default for zero limit', () => {
    const sp = new URLSearchParams({ limit: '0' });
    expect(parsePagination(sp).limit).toBe(12);
  });

  it('uses custom defaults', () => {
    const sp = new URLSearchParams();
    expect(parsePagination(sp, { page: 2, limit: 25 })).toEqual({ page: 2, limit: 25 });
  });
});

describe('paginationMeta', () => {
  it('calculates correct meta', () => {
    expect(paginationMeta(50, 1, 12)).toEqual({
      page: 1, limit: 12, total: 50, totalPages: 5,
    });
  });

  it('rounds up total pages', () => {
    expect(paginationMeta(13, 1, 12).totalPages).toBe(2);
  });

  it('handles zero total', () => {
    expect(paginationMeta(0, 1, 12).totalPages).toBe(0);
  });
});

describe('paginationOffset', () => {
  it('returns 0 for page 1', () => {
    expect(paginationOffset(1, 12)).toBe(0);
  });

  it('calculates correct offset', () => {
    expect(paginationOffset(3, 10)).toBe(20);
  });
});
