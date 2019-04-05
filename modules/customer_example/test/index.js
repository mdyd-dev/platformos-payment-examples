import { Selector } from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import { checkLiquidErrors, getBtAlertElement } from '@platform-os/testcafe-helpers';

const stripe = new Stripe();

const { email, password } = {
  email: 'test_stripe@test.com',
  password: 'password'
};

const VALID_CC = '4242 4242 4242 4242';
const INVALID_CC = '4000 0000 0000 0002';

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await stripe.login(email, password);
    await t.navigateTo('/customer');
  });

const nameInput = Selector('.deleteStripe');
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


test('Delete credit card', async t => {
  await nameInput();

  await t.expect(stripe.button.deleteCard.exists).ok()
    .click(stripe.button.deleteCard)
    .expect(Selector('.alert').withText('You have successfully deleted credit card').exists)
    .ok();
});

