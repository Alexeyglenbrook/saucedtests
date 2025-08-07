class FooterSocialPage {
  get twitter() {
    return $('footer a[href*="twitter.com"], footer a[href*="x.com"]');
  }

  get facebook() {
    return $('footer a[href*="facebook.com"]');
  }

  get linkedin() {
    return $('footer a[href*="linkedin.com"]');
  }

  async openTwitter() {
    await this.twitter.waitForClickable();
    await this.twitter.click();
  }

  async openFacebook() {
    await this.facebook.waitForClickable();
    await this.facebook.click();
  }

  async openLinkedin() {
    await this.linkedin.waitForClickable();
    await this.linkedin.click();
  }
}

module.exports = new FooterSocialPage();
