import { cinemas } from "./cinemas";
import { CinesaCinemaData } from "./types";

export function getCities(): string[] {
  return Object.keys(cinemas)
}

export function getCityCinemas(city: string): CinesaCinemaData["name"][] {
  return cinemas?.[city]?.map(item => item.name) ?? []
}

export function getCinemaData(cinema: string): CinesaCinemaData | undefined {
  let cinemaData: Partial<CinesaCinemaData> = {}

  const cities = getCities()
  for (const city of cities) {
    const cityCinemasData = cinemas?.[city] ?? []
    for (const item of cityCinemasData) {
      if (item.name === cinema) {
        cinemaData = { ...item }
        break
      }
    }
  }

  if (!cinemaData.id || !cinemaData.cityId) {
    return
  }

  // const url = `https://www.cinesa.es/Cines/Horarios/${cinemaData.id}/${cinemaData.cityId}`
  return cinemaData as CinesaCinemaData
}
