import { Selector } from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import { checkLiquidErrors, getBtAlertElement } from '@platform-os/testcafe-helpers';

const stripe = new Stripe();

const { email, password } = {
  email: 'test_stripe@test.com',
  password: 'password'
};

const data = {
  au: {
    routingNumber: '110000',
    accountNumber: '000123456',
    accountHolderName: 'John Smith',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '31/01/1990'
  }
}

fixture('Stripe')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await stripe.login(email, password);
    await t.navigateTo('/account');
  });


test('Add new account', async t => {
  await t
    .click(stripe.button.addAccount)

  await t
    .click(Selector('#gridCheck'))
    .expect(stripe.button.submit.exists).ok()
    .click(stripe.button.submit)
    .expect(Selector('.alert').withText('You have successfully created an account').exists).ok();

  await t
    .expect(stripe.input.routingNumber.exists).ok()
    .typeText(stripe.input.routingNumber, data.au.routingNumber)
    .typeText(stripe.input.accountNumber, data.au.accountNumber)
    .typeText(stripe.input.accountHolderName, data.au.accountHolderName)
    .typeText(stripe.input.firstName, data.au.firstName)
    .typeText(stripe.input.lastName, data.au.lastName)
    .typeText(stripe.input.dateOfBirth, data.au.dateOfBirth)
    .click(stripe.button.submit)
    .expect(Selector('.alert').withText('You have successfully updated an account').exists).ok()
    .expect(Selector('.badge').withText('Payouts enabled').exists).ok()
    .expect(Selector('.badge').withText('Payments enabled').exists).ok();

  await t.navigateTo('/account')
    .click(stripe.button.deleteAccount)
    .expect(Selector('.alert').withText('You have successfully deleted an account').exists).ok()
});


// const deleteCardButton = Selector('.delete-stripe');
// const chargeCardButton = Selector('.charge-stripe');
//
// test('Add new customer with credit card', async t => {
//   await t
//     .click(stripe.button.submit)
//     .switchToIframe(stripe.iframe.iframeStripe)
//     .typeText(stripe.input.cardNumber, VALID_CC)
//     .typeText(stripe.input.date, '12/23')
//     .typeText(stripe.input.ccv, '111')
//     .click(stripe.button.submitCharge)
//     .wait(5000);
// });
//
// test('Charge and delete valid credit card', async t => {
//   await chargeCardButton();
//
//   await t.expect(stripe.button.chargeCard.exists).ok()
//     .click(stripe.button.chargeCard)
//     .expect(Selector('.alert').withText('You have successfully created payment').exists)
//     .ok();
//
//   await t.expect(stripe.button.deleteCard.exists).ok()
//     .click(stripe.button.deleteCard)
//     .expect(Selector('.alert').withText('You have successfully deleted credit card').exists)
//     .ok();
// });
//
// test('Add new customer with invalid credit card', async t => {
//   await t
//     .click(stripe.button.submit)
//     .switchToIframe(stripe.iframe.iframeStripe)
//     .typeText(stripe.input.cardNumber, VALID_NO_CHARGE)
//     .typeText(stripe.input.date, '12/23')
//     .typeText(stripe.input.ccv, '111')
//     .click(stripe.button.submitCharge)
//     .wait(5000);
// });
//
// test('Charge and delete invalid credit card', async t => {
//   await chargeCardButton();
//
//   await t.expect(stripe.button.chargeCard.exists).ok()
//     .click(stripe.button.chargeCard)
//     .expect(Selector('.alert').withText('Your card was declined.').exists)
//     .ok();
//
//   await t.expect(stripe.button.deleteCard.exists).ok()
//     .click(stripe.button.deleteCard)
//     .expect(Selector('.alert').withText('You have successfully deleted credit card').exists)
//     .ok();
// });
