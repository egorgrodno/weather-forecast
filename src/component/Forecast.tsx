import * as R from 'react'
import * as M from '@material-ui/core'
import { day } from 'assets'

// base offset in units
const x = 4
const y = 3

const nextDays = [
  { day: 'wed', min: 18, max: 35 },
  { day: 'thu', min: 20, max: 34 },
  { day: 'fri', min: 18, max: 36 },
  { day: 'sat', min: 16, max: 32 },
]

const useStyles = M.makeStyles(theme => ({
  img: {
    display: 'block',
    width: '100%',
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

export const Forecast: R.FC = () => {
  const classes = useStyles()

  return (
    <M.Card>
      <M.Box component="header" px={x} pt={y}>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <M.Grid item zeroMinWidth>
            <M.Typography variant="h5" noWrap>
              San Francisco, CA
            </M.Typography>
            <M.Typography variant="subtitle1" noWrap>
              Thunderstorms
            </M.Typography>
          </M.Grid>

          <M.Grid item>
            <M.Typography variant="body1" color="textSecondary" noWrap>
              SE 6 km/h
            </M.Typography>
            <M.Typography variant="body1" color="textSecondary" noWrap>
              Humidity 70%
            </M.Typography>
          </M.Grid>
        </M.Grid>
      </M.Box>

      <M.Box>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <M.Grid item xs={6}>
            <img className={classes.img} src={day} alt="day" />
          </M.Grid>

          <M.Grid item xs={6}>
            <M.Typography variant="h1">
              32&deg;
            </M.Typography>
          </M.Grid>
        </M.Grid>
      </M.Box>

      <M.Box component="footer" pb={y}>
        <M.Grid container justify="space-between" alignItems="center" wrap="nowrap">
          {nextDays.map((d, i) => (
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
                  {d.day}
                </M.Typography>

                <M.Typography variant="body2" align="center" noWrap>
                  {d.max}
                </M.Typography>

                <M.Typography variant="body2" color="textSecondary" align="center" noWrap>
                  {d.min}
                </M.Typography>
              </M.Grid>
            </R.Fragment>
          ))}
        </M.Grid>
      </M.Box>
    </M.Card>
  )
}
