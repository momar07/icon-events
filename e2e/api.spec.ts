import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {

  test('GET /api/services returns success', async ({ request }) => {
    const res = await request.get('/api/services');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('GET /api/portfolio returns success', async ({ request }) => {
    const res = await request.get('/api/portfolio');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('GET /api/testimonials returns success', async ({ request }) => {
    const res = await request.get('/api/testimonials');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('GET /api/company-info returns success', async ({ request }) => {
    const res = await request.get('/api/company-info');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  test('POST /api/auth/login rejects bad credentials', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email: 'fake@test.com', password: 'fakepassword123' },
    });
    expect(res.status()).toBe(401);
  });

  test('GET /api/auth/me without token returns 401', async ({ request }) => {
    const res = await request.get('/api/auth/me');
    expect(res.status()).toBe(401);
  });

});
