import { describe, it, expect } from 'vitest';
import { parseImages } from '../parse-images';

describe('parseImages', () => {
  it('returns empty array for null', () => {
    expect(parseImages(null)).toEqual([]);
  });

  it('returns empty array for undefined', () => {
    expect(parseImages(undefined)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(parseImages('')).toEqual([]);
  });

  it('returns array as-is', () => {
    const imgs = [{ id: 1, url: '/img.jpg', alt: 'test', isCover: true }];
    expect(parseImages(imgs)).toEqual(imgs);
  });

  it('parses valid JSON string', () => {
    const imgs = [{ id: 1, url: '/img.jpg', alt: 'test' }];
    expect(parseImages(JSON.stringify(imgs))).toEqual(imgs);
  });

  it('returns empty array for invalid JSON', () => {
    expect(parseImages('not-json')).toEqual([]);
  });

  it('returns empty array for JSON object not array', () => {
    expect(parseImages('{"key":"value"}')).toEqual([]);
  });

  it('returns empty array for number', () => {
    expect(parseImages(42)).toEqual([]);
  });
});
