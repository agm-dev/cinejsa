import * as index from "../src/index"

describe("module", () => {
  test("exports fetchCityAndCinemasData", () => expect(typeof index?.["fetchCityAndCinemasData"]).toBe("function"))
})
