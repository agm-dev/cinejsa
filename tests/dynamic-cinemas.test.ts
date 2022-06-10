import { fetchCityAndCinemasData } from "../src/dynamic-cinemas"

describe("fetchCityAndCinemasData", () => {
  test("it's a function", () => expect(typeof fetchCityAndCinemasData).toBe("function"))
  test("returns cinema's data", async () => {
    const data = await fetchCityAndCinemasData()
    expect(data).toBeDefined()

    Object.entries(data).forEach(([city, cinemas]) => {
      expect(city).toBeDefined()
      expect(cinemas).toBeDefined()
      expect(Array.isArray(cinemas)).toBe(true)
      expect(cinemas.length).toBeGreaterThan(0)

      cinemas.forEach(cinema => {
        expect(typeof cinema.name).toBe("string")
        expect(typeof cinema.id).toBe("number")
        expect(typeof cinema.cityId).toBe("number")
      })
    })
  })
})
