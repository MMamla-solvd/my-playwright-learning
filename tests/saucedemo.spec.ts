import {test, expect} from '@playwright/test';

test.describe("SauceDemo", () => {

// Test 2 - User cannot login with invalid credentials
    test("user is unable to log in with invalid credentials", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_saucier");
    await page.click("#login-button");
    await expect(page.locator("[data-test='error']"), "Invalid username or password.").toBeVisible();
    }); 
// Test 5 - Empty form validation
    test("Verify empty form validation", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.click("#login-button");
    await expect(page.locator("[data-test='error']"), "Error message should be visible" ).toBeVisible();
    });
// Test 6 - Finding a bug!
    test("Investigate user reports of being unable to add or remove items from the cart", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "problem_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL(/inventory/);
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should show 1 item').toHaveText("1");
    await page.click("[data-test='remove-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should not be visible').not.toBeVisible();
    });



    test.beforeEach(async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    });

// Test 1 - succesful login
    test("Verify user can log in successfully", async ({page}) => {
    await expect(page).toHaveURL(/inventory/);
    });

//Test 3 - User can add a product to the cart & UI updates accordingly
    test("Verify user can add a product to the cart", async ({page}) => {
    
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should show 1 item').toHaveText("1");
    });
//Test 4 - User can remove a product from the cart & UI updates accordingly
    test("Verify user can remove a product from the cart", async ({page}) => {
   
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await page.click(".shopping_cart_link");
    await page.click("[data-test='remove-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should not be visible').not.toBeVisible();
    });
});
test.describe("SauceDemo Bonus Challenges", () => {
// Bonus Challenge 1 - Verify that the cart updates if users add multiple products
    test("Verify cart updates with multiple products", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL(/inventory/);
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await page.click("[data-test='add-to-cart-sauce-labs-bike-light']");
    await page.click("[data-test='add-to-cart-sauce-labs-bolt-t-shirt']")
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should show 3 items').toHaveText("3");
    await page.click("[data-test='remove-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should show 2 items').toHaveText("2");
    });

// Bonus Challenge 2 - Verify that the product sorting feature works correctly
    test("Verify product sorting by price low to high", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL(/inventory/);
    await page.selectOption(".product_sort_container", "lohi");
    const prices = await page.$$eval(".inventory_item_price", elements => elements.map(el => parseFloat(el.textContent.replace("$", ""))));
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices); 
    }); 
    
// Bonus Challenge 3 - Verify cart keeps items added by users after refreshing the page
    test("Verify cart retains items after page refresh", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL(/inventory/);
    await page.click("[data-test='add-to-cart-sauce-labs-backpack']");
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should show 1 item').toHaveText("1");
    await page.reload();
    await expect(page.locator(".shopping_cart_badge"), 'Cart badge should still show 1 item').toHaveText("1");
    });

// Locked out user test
    test("Verify error message for locked out user", async ({page}) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "locked_out_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator("[data-test='error']")).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
    );
    });
});