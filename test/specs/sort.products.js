const loginPage = require('../pageobjects/login.page.js');
const inventoryPage = require('../pageobjects/inventory.page.js');

describe('Product sorting functionality', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
    await browser.deleteAllCookies();
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForProducts();
  });

  it('should sort products by Name (A to Z)', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  it('should sort products by Name (Z to A)', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  it('should sort products by Price (low to high)', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it('should sort products by Price (high to low)', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
