import { test, expect, } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.ts';
import { testUser } from '../data/testUser'
test('Place an order after signup', async ({ page }) => {

  //Sign Up New Account
const registrationPage = new RegistrationPage(page);
await registrationPage.goToHomePage();
await registrationPage.clickSignupLogin();
await registrationPage.fillSignupForm(testUser.name, testUser.email);
await registrationPage.fillDetails(testUser);
await registrationPage.continueAfterAccountCreated();

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
