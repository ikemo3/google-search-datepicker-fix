import { configureGhrOption } from "../tools/libs.mjs";

describe("configureGhrOption", () => {
    test("master branch", () => {
        expect(configureGhrOption("master", "", "1.0.0", "", "1.0.0")).toStrictEqual({
            tag: "snapshot",
            name: "v1.0.0-snapshot",
            ghrOptions: ["-prerelease", "-recreate"],
        });
    });

    test("prototype branch", () => {
        expect(configureGhrOption("v1.0.0-prototype", "", "1.0.0", "", "1.0.0")).toStrictEqual({
            tag: "v1.0.0-prototype",
            name: "v1.0.0-prototype",
            ghrOptions: ["-prerelease", "-recreate"],
        });
    });

    test("tag", () => {
        expect(configureGhrOption("", "v1.0.0", "1.0.0", "", "1.0.0")).toStrictEqual({
            tag: "v1.0.0",
            name: "v1.0.0",
            ghrOptions: ["-recreate"],
        });
    });

    test("ignore", () => {
        expect(configureGhrOption("", "snapshot", "1.0.0", "", "1.0.0")).toStrictEqual({
            message: "ignore `snapshot` tag (already released)",
            exitCode: 0,
        });
    });

    test("tag != 'v' + manifest_version", () => {
        expect(configureGhrOption("", "v1.0.1", "1.0.0", "", "1.0.0")).toStrictEqual({
            message: "tag(v1.0.1) != 'v' + manifest_version(1.0.0)",
            exitCode: 1,
        });
    });

    test("manifest_version != package_version", () => {
        expect(configureGhrOption("", "v1.0.1", "1.0.1", "", "1.0.0")).toStrictEqual({
            message: "manifest_version(1.0.1) != package_version(1.0.0)",
            exitCode: 1,
        });
    });

    test("manifest_version_name exists", () => {
        expect(configureGhrOption("", "v1.0.0", "1.0.0", "snapshot", "1.0.0")).toStrictEqual({
            message: "version_name exists",
            exitCode: 1,
        });
    });
});
