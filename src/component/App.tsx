import * as R from 'react'
import * as M from '@material-ui/core'
import * as RD from 'lib/RemoteData'
import { store } from 'lib/Store'
import { ForecastData, SearchResult } from 'lib/Types'
import { Footer } from 'component/Footer'
import { Forecast } from 'component/Forecast'
import { Search } from 'component/Search'
import { Spacer } from 'component/Spacer'

export const App: R.FC = () => {
  const [searchResult, setSearchResult] = R.useState(RD.initial<SearchResult>())
  const [forecastData, setForecastData] = R.useState(RD.initial<ForecastData>())

  R.useEffect(() => {
    const searchResultSub = store.searchResult$.subscribe(result => {
      setSearchResult(result)
    })
    const forecastSub = store.forecastData$.subscribe(data => {
      setForecastData(data)
    })
    return () => {
      searchResultSub.unsubscribe()
      forecastSub.unsubscribe()
    }
  }, [])
  R.useEffect(() => {
    store.selectPlace({
      id: 'initial_place',
      place_name: 'Grodno, Belarus',
      center: [23.81667, 53.66667],
    })
  }, [])

  return (
    <>
      <M.Container maxWidth="xs">
        <M.Box mt={8} mb={1.5}>
          <Search result={searchResult} onSearch={store.search} onPlaceSelect={store.selectPlace} />
        </M.Box>

        <Forecast forecastData={forecastData} />
      </M.Container>

      <Spacer />

      <Footer />
    </>
  )
}
