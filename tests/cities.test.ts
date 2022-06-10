import { cinemas } from "../src/cinemas"
import { getCinemaData, getCities, getCityCinemas } from "../src/cities"

describe("cities", () => {
  test("getCities", () => {
    expect(getCities().length).toBe(Object.keys(cinemas).length)
  })

  test("getCityCinemas", () => {
    const city = "madrid"
    const data = getCityCinemas(city)
    expect(data).toBeDefined()
    expect(data.length).toBeGreaterThan(0)

    const result = cinemas?.[city]?.map(item => item.name) ?? []
    expect(data.every(item => result.includes(item))).toBe(true)
  })

  test("getCinemaData", () => {
    const cinema = "La Gavia"
    const data = getCinemaData(cinema)
    const result = cinemas?.["madrid"]?.find(item => item.name === cinema)

    expect(data?.id).toBe(result?.id)
    expect(data?.cityId).toBe(result?.cityId)
    expect(data?.name).toBe(result?.name)
  })
})
