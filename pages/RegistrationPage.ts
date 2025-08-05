import { Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  async goToHomePage() {
    await this.page.goto('https://automationexercise.com');
  }

  async clickSignupLogin() {
    await this.page.click('a[href="/login"]');
  }

  async fillSignupForm(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async fillDetails(user: any) {
    await this.page.check(user.genderSelector);
    await this.page.fill('input[data-qa="password"]', user.password);
    await this.page.selectOption('select[data-qa="days"]', user.day);
    await this.page.selectOption('select[data-qa="months"]', user.month);
    await this.page.selectOption('select[data-qa="years"]', user.year);
    await this.page.fill('input[data-qa="first_name"]', user.firstName);
    await this.page.fill('input[data-qa="last_name"]', user.lastName);
    await this.page.fill('input[data-qa="address"]', user.address);
    await this.page.selectOption('select[data-qa="country"]', user.country);
    await this.page.fill('input[data-qa="state"]', user.state);
    await this.page.fill('input[data-qa="city"]', user.city);
    await this.page.fill('input[data-qa="zipcode"]', user.zip);
    await this.page.fill('input[data-qa="mobile_number"]', user.mobile);
    await this.page.click('button[data-qa="create-account"]');
  }

  async continueAfterAccountCreated() {
    await this.page.waitForSelector('h2:has-text("Account Created!")');
    await this.page.click('a[data-qa="continue-button"]');
  }
}


