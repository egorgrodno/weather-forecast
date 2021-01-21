import * as R from 'react'
import * as M from '@material-ui/core'
import { amchartsLogo, githubLogo, openWeatherLogo } from 'assets'
import { Spacer } from 'component/Spacer'

const useStyles = M.makeStyles(theme => ({
  root: {
    background: M.colors.grey[900],
    padding: theme.spacing(4, 6),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    display: 'block',
    height: 32,
  },
  logoOffsetRight: {
    paddingRight: theme.spacing(2),
  },
}))

export const Footer: R.FC = () => {
  const classes = useStyles()

  return (
    <M.AppBar className={classes.root} component="footer" position="static">
      <a
        className={classes.logoOffsetRight}
        href="https://openweathermap.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={classes.logo} src={openWeatherLogo} alt="OpenWeather logo" />
      </a>
      <a href="https://www.amcharts.com" target="_blank" rel="noopener noreferrer">
        <img className={classes.logo} src={amchartsLogo} alt="amCharts logo" />
      </a>

      <Spacer />

      <a href="https://github.com/egorgrodno/weather-forecast" rel="noopener noreferrer">
        <img className={classes.logo} src={githubLogo} alt="GitHub logo" />
      </a>
    </M.AppBar>
  )
}
