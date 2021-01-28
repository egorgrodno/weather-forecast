import * as R from 'react'
import * as M from '@material-ui/core'
import { Place, Forecast } from 'lib/Types'

type Props = {
  place: Place
  forecast: Forecast
}

// base offset in units
const x = 4
const y = 3

const useStyles = M.makeStyles(theme => ({
  img: {
    display: 'block',
    width: '100%',
  },
  temp: {
    padding: theme.spacing(5.5, 0),
  },
  day: {
    textAlign: 'center',
  },
  dayLabel: {
    textTransform: 'uppercase',
  },
  daySep: {
    margin: theme.spacing(0.5, 0),
  },
}))

export const ForecastCard: R.FC<Props> = props => {
  const classes = useStyles()

  return (
    <M.Paper>
      <M.Box component="header" px={x} pt={y}>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <M.Grid item zeroMinWidth>
            <M.Typography variant="h5" noWrap>
              {props.place.place_name}
            </M.Typography>
            <M.Typography variant="subtitle1" noWrap>
              {props.forecast.current.weather.description}
            </M.Typography>
          </M.Grid>

          <M.Grid item>
            <M.Typography variant="body1" color="textSecondary" noWrap>
              {props.forecast.current.wind}
            </M.Typography>
            <M.Typography variant="body1" color="textSecondary" noWrap>
              Humidity {props.forecast.current.humidity}%
            </M.Typography>
          </M.Grid>
        </M.Grid>
      </M.Box>

      <M.Box>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <M.Grid item xs={6}>
            <img
              className={classes.img}
              src={props.forecast.current.weather.icon}
              alt={props.forecast.current.weather.description}
            />
          </M.Grid>

          <M.Grid item xs={6}>
            <M.Typography className={classes.temp} variant="h1">
              {props.forecast.current.temp}&deg;
            </M.Typography>
          </M.Grid>
        </M.Grid>
      </M.Box>

      <M.Box component="footer" pb={y}>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          {props.forecast.daily.slice(1, 6).map((day, i) => (
            <R.Fragment key={i}>
              {i > 0 && <M.Divider className={classes.daySep} orientation="vertical" flexItem />}

              <M.Grid className={classes.day} item xs={3}>
                <M.Typography
                  className={classes.dayLabel}
                  variant="body2"
                  align="center"
                  gutterBottom
                  noWrap
                >
                  {day.day}
                </M.Typography>

                <M.Typography variant="body2" align="center" noWrap>
                  {day.temp.day}
                </M.Typography>

                <M.Typography variant="body2" color="textSecondary" align="center" noWrap>
                  {day.temp.night}
                </M.Typography>
              </M.Grid>
            </R.Fragment>
          ))}
        </M.Grid>
      </M.Box>
    </M.Paper>
  )
}
