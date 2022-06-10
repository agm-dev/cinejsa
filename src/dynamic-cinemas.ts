import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { CinesaCinemaData, CinesaCityData } from "./types"

function parseName(dirtyName: string): string {
  return dirtyName
    .trim()
    .replace(new RegExp(/<\/{0,1}strong>/, "mg"), "")
    .replace(new RegExp(/·/, "mg"), "")
    .replace(new RegExp(/\s+/, "g"), " ")
}

function getCities(document: Document): NodeListOf<HTMLDivElement> {
  return document.querySelectorAll("#menu_mapa div")
}

function getCityData(cityDOM: HTMLDivElement): CinesaCityData {
  const cityName = parseName(cityDOM.querySelector(".titulo")?.innerHTML ?? "").toLowerCase()
  const cinemasDOM: HTMLLIElement[] = []

  cityDOM.querySelectorAll<HTMLLIElement>(".listado li").forEach(item => {
    if (item.dataset?.["poblacion"] && (item.dataset?.["id"] || item.dataset?.["value"])) {
      cinemasDOM.push(item)
    }
  })

  const cinemas: CinesaCinemaData[] = cinemasDOM.map(item => {
    const name = parseName(item.querySelector("a")?.innerHTML ?? "")
    const id = Number(item.dataset?.["id"])
    const cityId = Number(item.dataset?.["poblacion"])
    return {
      name,
      id,
      cityId,
      // apiUrl: `https://www.cinesa.es/Cines/Horarios/${id}/${cityId}`,
    }
  })
  return { [cityName]: cinemas }
}

export function fetchCityAndCinemasData(): Promise<CinesaCityData> {
  return fetch("https://www.cinesa.es/Cines")
    .then(response => response.text())
    .then(html => {
      const dom = new JSDOM(html)
      const citiesDOM = getCities(dom.window.document)
      const result: CinesaCityData = {}

      citiesDOM.forEach(item => {
        const cityData = getCityData(item)
        Object.entries(cityData).forEach(([name, data]) => {
          result[name] = data
        })
      })

      return result
    })
}
