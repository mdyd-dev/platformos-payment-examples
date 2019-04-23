import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/Login';
import {
  getBtAlertText,
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

fixture('Merchant Account')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(email, password);
    await t.navigateTo('/account');
  });

test('Add new account', async t => {
  await t
    .click(stripe.button.addAccount)

  await t
    .click(Selector('#gridCheck'))
    .expect(stripe.button.submit.exists).ok()
    .click(stripe.button.submit);

  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists).ok()
    .typeText(stripe.input.routingNumber, data.au.routingNumber)
    .typeText(stripe.input.accountNumber, data.au.accountNumber)
    .typeText(stripe.input.accountHolderName, data.au.accountHolderName)
    .typeText(stripe.input.firstName, data.au.firstName)
    .typeText(stripe.input.lastName, data.au.lastName)
    .typeText(stripe.input.dateOfBirth, data.au.dateOfBirth)
    .click(stripe.button.submit);

  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully created an account\n')

    .expect(Selector('.badge').withText('Payouts enabled').exists).ok()
    .expect(Selector('.badge').withText('Payments enabled').exists).ok();

  await t.navigateTo('/account')
    .click(stripe.button.deleteAccount)

  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully deleted an account')
});