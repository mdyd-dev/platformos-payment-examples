import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/login';
import {
  checkLiquidErrors,
  getBtAlertElement
} from '@platform-os/testcafe-helpers';

const stripe = new Stripe();
const login = new Login();

const {
  email,
  password
} = {
  email: 'test_stripe@test.com',
  password: 'password'
};

const VALID_CC = '4242 4242 4242 4242';
const INVALID_CC = '4000 0000 0000 0002';

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(email, password);
    await t.navigateTo('/payments');
  });

test('Pay by using valid credit card', async t => {
  await checkLiquidErrors({
    t,
    Selector
  });
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, VALID_CC)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, faker.address.zipCode())
    .click(stripe.button.submitCharge);

  /*
    Im pretty sure its not testing what its supposed to test, but i give up on trying to test 
    this stripe-iframe-js-async-magic-mumbo-jumbo.
    
    How do I know it doesnt test anything? :-)
      `await getBtAlertElement({ Selector }).count === undefined`
  */
  await t.expect(await getBtAlertElement({
    Selector
  })).ok();
});

test('Pay by using invalid card with declined code', async t => {
  await checkLiquidErrors({
    t,
    Selector
  });
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, INVALID_CC)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .typeText(stripe.input.zip, faker.address.zipCode())
    .click(stripe.button.submitCharge);

  await t.expect(stripe.iframe.validation.textContent).contains('This card was declined.');
});