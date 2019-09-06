import {
  Selector
} from 'testcafe';
import faker from 'faker';
import Stripe from './page-object';
import Login from '../../../tests/e2e/page-objects/login';
import {
  ma_data
} from '../../../tests/e2e/data/data.js';
import {
  getBtAlertText
} from '@platform-os/testcafe-helpers';

const stripe = new Stripe();
const login = new Login();

const {
  dev
} = {
  dev: {
    email: faker.internet.exampleEmail(),
    name: faker.name.firstName(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
  },
};

fixture('Merchant Account').page(process.env.MP_URL);

test('Add new account', async t => {
  await t.click(stripe.link.signup);

  await t
    .click(stripe.link.devRegister)
    .typeText(stripe.input.firstname, dev.name, {
      paste: true
    })
    .typeText(stripe.input.email, dev.email, {
      paste: true
    })
    .typeText(stripe.input.password, dev.password, {
      paste: true
    })
    .typeText(stripe.input.phone, dev.phone, {
      paste: true
    })
    .click(stripe.button.createAccount);

  await login.login(dev.email, dev.password);
  await t.navigateTo('/account');

  await t.click(stripe.button.addAccount);

  await t
    .expect(Selector('.badge').withText('Payouts disabled').exists)
    .ok()
    .expect(Selector('.badge').withText('Payments disabled').exists)
    .ok();
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
      }),
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber, {
      paste: true,
    })
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber, {
      paste: true,
    })
    .typeText(stripe.input.accountHolderName, ma_data.au.accountHolderName, {
      paste: true,
    })
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .ok()
    .expect(Selector('.badge').withText('Payouts enabled').exists)
    .ok()
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .typeText(stripe.input.firstName, ma_data.au.firstName, {
      paste: true
    })
    .typeText(stripe.input.lastName, ma_data.au.lastName, {
      paste: true
    })
    .typeText(stripe.input.dateOfBirth, ma_data.au.dateOfBirth, {
      paste: true
    })
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .ok()
});

test('Account verification', async t => {
  await login.login(dev.email, dev.password);

  await t
    .navigateTo('/account')
    .expect(stripe.element.state.innerText)
    .eql('verified')
    .click(stripe.button.deleteAccount);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .contains('You have successfully deleted an account');
});

//Skip tests
test.skip('Update of necessary data', async t => {
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
      }),
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber, {
      paste: true,
    })
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber, {
      paste: true,
    })
    .typeText(stripe.input.accountHolderName, ma_data.au.accountHolderName, {
      paste: true,
    })
    // .typeText(stripe.input.firstName, ma_data.au.firstName, {paste: true})
    // .typeText(stripe.input.lastName, ma_data.au.lastName, {paste: true})
    // .typeText(stripe.input.dateOfBirth, ma_data.au.dateOfBirth, {paste: true})
    // .typeText(stripe.input.city, ma_data.au.city, {paste: true})
    // .typeText(stripe.input.state, ma_data.au.state, {paste: true})
    // .typeText(stripe.input.code, ma_data.au.code, {paste: true})
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .ok()
    .expect(Selector('.badge').withText('Payouts enabled').exists)
    .ok()
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .navigateTo('/account')
    .click(stripe.link.editAccount)
    .expect(stripe.element.address.exists)
    .ok();
  await t
    .typeText(stripe.input.address, ma_data.au.address, {
      paste: true
    })
    .click(stripe.button.submit);
  await t
    .navigateTo('/account')
    .click(stripe.link.editAccount)
    .expect(stripe.element.address.exists)
    .notOk();
  await t.navigateTo('/account').click(stripe.button.deleteAccount);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .contains('You have successfully deleted an account');
});

test.skip('Pending state', async t => {
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
      }),
    )
    .contains('You have successfully created an account');

  await t
    .expect(stripe.input.routingNumber.exists)
    .ok()
    .typeText(stripe.input.routingNumber, ma_data.au.routingNumber, {
      paste: true,
    })
    .typeText(stripe.input.accountNumber, ma_data.au.accountNumber, {
      paste: true,
    })
    .click(stripe.button.submit);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .ok()
    .expect(Selector('.badge').withText('Payments enabled').exists)
    .ok();

  await t
    .navigateTo('/account')
    .expect(stripe.element.state.innerText)
    .eql('pending');
  await t.click(stripe.button.deleteAccount);

  await t
    .expect(
      await getBtAlertText({
        type: 'success',
        Selector,
      }),
    )
    .contains('You have successfully deleted an account');
});