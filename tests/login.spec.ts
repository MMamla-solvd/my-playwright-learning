import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe("Users can only log in with valid credentials", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
    });
    test("Verify empty username field shows validation error", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("", "secret_sauce");
        await expect(loginPage.errorMessageEmptyUsername).toHaveText(
            'Epic sadface: Username is required'
        );
    });
    test("Verify wrong password shows error message", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("standard_user", "wrong_password");
        await expect(loginPage.errorMessageInvalidPassword).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
    test("Verify locked out user cannot log in and sees correct error", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("locked_out_user", "secret_sauce");
        await expect(loginPage.errorMessageLockedOut).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });
    test("Verify standard_user can log in successfully and is redirected to inventory page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.login("standard_user", "secret_sauce");
        await expect(page).toHaveURL(/inventory/);
    });
});