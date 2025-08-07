const loginPage = require('../pageobjects/login.page.js');

describe('Login functionality', () => {
  it('should show error for invalid password and valid login  ', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'wrongpassword');
    await loginPage.errorMessage.waitForExist({ timeout: 3000 });
    await loginPage.errorMessage.waitForDisplayed({ timeout: 3000 });

    const errorText = await loginPage.errorMessage.getText();

    expect(errorText).toContain(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
