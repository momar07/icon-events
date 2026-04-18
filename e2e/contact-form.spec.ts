import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {

  test('form fields are visible', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('input[name="name"], #name').first()).toBeVisible();
    await expect(page.locator('input[name="email"], #email').first()).toBeVisible();
    await expect(page.locator('textarea[name="message"], #message').first()).toBeVisible();
  });

  test('submit button is visible', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  });

});
