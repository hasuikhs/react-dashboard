import { Builder, Key, By, ThenableWebDriver, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome';
import 'chromedriver';
import CrawlerInterface from '../inf/Crawler.interface';

class Crawler implements CrawlerInterface {

  private _options: chrome.Options;
  private _driver: ThenableWebDriver;

  constructor() {
    this._options = new chrome.Options().headless();
    this._options.addArguments(
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-extensions'
    );

    this._driver = new Builder().forBrowser('chrome').setChromeOptions(this._options).build();
  }

  async moveURL(siteURL: string): Promise<void> {
    await this._driver.get(siteURL);
  }

  async login(idCssQuery: string, id: string, pwCssQuery: string, pw: string): Promise<void> {
    await this._driver.findElement(By.css(idCssQuery)).sendKeys(id);
    await this._driver.findElement(By.css(pwCssQuery)).sendKeys(pw, Key.ENTER);
  }

  async getCookieValue(cookieName: string): Promise<any> {
    return await this._driver.manage().getCookie(cookieName);
  }

  async close(): Promise<void> {
    await this._driver.close();
  }

}

export default Crawler;