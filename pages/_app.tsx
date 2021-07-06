import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { RefreshmentMap } from '@modules/RefreshmentMap'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import '../src/components/MapControls/mapControls.css'
import '../src/components/MapPoiTooltip/MapPoiTooltip.css'
import { useMatomo } from '@lib/hooks/useMatomo'

interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

interface ComponentPropType {
  title?: string
  query?: ReturnType<typeof mapRawQueryToState>
}

const App: FC<{
  Component: FC<ComponentPropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  useMatomo(pageProps.title)
  const parsedQuery = pageProps.query ? mapRawQueryToState(pageProps.query) : {}

  return (
    <StrictMode>
      <RefreshmentMap {...pageProps} query={parsedQuery}>
        <Head pageTitle={pageProps.title || ''} />
        <Component {...pageProps} query={parsedQuery} />
      </RefreshmentMap>
    </StrictMode>
  )
}

export default App
