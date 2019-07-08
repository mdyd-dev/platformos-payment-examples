import { Selector } from 'testcafe';
import { checkLiquidErrors } from '@platform-os/testcafe-helpers';
import Homepage from './page-object';

const homepage = new Homepage();

fixture('Homepage').page(process.env.MP_URL);

test('There are no liquid errors on the page', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('links present', async t => {
  for (var i = 0, len = homepage.LINKS.length; i < len; i++) {
    console.log("Checking link:", homepage.LINKS[i])
    await t.expect(Selector('a').withText(homepage.LINKS[i]).count).gte(1);
  }
});
