import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

  test('navbar has all links', async ({ page }) => {
    await page.goto('/en');
    const nav = page.locator('header nav').first();
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /portfolio/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('clicking services link navigates', async ({ page }) => {
    await page.goto('/en');
    await page.locator('header nav').first().getByRole('link', { name: /services/i }).click();
    await expect(page).toHaveURL(/\/en\/services/);
  });

  test('footer is visible', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('footer')).toBeVisible();
  });

});
