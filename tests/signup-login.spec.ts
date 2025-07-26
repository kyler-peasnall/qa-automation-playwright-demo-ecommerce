import { test, expect } from '@playwright/test';

let email: string;
let password: string;

test.describe('Signup + Login Flow', () => {
test.beforeAll(async ({ browser }) => {
const page = await browser.newPage();

    // Generate a unique user
const randomNumber = Math.floor(Math.random() * 10000);
email = `kyler_test_${randomNumber}@example.com`;
password = 'TestPassword123';

await page.goto('https://automationexercise.com');

    // Go to Signup page
await page.click('a[href="/login"]');

    // Fill basic signup form
await page.fill('input[data-qa="signup-name"]', 'Kyler Test');
await page.fill('input[data-qa="signup-email"]', email);
await page.click('button[data-qa="signup-button"]');

    // Fill required fields
await page.check('#id_gender1');
await page.fill('#password', password);
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
await page.click('button[data-qa="create-account"]');

    // Confirm success
await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();
await page.click('a[data-qa="continue-button"]');
await page.close();
});

    // Login with Created Account
test('Login with newly created user', async ({ page }) => {
await page.goto('https://automationexercise.com');

await page.click('a[href="/login"]');

await page.fill('input[data-qa="login-email"]', email);
await page.fill('input[data-qa="login-password"]', password);
await page.click('button[data-qa="login-button"]');

await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
  
    //Delete Account
await page.click('a[href="/delete_account"]');
await expect(page.getByText('Account Deleted!')).toBeVisible();
});
});
