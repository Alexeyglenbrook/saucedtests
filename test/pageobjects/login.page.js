const Page = require('./page');

class LoginPage extends Page {
  get username() {
    return $('#user-name');
  }

  get password() {
    return $('#password');
  }

  get loginBtn() {
    return $('#login-button');
  }


  get errorContainer() {
    return $('.error-message-container');
  }

  async getErrorMessage() {
    await this.errorContainer.waitForDisplayed({ timeout: 3000 });
    return await this.errorContainer.getText();
  }

  async login(username, password) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.loginBtn.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new LoginPage();
