# Final Project - Playwright Test Suite

## Test target
SauceDemo (https://saucedemo.com)

## Covered user journey
Login -> Product Selection -> Checkout

## Test cases
Valid user can log in
Locker user cannot log in
User can add product to cart
User can remove product from cart
User can complete checkout and see success message

## Project structure
'pages/' - page objest classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
'tests/' - test specs (*.spec.ts)
'test-data/' - credentials (however these aren't really used in any tests)
'playwright.config.ts' - configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Notes
No hard waits (waitForTimeout) are used
Tests use semantic locators
Test data is stored seperately from test logic

## Known limitations
This suite only covers the selected user journey
Suite does NOT cover all possible edge cases
