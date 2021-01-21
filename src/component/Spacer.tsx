import * as R from 'react'
import * as M from '@material-ui/core'

const useStyles = M.makeStyles({
  root: {
    flexGrow: 1,
  },
})

export const Spacer: R.FC = () => {
  const classes = useStyles()

  return <div className={classes.root} />
}
