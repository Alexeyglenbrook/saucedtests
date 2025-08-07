const { Given, When, Then } = require('@wdio/cucumber-framework');
const loginPage = require('../pageobjects/login.page');

Given('User is located on the main page of saucedemo website', async () => {
  await loginPage.open();
});

When('User click {string} button', async (button) => {
  await loginPage.login('', '');
});

Then('User should see {string} error message', async (errorMessage) => {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain(errorMessage);
});
