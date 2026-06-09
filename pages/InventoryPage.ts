import { type Locator, type Page } from "@playwright/test";
 
export class InventoryPage {
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
 
  // Inventory
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
 
  // Individual "Add to cart" buttons (by product name data-test attribute)
  readonly addBackpackToCartButton: Locator;
  readonly addBikeLightToCartButton: Locator;
  readonly addBoltTShirtToCartButton: Locator;
  readonly addFleeceJacketToCartButton: Locator;
  readonly addOnesieToCartButton: Locator;
  readonly addRedTShirtToCartButton: Locator;

  // Individual "Remove from cart" buttons (by product name data-test attribute)
  readonly removeBackpackFromCartButton: Locator;
  readonly removeBikeLightFromCartButton: Locator;
  readonly removeBoltTShirtFromCartButton: Locator;
  readonly removeFleeceJacketFromCartButton: Locator;
  readonly removeOnesieFromCartButton: Locator;
  readonly removeRedTShirtFromCartButton: Locator;
 
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
 
    // Inventory
    this.inventoryList = page.locator(".inventory_list");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator(".product_sort_container");
 
    // Add to cart buttons
    this.addBackpackToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
    this.addBikeLightToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    );
    this.addBoltTShirtToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
    );
    this.addFleeceJacketToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
    );
    this.addOnesieToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-onesie"]'
    );
    this.addRedTShirtToCartButton = page.locator(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    );

     // Remove from cart buttons
    this.removeBackpackFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
    this.removeBikeLightFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-bike-light"]'
    );
    this.removeBoltTShirtFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-bolt-t-shirt"]'
    );
    this.removeFleeceJacketFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-fleece-jacket"]'
    );
    this.removeOnesieFromCartButton = page.locator(
      '[data-test="remove-sauce-labs-onesie"]'
    );
    this.removeRedTShirtFromCartButton = page.locator(
      '[data-test="remove-test.allthethings()-t-shirt-(red)"]'
    );
  }
 
  // Navigation
  async openMenu() {
    await this.menuButton.click();
  }
 
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
 
  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
  }
 
  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }
 
  // Cart
  async goToCart() {
    await this.cartIcon.click();
  }
 
  async getCartCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? "0", 10);
  }
 
  // Sorting
  async sortBy(
    option: "az" | "za" | "lohi" | "hilo"
  ) {
    await this.sortDropdown.selectOption(option);
  }
 
  // Add to cart
  async addToCart(
    product:
      | "backpack"
      | "bike-light"
      | "bolt-t-shirt"
      | "fleece-jacket"
      | "onesie"
      | "red-t-shirt"
  ) {
    const buttonMap: Record<string, Locator> = {
      backpack: this.addBackpackToCartButton,
      "bike-light": this.addBikeLightToCartButton,
      "bolt-t-shirt": this.addBoltTShirtToCartButton,
      "fleece-jacket": this.addFleeceJacketToCartButton,
      onesie: this.addOnesieToCartButton,
      "red-t-shirt": this.addRedTShirtToCartButton,
    };
    await buttonMap[product].click();
  }
 
  // Item details
  async getInventoryItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }
 
  async getItemNames(): Promise<string[]> {
    return this.inventoryItems
      .locator(".inventory_item_name")
      .allTextContents();
  }
 
  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .locator(".inventory_item_price")
      .allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace("$", "")));
  }
 
  async clickItemByName(name: string) {
    await this.inventoryItems
      .locator(".inventory_item_name", { hasText: name })
      .click();
  }
}