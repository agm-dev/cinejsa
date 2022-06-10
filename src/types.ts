export type CinesaCityData = Record<string, CinesaCinemaData[]>

export interface CinesaCinemaData {
  name: string
  id: number
  cityId: number
}
