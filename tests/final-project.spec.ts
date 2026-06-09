import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Locked out user cannot log in and sees correct error
test("locked out user cannot log in", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("locked_out_user", "secret_sauce");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator("[data-test='error']")).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.' // ← is this the exact text?
  );
});
test.describe("User check out flow - happy path", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });
// Valid user can log in and see inventory page
  test("User is redirected to inventory page after login", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });
// User can add two products to cart; verify badge count
test("User can add two products to cart and see badge count update", async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart("backpack");
  await inventory.addToCart("bike-light");
  await expect(inventory.cartBadge).toHaveText("2");
});
// User can remove one product from cart; verify badge count updates
test("User can remove one product from cart and see badge count update", async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart("backpack");
  await inventory.addToCart("bike-light");
  await inventory.removeBackpackFromCartButton.click();
  await expect(inventory.cartBadge).toHaveText("1");
});
// User can complete checkout and see success message
test("User can complete checkout and see success message", async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart("backpack");
  await inventory.goToCart();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("First Name").fill("John");
  await page.getByPlaceholder("Last Name").fill("Doe");
  await page.getByPlaceholder("Postal Code").fill("12345");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.locator("[data-test=\"pony-express\"]")).toBeVisible();
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!" 
    );
  await expect(page.locator(".complete-text")).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  );
});
});