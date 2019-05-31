import { OIL_LAYER, OIL_YES_BUTTON } from '../test_constants.js';


module.exports = {
  //ToDo: remove me after fix in JENKINS
  '@disabled': true,

  beforeEach: browser => {
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/tealium-integration-test.html')
      .useCss()
      .waitForElementPresent('body', 1000, false)
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 2000, false);
  },

  // This test only tests the tealium integration - it does not test the latest version of oil, but the version on tealium
  'OIL Layer works while being loaded over Tealium - Closed after clicking yes': function (browser) {
    browser
      .waitForElementNotPresent('//img[contains(@src, "text=ALL")]', 500)
      .waitForElementNotPresent('//img[contains(@src, "text=ADextended")]', 500)
      .waitForElementNotPresent('//img[contains(@src, "text=ANALYTICS")]', 500)
      .waitForElementNotPresent('//img[contains(@src, "text=BASE")]', 500)
      .waitForElementNotPresent('//img[contains(@src, "text=SOCIAL")]', 500)
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .refresh()
      .useCss()
      .waitForElementPresent('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .waitForElementPresent('//img[contains(@src, "text=ALL")]', 500)
      .waitForElementPresent('//img[contains(@src, "text=ADextended")]', 500)
      .waitForElementPresent('//img[contains(@src, "text=ANALYTICS")]', 500)
      .waitForElementPresent('//img[contains(@src, "text=BASE")]', 500)
      .waitForElementPresent('//img[contains(@src, "text=SOCIAL")]', 500)
      .end();
  }
};
