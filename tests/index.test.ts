import * as index from "../src/index"

describe("module", () => {
  test("exports fetchCityAndCinemasData", () => expect(typeof index?.["fetchCityAndCinemasData"]).toBe("function"))
  test("exports getCities", () => expect(typeof index?.["getCities"]).toBe("function"))
  test("exports getCityCinemas", () => expect(typeof index?.["getCityCinemas"]).toBe("function"))
  test("exports getCinemaData", () => expect(typeof index?.["getCinemaData"]).toBe("function"))
})
