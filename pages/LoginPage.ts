import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessageLockedOut: Locator;
  readonly errorMessageInvalidPassword: Locator;
  readonly errorMessageEmptyUsername: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessageLockedOut = page.getByText("Epic sadface: Sorry, this user has been locked out.");
    this.errorMessageInvalidPassword = page.getByText("Epic sadface: Username and password do not match any user in this service");
    this.errorMessageEmptyUsername = page.getByText("Epic sadface: Username is required");
  }

  async open() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
