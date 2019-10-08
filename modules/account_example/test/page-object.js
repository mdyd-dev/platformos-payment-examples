import {
  Selector
} from 'testcafe';

export default class Stripe {
  constructor() {
    this.button = {
      submit: Selector('button[data-stripe-account-submit]'),
      addAccount: Selector('a[data-add-account]'),
      deleteAccount: Selector('.delete-stripe'),
      createAccount: Selector('.btn.btn-primary'),
    };
    this.checkbox = {
      bankAccount: Selector('.form-check-label').withText('Bank Account'),
    };
    this.iframe = {
      iframeStripe: Selector('iframe[name="stripe_checkout_app"]'),
      validation: Selector('.Popover-content'),
    };
    this.link = {
      editAccount: Selector('a').withText('Edit'),
      signup: Selector('a').withText('Register'),
      login: Selector('a').withText('Log in'),
      devRegister: Selector('a').withText('Developer'),
      clientRegister: Selector('a').withText('Client'),
      homePage: Selector('a').withText('PlatformOS Examples'),
      account: Selector('a').withText('Saving Account [WIP]'),
      refreshPage: Selector('a').withText('refresh page')
    };
    this.element = {
      address: Selector('.mt-3 li').withText('Address'),
      state: Selector('table td:nth-of-type(2)'),
      info: Selector('.mt-4 p'),
    };
    this.input = {
      // firstname: Selector('#input-first-name'),
      // lastname: Selector('#input-last-name'),
      uploadAvatarFront: Selector('#document-front'),
      uploadAvatarBack: Selector('#document-back'),
      uploadDocumentFront: Selector('#additional_document-front'),
      uploadDocumentBack: Selector('#additional_document-back'),
      email: Selector('[type="email"]'),
      emailMA: Selector('#input-email'),
      password: Selector('[type="password"]'),
      phone: Selector('[data-name="person[phone]"]'),
      country: Selector['data-country'],
      routingNumber: Selector('[data-routing-number]'),
      accountNumber: Selector('[data-account-number]'),
      accountHolderName: Selector('[data-account-holder-name]'),
      firstNameRegisterForm: Selector('#form_first_name'),
      phoneRegisterForm: Selector('#form_mobile_number'),
      firstName: Selector('[data-first-name]'),
      lastName: Selector('[data-last-name]'),
      dateOfBirth: Selector('[data-date-of-birth]'),
      email: Selector('input[type="email"]'),
      password: Selector('input[type="password"]'),
      address: Selector(
        '.person.border-bottom.border-light.mb-5 #input-address'
      ),
      address: Selector('#input-address'),
      city: Selector('#input-city'),
      state: Selector('#input-state'),
      code: Selector('#input-zip'),
      cardNumber: Selector(
        '.Fieldset-childLeftRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      date: Selector(
        '.Fieldset-childLeft > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      ccv: Selector(
        '.Fieldset-childRight > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
      zip: Selector(
        '.Fieldset-childLeftRight.Fieldset-childBottom > .Textbox-inputRow > input[type="tel"].Fieldset-input.Textbox-control'
      ),
    };
  }
}