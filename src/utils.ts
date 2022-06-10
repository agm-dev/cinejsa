import { CinemaRawData, MovieData } from "./types";

function getSessionsData(data: CinemaRawData["cartelera"][0]["peliculas"][0]["cines"], cinema: string): MovieData["sessions"] {
  return data
    .find(cineItem => cineItem.cine === cinema)?.tipos
    .flatMap(typeItem => typeItem.salas.flatMap(roomItem => {
      const room = Number(roomItem.sala)
      return roomItem.sesiones
        .filter(session => !session.pasada)
        .map(session => ({
          room,
          time: session.hora,
        }))
    })) ?? []
}

export function formatData(rawData: CinemaRawData, date: Date, cinema: string): MovieData[] {
  const dateString = date.toISOString().split("T")?.[0] ?? ""
  const dateData = rawData.cartelera.find(item => item.dia === dateString)

  if (!dateData) {
    return []
  }

  return dateData.peliculas.map(item => {
    const today = new Date().getTime()
    const oneWeekAgo = today - (7 * 24 * 60 * 60 * 1000)
    const premiere = (new Date(item.estreno)).getTime() > oneWeekAgo

    return {
      title: item.titulo,
      premiere,
      duration: item.duracion,
      genre: item.genero,
      sessions: getSessionsData(item.cines, cinema),
    }
  })
}
