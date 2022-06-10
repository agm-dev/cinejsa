export type CinesaCityData = Record<string, CinesaCinemaData[]>

export interface CinesaCinemaData {
  name: string
  id: number
  cityId: number
}

export interface MovieData {
  title: string
  premiere: boolean // true if "estreno" date is less than 7 days old
  duration: number
  genre: string
  sessions: {
    time: string
    room: number
  }[]
}

export type CinemaData = Record<string, MovieData[]>

export interface CinemaRawData {
  cartelera: {
    dia: string // AAAA-MM-DD
    peliculas: {
      titulo: string
      estreno: string
      duracion: number
      genero: string
      directores: string
      actores: string
      cines: {
        cine: string
        tipos: {
          tipo: string
          salas: {
            sala: string
            salanum: string
            sesiones: {
              hora: string
              tipo: string
              pasada: boolean
            }[]
          }[]
        }[]
      }[]
    }[]
  }[]
}
