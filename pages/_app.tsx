import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { RefreshmentMap } from '@modules/RefreshmentMap'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import '../src/components/MapControls/mapControls.css'
import '../src/components/MapPoiTooltip/MapPoiTooltip.css'

interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

interface ComponentPropType {
  title?: string
  query?: ReturnType<typeof mapRawQueryToState>
}

const matomoInstance = createInstance({
  urlBase: process.env.NEXT_PUBLIC_MATOMO_URL || 'https://piwik.example.de',
  siteId: Number(process.env.NEXT_PUBLIC_MATOMO_SITE_ID) || 1,
  configurations: {
    disableCookies: true,
  },
})

const App: FC<{
  Component: FC<ComponentPropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  const parsedQuery = pageProps.query ? mapRawQueryToState(pageProps.query) : {}

  return (
    <StrictMode>
      <MatomoProvider value={matomoInstance}>
        <RefreshmentMap {...pageProps} query={parsedQuery}>
          <Head pageTitle={pageProps.title || ''} />
          <Component {...pageProps} query={parsedQuery} />
        </RefreshmentMap>
      </MatomoProvider>
    </StrictMode>
  )
}

export default App
