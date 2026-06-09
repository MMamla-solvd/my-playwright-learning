import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe("Verify shoppers can successfully complete a purchase", () => {
    test("Checkout process completes successfully", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const inventory = new InventoryPage(page);
        await test.step("Login with valid credentials", async () => {
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });
        await test.step("Add item to cart and proceed to checkout", async () => {
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const inventory = new InventoryPage(page);
        await inventory.addToCart("backpack");
        await inventory.goToCart();
        await page.getByRole("button", { name: "Checkout" }).click();
    });
        await test.step("User can enter first name, last name, and postal code", async () => {
        
        await page.getByPlaceholder("First Name").fill("John");
        await page.getByPlaceholder("Last Name").fill("Doe");
        await page.getByPlaceholder("Postal Code").fill("12345");
        await page.getByRole("button", { name: "Continue" }).click();
    });
        await test.step("Overview page shows correct item", async () => {
        await expect(page.locator(".inventory_item_name")).toHaveText("Sauce Labs Backpack");
    });
        await test.step("User can finish checkout and see confirmation messages", async () => {
        await page.getByRole("button", { name: "Finish" }).click();
        await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
        await expect(page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
        });
    });
});