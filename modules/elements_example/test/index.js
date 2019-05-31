import {
  Selector
} from "testcafe";
import faker from "faker";
import Stripe from "./page-object";
import Login from "../../../tests/e2e/page-objects/login";
import {
  user_stripe,
  credit_card
} from "../../../tests/e2e/data/data.js";
import {
  checkLiquidErrors,
  getBtAlertText
} from "@platform-os/testcafe-helpers";

const stripe = new Stripe();
const login = new Login();

fixture("Authorized, Paid, Refunded")
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(user_stripe.email, user_stripe.password);
    await t.navigateTo("/elements");
  });

test("Verify statuses: Authorized, Paid, Refunded", async t => {
  await checkLiquidErrors({
    t,
    Selector
  });
  await t
    .switchToIframe(stripe.iframe)
    .typeText(stripe.input.cardNumber, credit_card.VALID_CC)
    .typeText(stripe.input.expDate, "12/23")
    .typeText(stripe.input.cvc, "111")
    .typeText(stripe.input.postal, faker.address.zipCode())
  await t
    .switchToMainWindow()
    .click(stripe.button.pay)
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully created payment');
  await t.expect(stripe.status.innerText).eql('Authorized')
  await t.click(stripe.button.acctionButton)
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully captured payment');
  await t.expect(stripe.status.innerText).eql('Paid')
  await t.click(stripe.button.acctionButton)
  await t.expect(await getBtAlertText({
      type: 'success',
      Selector
    }))
    .contains('You have successfully refunded payment');
  await t.expect(stripe.status.innerText).eql('Refunded')
});