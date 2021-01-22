import { ajax } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import * as Rx from 'rxjs/operators'
import * as D from 'io-ts/Decoder'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import * as RD from 'lib/RemoteData'

export const get = <A> (url: string, dec: D.Decoder<unknown, A>): Observable<RD.RemoteData<A>> =>
  ajax.getJSON(url).pipe(
    Rx.catchError((err: unknown) => of(RD.failure<A>(E.toError(err)))),
    Rx.map(json => pipe(
      dec.decode(json),
      E.fold(
        err => RD.failure<A>(new Error(D.draw(err))),
        val => RD.success<A>(val),
      ),
    )),
    Rx.startWith(RD.pending<A>(O.none)),
  )
