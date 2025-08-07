class CheckoutCompletePage {
  get thankYouMessage() {
    return $('.complete-header');
  }
  get backHomeBtn() {
    return $('#back-to-products');
  }

  async backHome() {
    await this.backHomeBtn.click();
  }
}
module.exports = new CheckoutCompletePage();
