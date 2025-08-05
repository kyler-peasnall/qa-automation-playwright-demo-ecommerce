import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}
  async cardDetails(user: any) {
 // Fill payment form
  await this.page.fill('input[name="name_on_card"]', 'Kyler QA');
  await this.page.fill('input[name="card_number"]', '4111111111111111');
  await this.page.fill('input[name="cvc"]', '123');
  await this.page.fill('input[name="expiry_month"]', '12');
  await this.page.fill('input[name="expiry_year"]', '2026');
  await this.page.click('#submit');
  }
};