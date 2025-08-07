const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Login functionality', () => {
  it('should log in with valid credentials', async () => {
    await browser.url('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.products.waitForDisplayed({ timeout: 5000 });
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/inventory.html');
  });
});
