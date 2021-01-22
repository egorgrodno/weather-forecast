import * as A from 'fp-ts/Array'
import * as M from 'fp-ts/Monoid'
import { pipe, tuple } from 'fp-ts/function'

export const getMapboxUrl = (seachQuery: string): string => {
  const queryParams = pipe(
    [
      tuple('access_token', process.env.REACT_APP_MAPBOX_TOKEN),
      tuple('types', 'place,postcode'),
      tuple('limit', '5'),
    ],
    A.foldMapWithIndex(M.monoidString)((i, [k, v]) => i === 0 ? `?${k}=${v}` : `&${k}=${v}`),
  )

  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(seachQuery)}.json${queryParams}`
}
