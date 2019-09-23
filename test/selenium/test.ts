(async () => {
    const { Builder, By, Capabilities } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const fs = require('fs');
    const assert = require('assert');

    const extension = fs.readFileSync('/tmp/workspace/google-search-datepicker.crx', 'base64');
    const options = new chrome.Options()
        .addExtensions(extension)
        .windowSize({ width: 1280, height: 800 });

    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', {
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        ],
    });

    const driver = await new Builder().withCapabilities(capabilities).setChromeOptions(options).build();

    await driver.get('https://www.google.com/search?q=test');

    // click 'Tools'
    const tool = driver.findElement(By.linkText('ツール'));
    await tool.click();

    // click 'Any time'
    const any_time = driver.findElement(By.css("[aria-label='期間指定なし']"));
    await driver.actions().pause(500).click(any_time).perform();

    // click 'Custom range...'
    const custom_range = driver.findElement(By.id('cdrlnk'));
    await driver.actions().pause(500).click(custom_range).perform();

    // set 'From'
    const cdr_min = driver.findElement(By.id('cdr_min'));
    await driver.actions().pause(500).click(cdr_min).sendKeys('2019/01/02')
        .perform();

    // click 'Go'
    const go_button = driver.findElement(By.css("#cdr_frm input[value='選択']"));
    await driver.actions().pause(500).click(go_button).perform();

    // assert time range label.
    const time_range_label = driver.findElement(By.className('hdtb-tsel'));
    assert.strictEqual(await time_range_label.getAttribute('aria-label'), '2019年1月2日 – 今日');

    // quit driver.
    await driver.close();
})();
