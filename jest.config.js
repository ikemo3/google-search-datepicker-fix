module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["apps/**/*.ts", "test/**/*.ts", "tools/*.mjs"],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["ts", "js", "mjs"],
    reporters: [
        "default",
        [
            "jest-junit",
            {
                suiteName: "jest tests",
                outputDirectory: "reports/jest",
                outputName: "js-test-results.xml",
                classNameTemplate: "{classname}-{title}",
                titleTemplate: "{classname}-{title}",
                ancestorSeparator: " › ",
            },
        ],
    ],
    roots: ["<rootDir>/apps", "<rootDir>/test"],
    testEnvironment: "jest-environment-jsdom",
    testMatch: ["<rootDir>/test/*.test.ts", "<rootDir>/test/*.test.mjs"],
    transform: {
        ".*.ts$": "ts-jest",
    },
};
