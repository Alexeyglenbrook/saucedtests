const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutPage = require('../pageobjects/checkout.page');
const checkoutCompletePage = require('../pageobjects/checkoutComplete.page');
const { faker } = require('@faker-js/faker');

describe('End-to-End Checkout Flow', () => {
  it('should log in, add item, complete checkout, and return home', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addToCart();
    await expect(inventoryPage.cartIcon).toBeDisplayed();

    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const zipCode = faker.address.zipCode();

    await checkoutPage.fillForm(firstName, lastName, zipCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutCompletePage.thankYouMessage).toHaveText(
      'Thank you for your order!'
    );
    await checkoutCompletePage.backHome();

    await expect(inventoryPage.cartBadge).not.toBeDisplayed();
  });
});
