import { test, expect } from '@playwright/test';

test.describe('Admin Login', () => {

  test('login page loads', async ({ page }) => {
    await page.goto('/en/admin/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('shows error on wrong credentials', async ({ page }) => {
    await page.goto('/en/admin/login');
    await page.fill('input[type="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', 'wrongpassword123');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 10000 });
  });

  test('admin dashboard requires authentication', async ({ page }) => {
    // Clear cookies to ensure no session
    await page.context().clearCookies();
    await page.goto('/en/admin/dashboard');
    // Should either redirect to login OR show page without admin shell
    const url = page.url();
    const hasLogin = url.includes('/admin/login');
    const hasNoSidebar = await page.locator('aside').count() === 0;
    expect(hasLogin || hasNoSidebar).toBe(true);
  });

});
