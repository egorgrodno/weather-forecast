import * as R from 'react'
import * as RD from 'lib/RemoteData'
import * as M from '@material-ui/core'
import * as TS from 'lib/TransitionState'
import { ForecastData } from 'lib/Types'
import { ForecastCard } from 'component/ForecastCard'

type Props = {
  forecastData: RD.RemoteData<ForecastData>
}

type Transition = TS.TransitionState<RD.RemoteData<ForecastData>>

export const Forecast: R.FC<Props> = props => {
  const [transState, setTransState] = R.useState<Transition>(TS.initial)
  const stepTransition = () => setTransState(TS.step(transState))

  R.useEffect(() => {
    if (!RD.isInitial(props.forecastData)) {
      switch (transState.status) {
        case 'initial':
          return setTransState(TS.entering(props.forecastData))

        case 'leaving':
        case 'entering':
        case 'entered':
          return setTransState(TS.leaving(transState.curr, props.forecastData))
      }
    }
  }, [props.forecastData])

  if (transState.status === 'initial') {
    return null
  } else {
    return (
      <M.Fade
        in={transState.status !== 'leaving'}
        onEntered={stepTransition}
        onExited={stepTransition}
      >
        <div>
          <ForecastState forecastData={transState.curr} />
        </div>
      </M.Fade>
    )
  }
}

const useForecastStateStyles = M.makeStyles({
  loader: {
    height: 370,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const ForecastState: R.FC<Props> = props => {
  const classes = useForecastStateStyles()

  switch (props.forecastData.status) {
    case RD.RemoteDataStatus.Initial:
      return null

    case RD.RemoteDataStatus.Pending:
      return (
        <div className={classes.loader}>
          <M.CircularProgress />
        </div>
      )

    case RD.RemoteDataStatus.Failure:
      return (
        <M.Typography color="error">
          Network request failed, try again later.
        </M.Typography>
      )

    case RD.RemoteDataStatus.Success:
      return (
        <ForecastCard
          place={props.forecastData.data.place}
          forecast={props.forecastData.data.forecast}
        />
      )
  }
}
