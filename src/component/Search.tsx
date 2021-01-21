import * as R from 'react'
import * as M from '@material-ui/core'
import * as I from '@material-ui/icons'

const useStyles = M.makeStyles(theme => ({
  root: {
    position: 'relative',
    height: 60,
  },
  inputRoot: {
    padding: theme.spacing(0.75, 0.5, 0.25),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  searchIcon: {
    margin: theme.spacing(1.5, 2),
  },
  clearButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1, 0, 0.5),
  },
  suggestions: {
    paddingTop: 0,
  },
}))

type TimeoutRef = R.MutableRefObject<NodeJS.Timeout | undefined>

const setRefTimeout = (timeoutRef: TimeoutRef, f: () => void, n: number): void => {
  timeoutRef.current = setTimeout(() => {
    timeoutRef.current = undefined
    f()
  }, n)
}

const clearRefTimeout = (timeoutRef: TimeoutRef): void => {
  if (timeoutRef.current !== undefined) {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }
}

export const Search: R.FC = () => {
  const classes = useStyles()
  const theme = M.useTheme()
  const [collapsed, setCollapsed] = R.useState(false)
  const [faded, setFaded] = R.useState(false)
  const timeoutRef = R.useRef<NodeJS.Timeout>()
  const handleOpen = () => {
    if (!collapsed) {
      setRefTimeout(timeoutRef, () => setFaded(true), theme.transitions.duration.shortest)
      setCollapsed(true)
    }
  }
  const handleClose = () => {
    clearRefTimeout(timeoutRef)
    setFaded(false)
    setCollapsed(false)
  }

  return (
    <div className={classes.root}>
      <M.ClickAwayListener onClickAway={handleClose}>
        <M.Card>
          <div className={classes.inputRoot}>
            <I.Search className={classes.searchIcon} />

            <M.InputBase
              className={classes.input}
              onClick={handleOpen}
              placeholder="Seach Location"
            />

            <M.IconButton className={classes.clearButton}>
              <I.Clear />
            </M.IconButton>
          </div>

          <M.Box height={4}>
            <M.LinearProgress color="primary" />
          </M.Box>

          <M.Collapse in={collapsed}>
            <M.Fade in={faded}>
              <M.List className={classes.suggestions}>
                <M.ListItem button onClick={handleClose}>Address 1</M.ListItem>
                <M.ListItem button onClick={handleClose}>Address 2</M.ListItem>
                <M.ListItem button onClick={handleClose}>Address 3</M.ListItem>
              </M.List>
            </M.Fade>
          </M.Collapse>
        </M.Card>
      </M.ClickAwayListener>
    </div>
  )
}
