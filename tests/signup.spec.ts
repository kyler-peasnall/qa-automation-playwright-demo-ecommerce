import { test, expect } from '@playwright/test';

// Random email for unique signup
const randomNumber = Math.floor(Math.random() * 10000);
const email = `kyler_test_${randomNumber}@example.com`;

test('Signup with new user', async ({ page }) => {
await page.goto('https://automationexercise.com');

  // Click "Signup / Login"
await page.click('a[href="/login"]');

  // Fill in signup form
await page.fill('input[data-qa="signup-name"]', 'Kyler Test');
await page.fill('input[data-qa="signup-email"]', email);

  // Click Signup
await page.click('button[data-qa="signup-button"]');

  // Wait for signup form to load
await expect(page.locator('h2:has-text("Enter Account Information")')).toBeVisible();

  // Fill account info (minimal required fields)
await page.check('#id_gender1');
await page.fill('#password', 'TestPassword123');
await page.selectOption('#days', '10');
await page.selectOption('#months', '5');
await page.selectOption('#years', '1990');
await page.fill('#first_name', 'Kyler');
await page.fill('#last_name', 'Test');
await page.fill('#address1', '123 QA Street');
await page.selectOption('#country', 'United States');
await page.fill('#state', 'AZ');
await page.fill('#city', 'Phoenix');
await page.fill('#zipcode', '85001');
await page.fill('#mobile_number', '1234567890');

  // Submit account
await page.click('button[data-qa="create-account"]');

  // Verify success
await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();

  // Continue to logged-in dashboard
await page.click('a[data-qa="continue-button"]');

  // Optional: confirm login success
await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
});
