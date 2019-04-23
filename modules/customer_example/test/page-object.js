import {
  Selector,
  t
} from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button.stripe-button-el'),
      submitCharge: Selector('button[type="submit"]'),
      deleteCard: Selector('.delete-stripe'),
      chargeCard: Selector('.charge-stripe')
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content')
    };
    this.input = {
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