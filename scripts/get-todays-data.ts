import { join } from "path"
import { writeFileSync } from "fs"
import { getFilmsFromCinema } from "../src/cities"

(async () => {
  try {
    const data = await getFilmsFromCinema("La Gavia", new Date())
    const path = join(__dirname, "..", "data", "todays-data.json")
    writeFileSync(path, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("error on gettings todays data", error)
  }
})()
