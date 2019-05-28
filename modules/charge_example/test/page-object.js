import {
  Selector,
  t
} from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button.stripe-button-el'),
      submitCharge: Selector('button[type="submit"]'),
      pay: Selector('button[type="submit"].btn.float-right')
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content')
    };
    this.input = {
      card_number: Selector('iframe[name="__privateStripeFrame5"] input[name="cardnumber"]'),
      exp_date: Selector('iframe[name="__privateStripeFrame5"] input[name="exp-date"]'),
      cvc: Selector('iframe[name="__privateStripeFrame5"] input[name="cvc"]'),
      postal: Selector('iframe[name="__privateStripeFrame5"] input[name="postal"]'),
      email: Selector('input[type="email"]'),
      password: Selector('input[type="password"]'),
      cardNumber: Selector(
        '.Fieldset-childLeftRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      date: Selector('.Fieldset-childLeft > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'),
      ccv: Selector('.Fieldset-childRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'),
      zip: Selector(
        '.Fieldset-childLeftRight.Fieldset-childBottom > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      )
    };
  }
}