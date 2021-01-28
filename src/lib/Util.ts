import * as A from 'fp-ts/Array'
import * as M from 'fp-ts/Monoid'
import { Coords } from 'lib/Types'

type Param = [string, string]

const stringifyParams: (params: Array<Param>) => string =
  A.foldMapWithIndex(M.monoidString)((i, [k, v]) => i === 0 ? `?${k}=${v}` : `&${k}=${v}`)

export const getMapboxUrl = (seachQuery: string): string => {
  const queryParams = stringifyParams([
    ['access_token', process.env.REACT_APP_MAPBOX_TOKEN || 'missing-token'],
    ['types', 'place,postcode'],
    ['limit', '5'],
  ])

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(seachQuery)}.json${queryParams}`
}

export const getOpenweatherUrl = ([lon, lat]: Coords): string => {
  const queryParams = stringifyParams([
    ['lat', String(lat)],
    ['lon', String(lon)],
    ['appid', process.env.REACT_APP_OPENWEATHER_TOKEN || 'missing-token'],
    ['units', 'metric'],
    ['exclude', 'minutely,hourly'],
  ])

  return 'https://api.openweathermap.org/data/2.5/onecall' + queryParams
}

const degToDir = (deg: number): string => {
  switch (true) {
    case deg < 22.5:
      return 'N'
    case deg < 67.5:
      return 'NE'
    case deg < 112.5:
      return 'E'
    case deg < 157.5:
      return 'SE'
    case deg < 202.5:
      return 'S'
    case deg < 247.5:
      return 'SW'
    case deg < 292.5:
      return 'W'
    case deg < 373.5:
      return 'NW'
    default:
      return 'N'
  }
}

export const displayWind = (metrePerSec: number, deg: number): string =>
  `${degToDir(deg)} ${metrePerSec} m/s`

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const weekDayFromTimestamp = (t: number): string =>
  new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(t * 1000))
