const wd = require('wd');
const assert = require('assert');
const { Before, Given, When, Then, After } = require('cucumber');

const PORT = 4723;

const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk', // relative to root of project
  appPackage: 'com.cucumbertutorial',
  appActivity: 'com.cucumbertutorial.MainActivity',
  automationName: 'uiautomator2' 
};
const driver = wd.promiseChainRemote('localhost', PORT);

Before({timeout: 50000}, async () => {
  await driver.init(config);
  await driver.sleep(6000); // wait for app to load
});

After(async() => {
	await driver.quit();
});

Given ('I am in app home page', {timeout: 30000}, async () => {
  let isWelcomeMessage = await driver.hasElementByAccessibilityId("welcome-message");
  assert.equal(isWelcomeMessage, true);
});

When ('I click on "Pressione" button', async () => {
  let loginButton = await driver.elementByAccessibilityId("press-button");
  loginButton.click();
});

Then ('I see the alert', {timeout: 2000}, async () => {
  await driver.setImplicitWaitTimeout(1500);
  let isAlert = await driver.hasElementByXPath("//*[@text='Você apertou o botão']");
  assert.equal(isAlert, true);
});
