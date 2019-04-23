import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/Login';
import {
  getBtAlertText
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
const VALID_NO_CHARGE = '4000 0000 0000 0341';

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(email, password);
    await t.navigateTo('/customer');
  });

const deleteCardButton = Selector('.delete-stripe');
const chargeCardButton = Selector('.charge-stripe');

test('Add new customer with credit card', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, VALID_CC)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .click(stripe.button.submitCharge)
    .wait(5000);
});

test('Charge and delete valid credit card', async t => {
  await chargeCardButton();
  await t.expect(stripe.button.chargeCard.exists).ok()

  await t.click(stripe.button.chargeCard);
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully created payment');
  await t.expect(stripe.button.deleteCard.exists).ok()

  await t.click(stripe.button.deleteCard)
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully deleted credit card');
});

test('Add new customer with invalid credit card', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, VALID_NO_CHARGE)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .click(stripe.button.submitCharge)
    .wait(5000);
});

test('Charge and delete invalid credit card', async t => {
  await chargeCardButton();
  await t.expect(stripe.button.chargeCard.exists).ok();

  await t.click(stripe.button.chargeCard)
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('Your card was declined.')
  await t.expect(stripe.button.deleteCard.exists).ok()

  await t.click(stripe.button.deleteCard);
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully deleted credit card')
});