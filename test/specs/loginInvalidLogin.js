const loginPage = require('../pageobjects/login.page.js');

describe('Login functionality', () => {
  it('should show error for invalid username and valid password', async () => {
    await loginPage.open();
    await loginPage.login('standarD_user', 'secret_sauce');
    await loginPage.errorMessage.waitForExist({ timeout: 3000 });
    await loginPage.errorMessage.waitForDisplayed({ timeout: 3000 });

    const errorText = await loginPage.errorMessage.getText();

    expect(errorText).toContain(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
