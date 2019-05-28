import {
  Selector,
  t
} from 'testcafe';

export default class Stripe {
  constructor() {
    this.iframe = Selector('iframe[name="__privateStripeFrame5"]');
    this.status = Selector('tr:nth-of-type(2) > td:nth-of-type(2)');
    this.h4 = Selector('h4');
    this.logout = Selector('.btn.btn-secondary.btn-sm');
    this.button = {
      pay: Selector('.btn.float-right.mt-3.btn-primary.stripe-button-el.charge-stripe'),
      acctionButton: Selector('tr:nth-of-type(2) button[type="submit"].btn.btn-primary.stripe-button-el.charge-stripe')
    };
    this.input = {
      cardNumber: Selector('input[name="cardnumber"]'),
      expDate: Selector('input[name="exp-date"]'),
      cvc: Selector('input[name="cvc"]'),
      postal: Selector('input[name="postal"]')
    };
  }
}