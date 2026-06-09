import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';

test.describe("Verify cart behaviour matches spec", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });

    test("cart badge shows correct number of items added to cart", async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addToCart("backpack");
        await expect(inventory.cartBadge).toHaveText("1");
    });

    test("cart badge disappears when all items are removed from cart", async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addToCart("backpack");
        await inventory.removeBackpackFromCartButton.click();
        await expect(inventory.cartBadge).not.toBeVisible();
    });
    test("cart badge updates correctly when multiple items are added and removed", async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addToCart("backpack");
        await inventory.addToCart("bike-light");
        await inventory.addToCart("bolt-t-shirt");
        await expect(inventory.cartBadge).toHaveText("3");
        await inventory.removeBackpackFromCartButton.click();
        await expect(inventory.cartBadge).toHaveText("2");
        await inventory.removeBikeLightFromCartButton.click();
        await expect(inventory.cartBadge).toHaveText("1");
        await inventory.removeBoltTShirtFromCartButton.click();
        await expect(inventory.cartBadge).not.toBeVisible();
    });
    test("cart page shows the name of selected product", async ({ page }) => {
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        await inventory.addToCart("backpack");
        await inventory.goToCart();
        await expect(cart.getItemName()).resolves.toContain("Sauce Labs Backpack");
    });
});