import * as R from 'react'
import * as M from '@material-ui/core'
import * as RD from 'lib/RemoteData'
import { store } from 'lib/Store'
import { SearchResult } from 'lib/Types'
import { Footer } from 'component/Footer'
import { Forecast } from 'component/Forecast'
import { Search } from 'component/Search'
import { Spacer } from 'component/Spacer'

export const App: R.FC = () => {
  const [searchResult, setSearchResult] = R.useState(RD.initial<SearchResult>())

  R.useEffect(() => {
    const sub = store.searchResult$.subscribe(result => {
      setSearchResult(result)
    })
    return () => sub.unsubscribe()
  }, [])

  return (
    <>
      <M.Container maxWidth="xs">
        <M.Box mt={8} mb={1.5}>
          <Search
            result={searchResult}
            onSearch={store.search}
            onPlaceSelect={place => console.log({ place })}
          />
        </M.Box>

        <Forecast />
      </M.Container>

      <Spacer />

      <Footer />
    </>
  )
}
