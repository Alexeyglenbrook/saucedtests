class CheckoutPage {
  get firstName() {
    return $('#first-name');
  }
  get lastName() {
    return $('#last-name');
  }
  get postalCode() {
    return $('#postal-code');
  }
  get continueBtn() {
    return $('#continue');
  }
  get finishBtn() {
    return $('#finish');
  }

  async fillForm(first, last, postal) {
    await this.firstName.setValue(first);
    await this.lastName.setValue(last);
    await this.postalCode.setValue(postal);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}
module.exports = new CheckoutPage();
