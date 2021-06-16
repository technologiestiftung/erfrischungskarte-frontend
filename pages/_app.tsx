import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { RefreshmentMap } from '@modules/RefreshmentMap'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import Head from 'next/head'
import '../src/style/global.css'
import '../src/components/MapControls/mapControls.css'

interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

const App: FC<{
  Component: FC<{
    query: ReturnType<typeof mapRawQueryToState>
  }>
  pageProps: PagePropType
}> = ({ Component, pageProps }) => {
  const parsedQuery = mapRawQueryToState(pageProps.query)
  return (
    <StrictMode>
      <RefreshmentMap {...pageProps}>
        <Head>
          <title>{`${
            pageProps.title ? `${pageProps.title} - ` : ' '
          }Erfrischungskarte Berlin`}</title>
        </Head>
        <Component {...pageProps} query={parsedQuery} />
      </RefreshmentMap>
    </StrictMode>
  )
}

export default App
