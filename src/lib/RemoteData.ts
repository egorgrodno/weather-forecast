import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

export enum RemoteDataStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Failure = 'Failure',
  Success = 'Success',
}

type Initial = {
  status: RemoteDataStatus.Initial
}

type Pending <A> = {
  status: RemoteDataStatus.Pending
  prevData: O.Option<A>
}

type Success <A> = {
  status: RemoteDataStatus.Success
  data: A
}

type Failure = {
  status: RemoteDataStatus.Failure
  err: Error
}

type Result<A> = Success<A> | Failure

export type RemoteData<A> = Initial | Pending<A> | Result<A>

// Type constructors

export const initial = <A> (): RemoteData<A> =>
  ({ status: RemoteDataStatus.Initial })

export const pending = <A> (prevData: O.Option<A>): RemoteData<A> =>
  ({ status: RemoteDataStatus.Pending, prevData })

export const success = <A> (data: A): RemoteData<A> =>
  ({ status: RemoteDataStatus.Success, data })

export const failure = <A> (err: Error): RemoteData<A> =>
  ({ status: RemoteDataStatus.Failure, err })

// Guards

export const isInitial = <A>(rd: RemoteData<A>): rd is Initial =>
  rd.status === RemoteDataStatus.Initial

export const isPending = <A>(rd: RemoteData<A>): rd is Pending<A> =>
  rd.status === RemoteDataStatus.Pending

export const isSuccess = <A>(rd: RemoteData<A>): rd is Success<A> =>
  rd.status === RemoteDataStatus.Success

export const isFailure = <A>(rd: RemoteData<A>): rd is Failure =>
  rd.status === RemoteDataStatus.Failure

export const isResult = <A>(rd: RemoteData<A>): rd is Result<A> =>
  isSuccess(rd) || isFailure(rd)

// Helpers

export const map = <A, B> (f: (data: A) => B) => (rd: RemoteData<A>): RemoteData<B> =>
  isSuccess(rd) ? success(f(rd.data)) : isPending(rd) ? pending(pipe(rd.prevData, O.map(f))) : rd

export const getData = <A> (rd: RemoteData<A>): O.Option<A> =>
  isSuccess(rd) ? O.some(rd.data) : isPending(rd) ? rd.prevData : O.none
