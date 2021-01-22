import * as R from 'react'
import * as M from '@material-ui/core'

type Props = {
  open: boolean
  children: R.ReactElement
}

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

export const CollapseFade: R.FC<Props> = props => {
  const theme = M.useTheme()
  const timeoutRef = R.useRef<NodeJS.Timeout>()
  const [faded, setFaded] = R.useState(false)

  R.useEffect(() => {
    if (props.open) {
      setRefTimeout(timeoutRef, () => setFaded(true), theme.transitions.duration.shortest)
    } else {
      clearRefTimeout(timeoutRef)
      setFaded(false)
    }
  }, [props.open])

  return (
    <M.Collapse in={props.open}>
      <M.Fade in={faded}>
        {props.children}
      </M.Fade>
    </M.Collapse>
  )
}
