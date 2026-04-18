import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {

  test('home page loads', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Icon Events/);
    await expect(page.locator('nav').first()).toBeVisible();
  });

  test('services page loads', async ({ page }) => {
    await page.goto('/en/services');
    await expect(page).toHaveTitle(/Services|Icon Events/);
  });

  test('portfolio page loads', async ({ page }) => {
    await page.goto('/en/portfolio');
    await expect(page).toHaveTitle(/Portfolio|Icon Events/);
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page).toHaveTitle(/About|Icon Events/);
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page).toHaveTitle(/Contact|Icon Events/);
  });

});
