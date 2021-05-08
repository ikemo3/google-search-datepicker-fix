import { Config } from "karma";

module.exports = (config: Config) => {
    config.set({
        frameworks: ["jasmine"],
        files: ["apps/content_script/google.js", "test/*.js"],
        preprocessors: {
            "apps/content_script/google.js": ["coverage"],
        },
        reporters: ["mocha", "coverage"],
        browsers: ["ChromeHeadless", "FirefoxHeadless"],
        logLevel: config.LOG_INFO,
    });
};
