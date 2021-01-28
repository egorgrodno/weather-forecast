import * as A from 'fp-ts/Array'
import * as NEA from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'
import * as assets from 'assets'
import { capitalize, displayWind, weekDayFromTimestamp } from 'lib/Util'

export const Coords = D.tuple(D.number, D.number)

export type Coords = D.TypeOf<typeof Coords>

export const Place = D.type({
  id: D.string,
  place_name: D.string,
  center: Coords,
})

export type Place = D.TypeOf<typeof Place>

export const SearchResult = pipe(
  D.type({
    type: D.literal('FeatureCollection'),
    features: D.array(Place),
  }),
  D.map(({ features }) => features),
)

export type SearchResult = D.TypeOf<typeof SearchResult>

// Weather

export const IntFromFloat = pipe(
  D.number,
  D.map(n => Math.round(n)),
)

export const nonEmptyArray = <A> (dec: D.Decoder<unknown, A>) => pipe(
  D.array(dec),
  D.refine(A.isNonEmpty, 'non empty array')
)

export const WeatherIcon = pipe(
  D.literal(
    '01d', '01n',
    '02d', '02n',
    '03d', '03n',
    '04d', '04n',
    '09d', '09n',
    '10d', '10n',
    '11d', '11n',
    '13d', '13n',
    '50d', '50n'
  ),
  D.map((icon): string => {
    switch (icon) {
      case '01d':
        return assets.day
      case '01n':
        return assets.night
      case '02d':
        return assets.cloudyDay1
      case '02n':
        return assets.cloudyNight1
      case '03d':
        return assets.cloudyDay3
      case '03n':
        return assets.cloudyNight3
      case '04d':
        return assets.cloudy
      case '04n':
        return assets.cloudy
      case '09d':
        return assets.rainy3
      case '09n':
        return assets.rainy5
      case '10d':
        return assets.rainy6
      case '10n':
        return assets.rainy6
      case '11d':
        return assets.thunder
      case '11n':
        return assets.thunder
      case '13d':
        return assets.snowy3
      case '13n':
        return assets.snowy5
      case '50d':
        return assets.cloudy
      case '50n':
        return assets.cloudy
    }
  })
)

export const WeatherConditions = D.type({
  icon: WeatherIcon,
  description: pipe(
    D.string,
    D.map(desc => capitalize(desc))
  ),
})

export const CurrentWeather = pipe(
  D.type({
    temp: IntFromFloat,
    humidity: D.number,
    wind_speed: D.number,
    wind_deg: D.number,
    weather: nonEmptyArray(WeatherConditions),
  }),
  D.map(data => ({
    temp: data.temp,
    humidity: data.humidity,
    weather: NEA.head(data.weather),
    wind: displayWind(data.wind_speed, data.wind_deg),
  })),
)

export const DayWeather = pipe(
  D.type({
    dt: D.number,
    temp: D.type({
      day: IntFromFloat,
      night: IntFromFloat,
    }),
  }),
  D.map(data => ({
    temp: data.temp,
    day: weekDayFromTimestamp(data.dt),
  }))
)

export const Forecast = D.type({
  current: CurrentWeather,
  daily: pipe(
    D.array(DayWeather),
    D.parse(arr => arr.length >= 4
      ? D.success(arr)
      : D.failure(arr, 'array with at least 4 elements')
    ),
  ),
})

export type Forecast = D.TypeOf<typeof Forecast>

export type ForecastData = {
  place: Place
  forecast: Forecast
}
