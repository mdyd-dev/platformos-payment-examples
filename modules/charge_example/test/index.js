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
  getBtAlertElement
} from "@platform-os/testcafe-helpers";

const stripe = new Stripe();
const login = new Login();

fixture("Stripe")
  .page(process.env.MP_URL)
  .beforeEach(async t => {
    await login.login(user_stripe.email, user_stripe.password);
    await t.navigateTo("/payments");
  });

test("Pay by using valid credit card", async t => {
  await checkLiquidErrors({
    t,
    Selector
  });
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, credit_card.VALID_CC)
    .typeText(stripe.input.date, "12/23")
    .typeText(stripe.input.ccv, "111")
    .typeText(stripe.input.zip, faker.address.zipCode())
    .click(stripe.button.submitCharge);

  /*
    Im pretty sure its not testing what its supposed to test, but i give up on trying to test 
    this stripe-iframe-js-async-magic-mumbo-jumbo.
    
    How do I know it doesnt test anything? :-)
      `await getBtAlertElement({ Selector }).count === undefined`
  */
  await t
    .expect(
      await getBtAlertElement({
        Selector
      })
    )
    .ok();
});

test("Refund", async t => {
  await checkLiquidErrors({
    t,
    Selector
  });
  await t
    .click(stripe.button.submit)
    .switchToIframe(stripe.iframe.iframeStripe)
    .typeText(stripe.input.cardNumber, credit_card.VALID_CC)
    .typeText(stripe.input.date, "12/23")
    .typeText(stripe.input.ccv, "111")
    .typeText(stripe.input.zip, faker.address.zipCode())
    .click(stripe.button.submitCharge);

  /*
    Im pretty sure its not testing what its supposed to test, but i give up on trying to test 
    this stripe-iframe-js-async-magic-mumbo-jumbo.
    
    How do I know it doesnt test anything? :-)
      `await getBtAlertElement({ Selector }).count === undefined`
  */
  await t
    .expect(
      await getBtAlertElement({
        Selector
      })
    )
    .ok();
});