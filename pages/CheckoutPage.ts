import { type Locator, type Page } from "@playwright/test";
 
export class CheckoutPage {
  readonly page: Page;
 
  // Header
  readonly title: Locator;
  readonly menuButton: Locator;
 
  // Sidebar
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
 
  // Step One — Customer info form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
 
  // Step Two — Order overview
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly backButton: Locator;
 
  // Step Complete — Confirmation
  readonly confirmationHeader: Locator;
  readonly confirmationText: Locator;
  readonly backHomeButton: Locator;
 
  constructor(page: Page) {
    this.page = page;
 
    // Header
    this.title = page.locator(".title");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
 
    // Sidebar
    this.allItemsLink = page.locator("#inventory_sidebar_link");
    this.aboutLink = page.locator("#about_sidebar_link");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.resetAppStateLink = page.locator("#reset_sidebar_link");
 
    // Step One
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
 
    // Step Two
    this.cartItems = page.locator(".cart_item");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');
    this.backButton = page.locator('[data-test="back-to-cart"]');
 
    // Complete
    this.confirmationHeader = page.locator(".complete-header");
    this.confirmationText = page.locator(".complete-text");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
 
  // Navigation
  async openMenu() {
    await this.menuButton.click();
  }
 
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
 
  async cancel() {
    await this.cancelButton.click();
  }
 
  // Step One — fill in customer info and continue
  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
 
  async continue() {
    await this.continueButton.click();
  }
 
  async fillCustomerInfoAndContinue(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.fillCustomerInfo(firstName, lastName, postalCode);
    await this.continue();
  }
 
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? "";
  }
 
  // Step Two — summary helpers
  async getOrderedItemNames(): Promise<string[]> {
    return this.cartItems
      .locator(".inventory_item_name")
      .allTextContents();
  }
 
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, "") ?? "0");
  }
 
  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, "") ?? "0");
  }
 
  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, "") ?? "0");
  }
 
  async finish() {
    await this.finishButton.click();
  }
 
  async goBackToCart() {
    await this.backButton.click();
  }
 
  // Step Complete
  async getConfirmationHeader(): Promise<string> {
    return (await this.confirmationHeader.textContent()) ?? "";
  }
 
  async getConfirmationText(): Promise<string> {
    return (await this.confirmationText.textContent()) ?? "";
  }
 
  async goBackHome() {
    await this.backHomeButton.click();
  }
}