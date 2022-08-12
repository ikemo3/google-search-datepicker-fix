module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["apps/**/*.ts", "test/**/*.ts"],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["ts", "js"],
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
    testMatch: ["<rootDir>/test/*.test.ts"],
    transform: {
        ".*.ts$": "ts-jest",
    },
};
