import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/Decoder'

export const Place = D.type({
  id: D.string,
  place_name: D.string,
  center: D.tuple(D.number, D.number),
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
