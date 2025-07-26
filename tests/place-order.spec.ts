import { test, expect } from '@playwright/test';

test('Place an order after signup', async ({ page }) => {
  // Go to homepage
await page.goto('https://automationexercise.com');

  // Click Signup/Login
await page.click('a[href="/login"]');

  // Fill signup form
await page.fill('input[data-qa="signup-name"]', 'Kyler QA');
const email = `kyler${Date.now()}@test.com`;
await page.fill('input[data-qa="signup-email"]', email);
await page.click('button[data-qa="signup-button"]');

  // Fill details (adjust if site changes)
await page.check('#id_gender1');
await page.fill('input[data-qa="password"]', 'test1234');
await page.selectOption('select[data-qa="days"]', '1');
await page.selectOption('select[data-qa="months"]', '1');
await page.selectOption('select[data-qa="years"]', '2000');
await page.fill('input[data-qa="first_name"]', 'Kyler');
await page.fill('input[data-qa="last_name"]', 'Test');
await page.fill('input[data-qa="address"]', '123 Test St');
await page.selectOption('select[data-qa="country"]', 'United States');
await page.fill('input[data-qa="state"]', 'AZ');
await page.fill('input[data-qa="city"]', 'Phoenix');
await page.fill('input[data-qa="zipcode"]', '85001');
await page.fill('input[data-qa="mobile_number"]', '1234567890');
await page.click('button[data-qa="create-account"]');

  // Account Created screen
await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();
await page.click('a[data-qa="continue-button"]');

  // Add a product to cart
await page.click('a[href="/products"]');
const products = page.locator('.product-image-wrapper');
await expect(products.first()).toBeVisible();
await products.nth(0).hover();
await page.click('a.add-to-cart[data-product-id="1"]');

  // View cart
await page.getByRole('link', { name: 'View Cart' }).click();

  // Proceed to checkout
await expect(page).toHaveURL(/.*\/view_cart/);
await expect(page.locator('a.check_out')).toBeVisible();
await page.locator('a.check_out').click();

  // Optional: review order
await expect(page.locator('.checkout-information')).toBeVisible();

  // Place order
await page.fill('textarea[name="message"]', 'This is a test order.');
await page.click('a[href="/payment"]');

  // Fill payment form
await page.fill('input[name="name_on_card"]', 'Kyler QA');
await page.fill('input[name="card_number"]', '4111111111111111');
await page.fill('input[name="cvc"]', '123');
await page.fill('input[name="expiry_month"]', '12');
await page.fill('input[name="expiry_year"]', '2026');
await page.click('#submit');

  // Confirm success message
await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

  // Delete account after order
await page.click('a[href="/delete_account"]');
await expect(page.getByText('Account Deleted!')).toBeVisible();
});
