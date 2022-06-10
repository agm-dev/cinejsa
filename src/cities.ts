import fetch from "node-fetch"
import { cinemas } from "./cinemas";
import { CinemaRawData, CinesaCinemaData, MovieData } from "./types";
import { formatData } from "./utils";

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

  return cinemaData as CinesaCinemaData
}

export async function getFilmsFromCinema(cinema: string, date: Date): Promise<MovieData[]> {
  const { id, cityId } = getCinemaData(cinema) ?? {}
  if (!id || !cityId) {
    return Promise.resolve([])
  }

  const url = `https://www.cinesa.es/Cines/Horarios/${id}/${cityId}`
  const rawData = await fetch(url, { method: "GET" })
    .then(response => response.json())
    .then(data => data as CinemaRawData)

  return formatData(rawData, date, cinema)
}
