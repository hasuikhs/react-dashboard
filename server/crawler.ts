import { Builder, Key, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
// import { Options } from 'selenium-webdriver/chrome';
import 'chromedriver';

async function example() {

  const options = new chrome.Options().addArguments(
    // '--headless', // browser 없이 실행
    // '--no--sandbox', // GUI 없는 환경 추가 옵션
    // '--disable-gpu',  // GUI 없는 환경 추가 옵션
    '--incognito',  // 시크릿 모드
    '--disable-infobars',
    'lang=ko_KR',
    // 'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
  );

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 2000);

    let userAgent = await driver.executeScript("return navigator.userAgent");
    console.log(userAgent)
  } finally {
    await driver.quit();
  }
}
example();