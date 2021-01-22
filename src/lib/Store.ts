import * as O from 'fp-ts/Option'
import { Subject, of, timer } from 'rxjs'
import * as Rx from 'rxjs/operators'
import * as RD from 'lib/RemoteData'
import * as Http from 'lib/Http'
import { SearchResult } from 'lib/Types'
import { getMapboxUrl } from 'lib/Util'

const Store = () => {
  const searchQuery$ = new Subject<string>()

  const searchResult$ = searchQuery$.pipe(
    Rx.switchMap(str => {
      const sanitized = str.replace(/,+/g, ' ').trim()

      if (sanitized === '') {
        return of(RD.success<SearchResult>([]))
      } else {
        return timer(500).pipe(
          Rx.switchMap(() => Http.get(getMapboxUrl(sanitized), SearchResult)),
          Rx.startWith(RD.pending<SearchResult>(O.none)),
        )
      }
    }),
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

  return {
    search: (str: string) => searchQuery$.next(str),
    searchResult$,
  }
}

export const store = Store()
