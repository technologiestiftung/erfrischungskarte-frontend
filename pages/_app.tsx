import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { RefreshmentMap } from '@modules/RefreshmentMap'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import Head from 'next/head'
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

const App: FC<{
  Component: FC<ComponentPropType>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  const parsedQuery = pageProps.query ? mapRawQueryToState(pageProps.query) : {}
  return (
    <StrictMode>
      <RefreshmentMap {...pageProps} query={parsedQuery}>
        <Head>
          <title>{`${
            pageProps.title ? `${pageProps.title} - ` : ' '
          }Erfrischungskarte Berlin`}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} query={parsedQuery} />
      </RefreshmentMap>
    </StrictMode>
  )
}

export default App
