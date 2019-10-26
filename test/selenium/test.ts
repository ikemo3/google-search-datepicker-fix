import {
    By, Capabilities, until, WebDriver,
} from 'selenium-webdriver';
import { strictEqual } from 'assert';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import chromeDriver from './chrome';
import firefoxDriver from './firefox';

async function takeScreenShot(driver: WebDriver, path: string): Promise<void> {
    const capabilities: Capabilities = await driver.getCapabilities();
    const browserName = capabilities.get('browserName');

    const dir = `tmp/screenshots/${browserName}`;

    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    writeFileSync(`${dir}/${path}`, Buffer.from(await driver.takeScreenshot(), 'base64'));
}

async function main(driver: WebDriver) {
    await driver.get('https://www.google.com/search?q=test');
    await takeScreenShot(driver, 'search_result.png');

    // click 'Tools'
    const tool = driver.findElement(By.linkText('ツール'));
    await tool.click();

    // click 'Any time'
    const anyTime = driver.findElement(By.css("[aria-label='期間指定なし']"));
    await driver.actions().pause(500).click(anyTime).perform();

    // click 'Custom range...'
    const customRange = driver.findElement(By.id('cdrlnk'));
    await driver.actions().pause(500).click(customRange).perform();

    // set 'From'
    const cdrMin = driver.findElement(By.id('cdr_min'));
    await driver.actions().pause(500).click(cdrMin).sendKeys('2019/01/02')
        .perform();

    // click 'Go'
    const goButton = driver.findElement(By.css("#cdr_frm input[value='選択']"));
    await driver.actions().pause(500).click(goButton).perform();
    await driver.wait(until.stalenessOf(goButton));

    // assert time range label.
    const timeRangeLabel = driver.wait(until.elementLocated(By.className('hdtb-tsel')));
    driver.wait(until.elementIsVisible(timeRangeLabel));
    await takeScreenShot(driver, 'search_result_with_custom_range.png');
    strictEqual(await timeRangeLabel.getAttribute('aria-label'), '2019年1月2日 – 今日');

    // quit driver.
    await driver.close();
}

(async (): Promise<void> => {
    try {
        await main(chromeDriver());
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exitCode = 1;
    }
})();

(async (): Promise<void> => {
    try {
        await main(firefoxDriver());
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exitCode = 1;
    }
})();
