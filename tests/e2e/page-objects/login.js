import {
  Selector,
  t
} from 'testcafe';

export default class Login {
  constructor() {
    this.button = {
      logout: Selector('button').withText('Log Out'),
      submit: Selector('button').withText('Log in')
    };

    this.input = {
      password: Selector('#form_password'),
      email: Selector('#form_email')
    };
  }

  async login(username, password) {
    const submitButton = Selector('button.btn.btn-primary');

    await t.navigateTo('/sign-in');
    await t
      .typeText(this.input.email, username, { paste: true })
      .typeText(this.input.password, password, { paste: true })
      .click(submitButton);
  }
}
