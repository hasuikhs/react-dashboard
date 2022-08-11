import { Builder, Key, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
// import { Options } from 'selenium-webdriver/chrome';
import * as chromedriver from 'chromedriver';

async function example() {

  const options = new chrome.Options().headless().addArguments('--no-sandbox', '--disable-gpu');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {

    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 2000);

  } finally {
    await driver.quit();
  }
}
example();