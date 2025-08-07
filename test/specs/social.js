const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');
const footerSocialPage = require('../pageobjects/FooterSocialPage');

describe('Footer social icons functionality', () => {
  let page;

  before(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForProducts();
  });

  it('should open Twitter (X) in a new tab', async () => {
    await footerSocialPage.openTwitter();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    expect(await browser.getUrl()).toContain('x.com');
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });

  it('should open Facebook in a new tab', async () => {
    await footerSocialPage.openFacebook();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    expect(await browser.getUrl()).toContain('facebook.com');
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });

  it('should open LinkedIn in a new tab', async () => {
    await footerSocialPage.openLinkedin();
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    expect(await browser.getUrl()).toContain('linkedin.com');
    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });
});
