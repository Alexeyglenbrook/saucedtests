const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');

describe('Empty Cart Checkout behavior (expected failure due to known bug)', () => {
  it('should show empty cart and display error on checkout', async () => {
    await browser.url('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.openCart();
    await cartPage.waitForPage();

    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(0);

    await cartPage.clickCheckout();

    await expect(cartPage.errorMessage).toHaveTextContaining('Cart is empty');
  });
});
