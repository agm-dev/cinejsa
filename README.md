# Cinejsa

This is a node package to get info about cinemas, movies, sessions, times on Cinesa's cinemas.
For Yelmocines check [this one](https://www.npmjs.com/package/yelmocin).

## Installation

```bash
npm i --save cinejsa
```

## Cities

```typescript
import { getCities } from "cinejsa"

const cityNames: string[] = getCities();
```

### Get the cinemas in a city

```typescript
import { getCities, getCityCinemas } from "cinejsa"

const cityNames: string[] = getCities();

const cinemas: string[] = getCityCinemas(cityNames[0])
```

### Get data from specific cinema

```typescript
import { getFilmsFromCinema } from "cinejsa"

const today = new Date()

getFilmsFromCinema("La Gavia", today)
  .then(data => console.log(data))
```

### Example output format

```json
[
  {
    "title": "Doctor Strange en el Multiverso de la Locura",
    "premiere": false,
    "duration": 126,
    "genre": "Acción - Aventura",
    "sessions": [
      {
        "room": 1,
        "time": "22:15"
      }
    ]
  },
  {
    "title": "Jurassic World: Dominion",
    "premiere": true,
    "duration": 147,
    "genre": "Aventuras - Ciencia Ficción",
    "sessions": [
      {
        "room": 10,
        "time": "20:50"
      },
      {
        "room": 3,
        "time": "22:05"
      },
      {
        "room": 4,
        "time": "22:50"
      },
      {
        "room": 5,
        "time": "21:25"
      },
      {
        "room": 7,
        "time": "21:45"
      },
      {
        "room": 8,
        "time": "20:25"
      },
      {
        "room": 9,
        "time": "23:25"
      }
    ]
  },
  {
    "title": "Live is life",
    "premiere": false,
    "duration": 109,
    "genre": "Comedia - Drama",
    "sessions": [
      {
        "room": 2,
        "time": "21:35"
      }
    ]
  },
  {
    "title": "Top Gun: Maverick",
    "premiere": false,
    "duration": 130,
    "genre": "Acción - Drama",
    "sessions": [
      {
        "room": 6,
        "time": "21:55"
      },
      {
        "room": 8,
        "time": "23:45"
      }
    ]
  }
]
```
