class InventoryPage {
  get products() {
    return $('.inventory_list');
  }
  get sortDropdown() {
    return $('.product_sort_container');
  }
  get productNamesElements() {
    return $$('div.inventory_item_name');
  }
  get productPricesElements() {
    return $$('div.inventory_item_price');
  }
  get addToCartBtn() {
    return $('button.btn_inventory');
  }
  get allAddToCartButtons() {
    return $$('button.btn_inventory');
  }
  get cartIcon() {
    return $('.shopping_cart_link');
  }
  get cartBadge() {
    return $('.shopping_cart_badge');
  }
  get burgerButton() {
    return $('#react-burger-menu-btn');
  }
  get logoutLink() {
    return $('#logout_sidebar_link');
  }
  get burgerMenuItems() {
    return $$('.bm-item-list a');
  }
  async waitForProducts() {
    await this.products.waitForDisplayed({ timeout: 5000 });
  }
  async sortBy(option) {
    await this.sortDropdown.waitForDisplayed({ timeout: 5000 });
    const currentValue = await this.sortDropdown.getValue();
    if (currentValue === option) return;

    const productNamesBefore = await this.getProductNames();
    if (productNamesBefore.length === 0) {
      throw new Error('No products found to sort');
    }
    const firstProductBefore = productNamesBefore[0];

    await this.sortDropdown.selectByAttribute('value', option);
    await browser.waitUntil(
      async () => {
        const newValue = await this.sortDropdown.getValue();
        return newValue === option;
      },
      {
        timeout: 5000,
        timeoutMsg: `Sort value did not change to ${option}`,
      }
    );
    await browser.waitUntil(
      async () => {
        const productNamesAfter = await this.getProductNames();
        if (productNamesAfter.length === 0) return false;
        const firstProductAfter = productNamesAfter[0];
        return firstProductAfter !== firstProductBefore;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Products did not update after sorting',
      }
    );
  }
  async getProductNames() {
    try {
      await browser.waitUntil(
        async () => {
          const elements = await $$('div.inventory_item_name');
          return elements.length > 0;
        },
        {
          timeout: 5000,
          timeoutMsg: 'Product name elements not found',
        }
      );

      const elements = await $$('div.inventory_item_name');
      console.log('Elements found:', elements.length);

      if (elements.length === 0) {
        console.log('No product name elements found');
        return [];
      }

      const names = [];
      for (let i = 0; i < elements.length; i++) {
        try {
          const text = await elements[i].getText();
          names.push(text);
        } catch (err) {
          console.log(`Error getting text from element ${i}:`, err);
        }
      }

      return names;
    } catch (error) {
      console.log('Error getting product names:', error);
      return [];
    }
  }
  async getProductPrices() {
    try {
      await browser.waitUntil(
        async () => {
          const elements = await $$('div.inventory_item_price');
          return elements.length > 0;
        },
        {
          timeout: 5000,
          timeoutMsg: 'Product price elements not found',
        }
      );

      const elements = await $$('div.inventory_item_price');
      console.log('Price elements found:', elements.length);

      if (elements.length === 0) {
        console.log('No product price elements found');
        return [];
      }

      const prices = [];
      for (let i = 0; i < elements.length; i++) {
        try {
          const text = await elements[i].getText();
          const price = parseFloat(text.replace('$', ''));
          prices.push(price);
        } catch (err) {
          console.log(`Error getting price from element ${i}:`, err);
        }
      }

      return prices;
    } catch (error) {
      console.log('Error getting product prices:', error);
      return [];
    }
  }
  async addToCart() {
    await this.addToCartBtn.click();
  }
  async openCart() {
    await this.cartIcon.click();
  }
  async openBurgerMenu() {
    await this.burgerButton.waitForDisplayed({ timeout: 3000 });
    await this.burgerButton.click();
  }
  async logout() {
    await this.logoutLink.waitForDisplayed({ timeout: 3000 });
    await this.logoutLink.click();
  }
}
module.exports = new InventoryPage();
