import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/login';
import {
  credit_card,
  user_stripe
} from '../../../tests/e2e/data/data.js';
import {
  getBtAlertText
} from '@platform-os/testcafe-helpers';

const stripe = new Stripe();
const login = new Login();

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(user_stripe.email, user_stripe.password);
    await t.navigateTo('/customer');
  });

const deleteCardButton = Selector('.delete-stripe');
const chargeCardButton = Selector('.charge-stripe');

test.skip('Add new customer with credit card', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, credit_card.VALID_CC)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .click(stripe.button.submitCharge)
    .wait(5000);
});

test.skip('Charge and delete valid credit card', async t => {
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

test.skip('Add new customer with invalid credit card', async t => {
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, credit_card.VALID_NO_CHARGE)
    .typeText(stripe.input.date, '12/23')
    .typeText(stripe.input.ccv, '111')
    .click(stripe.button.submitCharge)
    .wait(5000);
});

test.skip('Charge and delete invalid credit card', async t => {
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