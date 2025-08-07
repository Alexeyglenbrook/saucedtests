const os = require('os');
const path = require('path');

const tempProfile = path.join(os.tmpdir(), `chrome-profile-${Date.now()}`);

exports.config = {
  runner: 'local',

  specs: [
    './test/specs/login.js',
    './test/specs/loginInvalidPassword.js',
    './test/specs/loginInvalidLogin.js',
    './test/specs/logout.js',
    './test/specs/add_cart_logout_restore_cart.js',
    './test/specs/sort.products.js',
    './test/specs/social.js',
    './test/specs/checkout.e2e.js',
    './test/specs/checkout.js',
  ],
  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          `--user-data-dir=${tempProfile}`,
          '--disable-extensions',
          '--disable-popup-blocking',
          '--disable-infobars',
          '--no-default-browser-check',
          '--disable-save-password-bubble',
          '--disable-notifications',
          '--disable-blink-features=AutomationControlled',
          '--disable-features=AutofillServerCommunication,AutofillProfileCleanup,AutofillAccountProfileStorage,AutofillEnableAccountWalletStorage,PasswordManagerOnboarding,AutofillAssistantChromeEntry',
        ],
        prefs: {
          'profile.password_manager_enabled': false,
          credentials_enable_service: false,
          'profile.default_content_setting_values.notifications': 2,
          'profile.default_content_setting_values.popups': 0,
          'profile.autofill_profile_enabled': false,
          'profile.default_content_setting_values.automatic_downloads': 1,
        },
      },
    },
  ],

  logLevel: 'info',
  baseUrl: 'https://www.saucedemo.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  beforeTest: async function () {
    await browser.deleteAllCookies();
    try {
      await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch (e) {
      console.warn('Ошибка при очистке хранилища:', e.message);
    }
  },
};
