export type TransitionState <A> =
  | { status: 'initial' }
  | { status: 'leaving',  curr: A, next: A }
  | { status: 'entering', curr: A }
  | { status: 'entered',  curr: A }

export const initial = <A> (): TransitionState<A> =>
  ({ status: 'initial' })

export const leaving = <A> (curr: A, next: A): TransitionState<A> =>
  ({ status: 'leaving', curr, next })

export const entering = <A> (curr: A): TransitionState<A> =>
  ({ status: 'entering', curr })

export const entered = <A> (curr: A): TransitionState<A> =>
  ({ status: 'entered', curr })

export const step = <A> (ts: TransitionState<A>): TransitionState<A> => {
  switch (ts.status) {
    case 'initial':
    case 'entered':
      return ts

    case 'leaving':
      return entering(ts.next)

    case 'entering':
      return entered(ts.curr)
  }
}
