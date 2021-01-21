import * as M from '@material-ui/core'

export const theme = M.createMuiTheme({
  palette: {
    primary: {
      main: M.colors.blue[600],
    },
    text: {
      primary: '#4b5d6a',
      secondary: '#a1adb5',
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#root': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
})
