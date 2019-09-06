import {
  Selector
} from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button[type="submit"]'),
      addAccount: Selector('a[data-add-account]'),
      deleteAccount: Selector('.delete-stripe'),
      createAccount: Selector('.btn.btn-primary'),
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content')
    };
    this.link = {
      editAccount: Selector('a').withText('Edit'),
      signup: Selector('a').withText('Register'),
      login: Selector('a').withText('Log in'),
      devRegister: Selector('a').withText('Developer'),
      clientRegister: Selector('a').withText('Client'),
      homePage: Selector('a').withText('PlatformOS Examples'),
      account: Selector('a').withText('Saving Account [WIP]')
    }
    this.element = {
      address: Selector('.mt-3 li').withText('Address'),
      state: Selector('table td:nth-of-type(2)'),
      info: Selector('.mt-4 p')
    }
    this.input = {
      firstname: Selector('#form_first_name'),
      email: Selector('[type="email"]'),
      password: Selector('[type="password"]'),
      phone: Selector('#form_mobile_number'),
      country: Selector['data-country'],
      routingNumber: Selector('[data-routing-number]'),
      accountNumber: Selector('[data-account-number]'),
      accountHolderName: Selector('[data-account-holder-name]'),
      firstName: Selector('[data-first-name]'),
      lastName: Selector('[data-last-name]'),
      dateOfBirth: Selector('[data-date-of-birth]'),
      email: Selector('input[type="email"]'),
      password: Selector('input[type="password"]'),
      address: Selector('.person.border-bottom.border-light.mb-5 #input-address'),
      city: Selector('.person.border-bottom.border-light.mb-5 #input-city'),
      state: Selector('.person.border-bottom.border-light.mb-5 #input-state'),
      code: Selector('.person.border-bottom.border-light.mb-5 #input-zip'),
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