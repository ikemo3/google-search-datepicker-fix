module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'apps/content_script/google.js',
            'test/*.js'
        ],
        preprocessors: {
            'apps/content_script/google.js': ['coverage']
        },
        reporters: ['mocha', 'coverage'],
        browsers: ['ChromeHeadless'],
        logLevel: config.LOG_INFO
    })
};
