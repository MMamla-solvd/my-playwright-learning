import { type Locator, type Page } from "@playwright/test";
 
export class CartPage {
  readonly page: Page;
 
  // Header
  readonly title: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
 
  // Sidebar
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
 
  // Cart contents
  readonly cartList: Locator;
  readonly cartItems: Locator;
 
  // Action buttons
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
 
  constructor(page: Page) {
    this.page = page;
 
    // Header
    this.title = page.locator(".title");
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
 
    // Sidebar
    this.allItemsLink = page.locator("#inventory_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.resetAppStateLink = page.locator("#reset_sidebar_link");
 
    // Cart contents
    this.cartList = page.locator(".cart_list");
    this.cartItems = page.locator(".cart_item");
 
    // Action buttons
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }
 
  // Navigation
  async openMenu() {
    await this.menuButton.click();
  }
 
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
 
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
 
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
 
  // Cart item helpers
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }
 
  async getItemName(): Promise<string[]> {
    return this.cartItems
      .locator(".inventory_item_name")
      .allTextContents();
  }
 
  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.cartItems
      .locator(".inventory_item_price")
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace("$", "")));
  }
 
  async getItemQuantities(): Promise<number[]> {
    const qtyTexts = await this.cartItems
      .locator(".cart_quantity")
      .allTextContents();
    return qtyTexts.map((q) => parseInt(q, 10));
  }
 
  async removeItem(productDataTestId: string) {
    await this.page
      .locator(`[data-test="remove-${productDataTestId}"]`)
      .click();
  }
 
  async isItemInCart(name: string): Promise<boolean> {
    return this.cartItems
      .locator(".inventory_item_name", { hasText: name })
      .isVisible();
  }
 
  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? "0", 10);
  }
}