import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {

  test('english page loads at /en', async ({ page }) => {
    await page.goto('/en');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('arabic page loads at /ar', async ({ page }) => {
    await page.goto('/ar');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('arabic page has RTL direction', async ({ page }) => {
    await page.goto('/ar');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
  });

});
