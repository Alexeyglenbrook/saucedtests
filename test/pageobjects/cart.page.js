class CartPage {
  get checkoutBtn() {
    return $('#checkout');
  }

  get cartItems() {
    return $$('.cart_item');
  }

  get errorMessage() {
    return $('.cart_error_message_selector');
  }

  async clickCheckout() {
    const isDisplayed = await this.checkoutBtn.isDisplayed();
    if (isDisplayed) {
      await this.checkoutBtn.click();
    } else {
      throw new Error('Checkout button is not displayed - cart may be empty');
    }
  }

  async getCartItemCount() {
    const items = await this.cartItems;
    return items.length;
  }

  async getCartItems() {
    return await this.cartItems;
  }

  async waitForPage() {
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()).includes('cart');
      },
      {
        timeout: 7000,
        timeoutMsg: 'Cart page did not load within timeout',
      }
    );

    const cartTitle = await $('#cart_contents_container');
    await cartTitle.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new CartPage();
