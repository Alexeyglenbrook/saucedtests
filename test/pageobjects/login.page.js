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

  get errorMessage() {
    return $(
      `//*[contains(text(),'Epic sadface: Username and password do not match any user in this service')]`
    );
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
