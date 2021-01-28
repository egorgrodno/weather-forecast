import * as R from 'react'
import * as M from '@material-ui/core'
import * as I from '@material-ui/icons'
import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import * as RD from 'lib/RemoteData'
import { Place, SearchResult } from 'lib/Types'
import { CollapseFade } from 'component/CollapseFade'

type Props = {
  result: RD.RemoteData<SearchResult>
  onSearch: (query: string) => void
  onPlaceSelect: (place: Place) => void
}

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
  suggestion: {
    transition: 'none',
  },
}))

export const Search: R.FC<Props> = props => {
  const classes = useStyles()
  const [query, setQuery] = R.useState('')
  const [focused, setFocused] = R.useState(false)
  const [open, setOpen] = R.useState(false)
  const pendingWithData =
    RD.isPending(props.result)
    && O.isSome(props.result.prevData)
    && A.isNonEmpty(props.result.prevData.value)
  const shouldBeOpen = query !== '' && (pendingWithData || RD.isSuccess(props.result))
  const handleFocus = () => {
    setFocused(true)
    if (shouldBeOpen) {
      handleOpen()
    }
  }
  const handleBlur = () => {
    setFocused(false)
    handleClose()
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleQueryChange = (query: string) => {
    if (query === '') {
      handleClose()
    }
    setQuery(query)
    props.onSearch(query)
  }
  const handleQueryClear = () => {
    setQuery('')
    props.onSearch(query)
  }
  const handlePlaceSelect = (place: Place) => {
    handleQueryClear()
    props.onPlaceSelect(place)
  }

  if (shouldBeOpen && focused && !open) {
    handleOpen()
  }

  return (
    <div className={classes.root}>
      <M.Paper elevation={focused ? 3 : 1}>
        <div className={classes.inputRoot}>
          <I.Search className={classes.searchIcon} />

          <M.InputBase
            className={classes.input}
            placeholder="Seach location"
            value={query}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={e => handleQueryChange(e.target.value)}
          />

          {query !== '' && (
            <M.IconButton className={classes.clearButton} onClick={handleQueryClear}>
              <I.Clear />
            </M.IconButton>
          )}
        </div>

        <CollapseFade open={open}>
          <M.List className={classes.suggestions}>
            {pipe(
              RD.getData(props.result),
              O.map((places): R.ReactNode => (
                <>
                  {A.isEmpty(places) && query !== '' && (
                    <M.ListItem
                      className={classes.suggestion}
                      disabled={RD.isPending(props.result)}
                    >
                      No results
                    </M.ListItem>
                  )}
                  {places.map(place => (
                    <M.ListItem
                      key={place.id}
                      className={classes.suggestion}
                      button
                      disabled={RD.isPending(props.result)}
                      onClick={() => handlePlaceSelect(place)}
                    >
                      {place.place_name}
                    </M.ListItem>
                  ))}
                </>
              )),
              O.toNullable,
            )}
          </M.List>
        </CollapseFade>
      </M.Paper>
    </div>
  )
}
