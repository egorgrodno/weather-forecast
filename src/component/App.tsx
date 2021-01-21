import * as R from 'react'
import * as M from '@material-ui/core'
import { Footer } from 'component/Footer'
import { Forecast } from 'component/Forecast'
import { Search } from 'component/Search'
import { Spacer } from 'component/Spacer'

export const App: R.FC = () => (
  <>
    <M.Container maxWidth="xs">
      <M.Box mt={8} mb={1.5}>
        <Search />
      </M.Box>

      <Forecast />
    </M.Container>

    <Spacer />

    <Footer />
  </>
)
