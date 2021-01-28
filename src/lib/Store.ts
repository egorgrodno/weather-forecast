import * as O from 'fp-ts/Option'
import { Subject, asyncScheduler, merge } from 'rxjs'
import * as Rx from 'rxjs/operators'
import * as RD from 'lib/RemoteData'
import * as Http from 'lib/Http'
import { Forecast, ForecastData, Place, SearchResult } from 'lib/Types'
import { getMapboxUrl, getOpenweatherUrl } from 'lib/Util'

const searchThrottleMs = 400
const forecaseThrottleMs = 1200

const Store = () => {
  const place$ = new Subject<Place>()
  const searchQuery$ = new Subject<string>()
  const nonEmptyQuery$ = searchQuery$.pipe(Rx.filter(query => query !== ''))
  const emptyQuery$ = searchQuery$.pipe(Rx.filter(query => query === ''))
  const searchResult$ = merge(
    emptyQuery$.pipe(
      Rx.mapTo(RD.success<SearchResult>([])),
    ),
    nonEmptyQuery$.pipe(
      Rx.mapTo(RD.pending<SearchResult>(O.none)),
    ),
    nonEmptyQuery$.pipe(
      Rx.throttleTime(searchThrottleMs, asyncScheduler, { trailing: true }),
      Rx.switchMap(query => Http.get(getMapboxUrl(query), SearchResult)),
    ),
  ).pipe(
    Rx.scan(
      (prevRd, rd): RD.RemoteData<SearchResult> =>
        RD.isPending(rd)
          ? RD.pending(RD.getData(prevRd))
          : RD.isFailure(rd)
            ? RD.success([])
            : rd,
      RD.initial<SearchResult>(),
    ),
  )
  const forecastData$ = place$.pipe(
    Rx.throttleTime(forecaseThrottleMs),
    Rx.switchMap(place => Http.get(getOpenweatherUrl(place.center), Forecast).pipe(
      Rx.map(RD.map((forecast): ForecastData => ({ place, forecast }))),
    )),
    Rx.startWith(RD.initial<ForecastData>()),
  )

  return {
    search: (query: string) => searchQuery$.next(query.replace(/,+/g, ' ').trim()),
    selectPlace: (place: Place) => place$.next(place),
    searchResult$,
    forecastData$: forecastData$,
  }
}

export const store = Store()
