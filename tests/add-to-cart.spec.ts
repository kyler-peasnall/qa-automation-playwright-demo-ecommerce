import { test, expect } from '@playwright/test';

test('Add products to cart and verify cart contents', async ({ page }) => {


// Go to homepage
await page.goto('https://automationexercise.com');

// Click on "Products" in the navbar
await page.click('a[href="/products"]');

// Wait for all products to load
const products = page.locator('.product-image-wrapper');
await expect(products.first()).toBeVisible();

// Hover over the product container first for the first item on page
await products.nth(0).hover();

// Now click the add-to-cart button
await page.click('a.add-to-cart[data-product-id="1"]');

//Click 'Coninue Shopping'
await page.getByRole('button', { name: 'Continue Shopping' }).click();

// Hover over the product container first for the second item on page
await products.nth(1).hover();

// Now click the add-to-cart button
await page.click('a.add-to-cart[data-product-id="2"]');

//Click 'View Cart'
await page.getByRole('link', { name: 'View Cart' }).click();

// Grab all product names in cart
const productNames = await page.locator('.cart_description h4 a').allTextContents();

// Assert both expected products are present
expect(productNames).toContain('Blue Top');
expect(productNames).toContain('Men Tshirt');

// Check quantities in cart
const quantities = page.locator('.cart_quantity button');
await expect(quantities.nth(0)).toHaveText('1');
await expect(quantities.nth(1)).toHaveText('1');

//Check Price
await expect(page.locator('.cart_price p').nth(0)).toContainText('Rs. 500');
await expect(page.locator('.cart_price p').nth(1)).toContainText('Rs. 400');

// Optional Cleanup (Required if using logged-in user or persistent cart)
await page.click('a[href="/view_cart"]');
await page.click('a.cart_quantity_delete[data-product-id="1"]');
await page.click('a.cart_quantity_delete[data-product-id="2"]');
await expect(page.locator('.cart_description')).toHaveCount(0);
});