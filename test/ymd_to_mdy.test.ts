import { describe, expect, it } from "vitest";

import { ymdToMdy } from "../apps/content_script/dates";

describe("ymdToMdy", () => {
  it("yyyy-mm-dd", () => {
    expect(ymdToMdy("2016-01-02")).toBe("01/02/2016");
    expect(ymdToMdy("2016/01/02")).toBe("01/02/2016");
  });

  it("yyyy-m-dd", () => {
    expect(ymdToMdy("2016-1-02")).toBe("1/02/2016");
    expect(ymdToMdy("2016/1/02")).toBe("1/02/2016");
  });

  it("yyyy-mm-d", () => {
    expect(ymdToMdy("2016-01-2")).toBe("01/2/2016");
    expect(ymdToMdy("2016/01/2")).toBe("01/2/2016");
  });

  it("yyyy-m-d", () => {
    expect(ymdToMdy("2016-1-2")).toBe("1/2/2016");
    expect(ymdToMdy("2016/1/2")).toBe("1/2/2016");
  });

  it("mm/dd/yyyy", () => {
    expect(ymdToMdy("01/02/2016")).toBe("01/02/2016");
  });

  it("m/dd/yyyy", () => {
    expect(ymdToMdy("1/02/2016")).toBe("1/02/2016");
  });

  it("mm/d/yyyy", () => {
    expect(ymdToMdy("01/2/2016")).toBe("01/2/2016");
  });

  it("m/d/yyyy", () => {
    expect(ymdToMdy("1/2/2016")).toBe("1/2/2016");
  });
});
