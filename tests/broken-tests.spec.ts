import {test, expect} from '@playwright/test';

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Root cause: getByPlaceholder assertion wasn't finding the right locator, because the placeholder text was different than expected.
// Fix: Updated the getByPlaceholder text to "Username" instead of "User Name".
// How I verified: Ran the npx playwright test tests/broken-tests.spec.ts --headed --project=chromium so I could see the test run and verify that my fix worked.

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator("[data-test='error']")).toHaveText(
    'Epic sadface: Username and password do not match any user in this service' // ← is this the exact text?
);   
});

// Root cause: getByTestId assertion was not finding the right locator. Additionally, the error message in the toHaveText assertion was wrong.
// Fix: I replaced the getByTestId assertion with an exact locator & updated the error message string to match what's shown on the page.
// How I verified: Ran the npx playwright test tests/broken-tests.spec.ts --headed --project=chromium so I could see the test run and verify that my fix worked.

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// Root cause: "await" missing from the add to cart click action, however this didn't cause the test to fail.
// Fix: I simply added "await" to the add to cart click action for peace of mind.
// How I verified: Ran the npx playwright test tests/broken-tests.spec.ts --ui command to make sure I wasn't getting a false positive result.
