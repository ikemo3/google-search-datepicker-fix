import { Builder, By, Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { readFileSync } from 'fs';
import { strictEqual } from 'assert';

(async (): Promise<void> => {
    const extension = readFileSync('tmp/workspace/google-search-datepicker.crx', 'base64');
    const options = new Options()
        .addExtensions(extension)
        .windowSize({ width: 1280, height: 800 });

    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', {
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        ],
    });

    const driver = await new Builder()
        .withCapabilities(capabilities)
        .setChromeOptions(options)
        .build();

    await driver.get('https://www.google.com/search?q=test');

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

    // assert time range label.
    const timeRangeLabel = driver.findElement(By.className('hdtb-tsel'));
    strictEqual(await timeRangeLabel.getAttribute('aria-label'), '2019年1月2日 – 今日');

    // quit driver.
    await driver.close();
})();
