import * as R from 'react'
import * as M from '@material-ui/core'
import { tuple } from 'fp-ts/function'
import { amchartsLogo, githubLogo, mapboxLogo, openWeatherLogo } from 'assets'
import { Spacer } from 'component/Spacer'

const useStyles = M.makeStyles(theme => ({
  root: {
    background: M.colors.grey[900],
    padding: theme.spacing(4, 6),
  },
  logo: {
    display: 'block',
    height: 32,
  },
}))

export const Footer: R.FC = R.memo(() => {
  const classes = useStyles()
  const externalLinks = [
    //     url                          logoSrc           logoAlt
    tuple('https://mapbox.com'    ,     mapboxLogo,      'mapbox logo'),
    tuple('https://openweathermap.org', openWeatherLogo, 'OpenWeather logo'),
    tuple('https://amcharts.com',       amchartsLogo,    'amCharts logo'),
  ]

  return (
    <M.AppBar className={classes.root} component="footer" position="static">
      <M.Grid container spacing={2} wrap="nowrap">
        {externalLinks.map(([url, logoSrc, logoAlt]) => (
          <M.Grid key={url} item>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img className={classes.logo} src={logoSrc} alt={logoAlt} />
            </a>
          </M.Grid>
        ))}

        <Spacer />

        <M.Grid item>
          <a href="https://github.com/egorgrodno/weather-forecast" rel="noopener noreferrer">
            <img className={classes.logo} src={githubLogo} alt="GitHub logo" />
          </a>
        </M.Grid>
      </M.Grid>
    </M.AppBar>
  )
})
