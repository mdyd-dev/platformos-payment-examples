import { Selector, ClientFunction } from 'testcafe';

export default class HomePage {
  getPageUrl() {
    return ClientFunction(() => window.location.href);
  }
  constructor() {
    this.LINKS = [
      'Integrating Stripe payments with Stripe Elements',
      'Saving Account',
      'Saving Customer with Credit Card',
      'Integrating Stripe payments',
      'https://github.com/mdyd-dev/platformos-payment-examples',
      'https://github.com/mdyd-dev/platformos-payments',
      'https://github.com/mdyd-dev/platformos-payments-stripe',
    ];
  }
}
