import { Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { readFileSync } from "fs";

export default function (): WebDriver {
    const extension = readFileSync("tmp/workspace/google-search-datepicker.crx", "base64");
    const options = new Options().addExtensions(extension).windowSize({ width: 1280, height: 800 });

    const capabilities = Capabilities.chrome();
    capabilities.set("chromeOptions", {
        args: [
            "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        ],
    });

    return new Builder().withCapabilities(capabilities).setChromeOptions(options).build();
}
