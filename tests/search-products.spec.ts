import { test, expect } from '@playwright/test';

test('Search for "shirt" and verify results', async ({ page }) => {
  
  // Go to homepage
await page.goto('https://automationexercise.com');

  // Click on "Products" in the navbar
await page.click('a[href="/products"]');

  // Wait for products page to load
await expect(page.locator('h2:has-text("All Products")')).toBeVisible();

  // Enter "shirt" in the search input
await page.fill('#search_product', 'shirt');

  // Click the search button
await page.click('#submit_search');

  // Wait for search results
await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();

  // Assert that at least one product is visible
  const productNames = page.locator('.productinfo p');
await expect(productNames.first()).toBeVisible();

  // (Bonus) Log the name of the first product
const name = await productNames.first().innerText();
//console.log(`[Search Test] First result found: ${name}`);

  // Optional: Assert that the product name contains "shirt"
expect(name.toLowerCase()).toContain('shirt');
});