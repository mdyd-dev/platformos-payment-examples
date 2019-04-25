import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/login';
import {
  ma_data,
  user_stripe
} from '../../../tests/e2e/data/data.js';
import {
  getBtAlertText
} from '@platform-os/testcafe-helpers';

const stripe = new Stripe();
const login = new Login();

fixture('Merchant Account')
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(user_stripe.email, user_stripe.password);
    await t.navigateTo('/account');
  });

test('Add new account', async t => {
  await t.click(stripe.button.addAccount);

  await t
    .click(Selector('#gridCheck'))
    .expect(stripe.button.submit.exists)
    .ok()
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber)
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber)
    .typeText(stripe.input.accountHolderName, ma_data.au.accountHolderName)
    .typeText(stripe.input.firstName, ma_data.au.firstName)
    .typeText(stripe.input.lastName, ma_data.au.lastName)
    .typeText(stripe.input.dateOfBirth, ma_data.au.dateOfBirth)
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account\n')
    .expect(Selector('.badge').withText('Payouts enabled').exists)
    .ok()
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .navigateTo('/account')
    .expect(stripe.element.state.innerText).eql('verified')
    .click(stripe.button.deleteAccount);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully deleted an account');
});

test('Update of necessary data', async t => {
  await t.click(stripe.button.addAccount);

  await t
    .click(Selector('#gridCheck'))
    .expect(stripe.button.submit.exists)
    .ok()
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber)
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber)
    .typeText(stripe.input.accountHolderName, ma_data.au.accountHolderName)
    .typeText(stripe.input.firstName, ma_data.au.firstName)
    .typeText(stripe.input.lastName, ma_data.au.lastName)
    .typeText(stripe.input.dateOfBirth, ma_data.au.dateOfBirth)
    .typeText(stripe.input.city, ma_data.au.city)
    .typeText(stripe.input.state, ma_data.au.state)
    .typeText(stripe.input.code, ma_data.au.code)
    .click(stripe.button.submit)

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account\n')
    .expect(Selector('.badge').withText('Payouts enabled').exists)
    .ok()
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .navigateTo('/account')
    .click(stripe.link.editAccount)
    .expect((stripe.element.address).exists).ok()
  await t
    .typeText(stripe.input.address, ma_data.au.address)
    .click(stripe.button.submit);
  await t
    .navigateTo('/account')
    .click(stripe.link.editAccount)
    .expect((stripe.element.address).exists).notOk()
  await t
    .navigateTo('/account')
    .click(stripe.button.deleteAccount)

  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully deleted an account')
});

test('Pending state', async t => {
  await t.click(stripe.button.addAccount);

  await t
    .click(Selector('#gridCheck'))
    .expect(stripe.button.submit.exists)
    .ok()
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber)
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber)
    .click(stripe.button.submit)

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      })
    )
    .contains('You have successfully created an account\n')
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .navigateTo('/account')
    .expect(stripe.element.state.innerText).eql('pending')
  await t
    .click(stripe.button.deleteAccount)

  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully deleted an account')
});