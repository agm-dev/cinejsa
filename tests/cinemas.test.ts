import { fetchCityAndCinemasData } from "../src/dynamic-cinemas"
import { cinemas } from "../src/cinemas"

describe("cinemas data", () => {
  test("it's updated", async () => {
    const data = await fetchCityAndCinemasData()
    expect(JSON.stringify(data)).toBe(JSON.stringify(cinemas))
  })
})
