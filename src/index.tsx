import * as R from 'react'
import * as RD from 'react-dom'
import * as M from '@material-ui/core'
import { App } from 'component/App'
import { theme } from 'theme'

RD.render(
  <R.StrictMode>
    <M.ThemeProvider theme={theme}>
      <M.CssBaseline />
      <App />
    </M.ThemeProvider>
  </R.StrictMode>,
  document.getElementById('root'),
)
