const loginPage = require('../pageobjects/login.page.js');
const inventoryPage = require('../pageobjects/inventory.page.js');
const cartPage = require('../pageobjects/cart.page.js');

describe('Cart persistence after logout and login', () => {
  beforeEach(async () => {
    await loginPage.open();
    await browser.deleteAllCookies();
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  it('should persist cart after logout and login', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.products.waitForDisplayed({ timeout: 5000 });

    await inventoryPage.addToCart();
    await expect(inventoryPage.cartBadge).toBeDisplayed();
    expect(await inventoryPage.cartBadge.getText()).toBe('1');

    await inventoryPage.burgerButton.waitForDisplayed({ timeout: 5000 });
    await inventoryPage.burgerButton.click();

    await browser.waitUntil(
      async () => {
        const items = await inventoryPage.burgerMenuItems;
        return items.length === 4;
      },
      {
        timeout: 3000,
        timeoutMsg: 'Burger menu items not displayed or incorrect count',
      }
    );

    const menuItems = await inventoryPage.burgerMenuItems;
    expect(menuItems.length).toBe(4);

    await inventoryPage.logoutLink.waitForDisplayed({ timeout: 5000 });
    await inventoryPage.logoutLink.click();

    await expect(loginPage.username).toBeDisplayed();
    expect(await loginPage.username.getValue()).toBe('');
    expect(await loginPage.password.getValue()).toBe('');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.products.waitForDisplayed({ timeout: 5000 });

    await inventoryPage.openCart();
    const cartItems = await cartPage.cartItems;

    await cartItems[0].waitForDisplayed({ timeout: 5000 });

    const cartItemCount = cartItems.length;
    expect(cartItemCount).toBe(1);
  });
});
