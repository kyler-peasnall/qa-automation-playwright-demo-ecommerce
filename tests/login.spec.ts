import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  // Go to homepage
await page.goto('https://automationexercise.com');

  // Click "Signup / Login" from the top menu
await page.click('a[href="/login"]');

  // Fill in email and password fields
await page.fill('input[data-qa="login-email"]', 'kyler@example.com');
await page.fill('input[data-qa="login-password"]', 'testpassword');

  // Click the Login button
await page.click('button[data-qa="login-button"]');

  // Verify that we're logged in by checking the presence of "Logged in as"
await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});
