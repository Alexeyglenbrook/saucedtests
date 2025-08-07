const loginPage = require('../pageobjects/login.page.js');
const inventoryPage = require('../pageobjects/inventory.page.js');

describe('Logout functionality', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
    await browser.execute(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await browser.deleteCookies();
  });

  it('should log out via burger menu and redirect to login page', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.products.waitForDisplayed({ timeout: 5000 });

    await inventoryPage.burgerButton.waitForDisplayed({ timeout: 5000 });
    await inventoryPage.burgerButton.click();

    await browser.pause(300);

    const menuItems = await inventoryPage.burgerMenuItems;
    expect(menuItems.length).toBe(4);

    await inventoryPage.logoutLink.waitForDisplayed({ timeout: 5000 });
    await inventoryPage.logoutLink.click();

    await expect(loginPage.username).toBeDisplayed();
    expect(await loginPage.username.getValue()).toBe('');
    expect(await loginPage.password.getValue()).toBe('');
  });
});
