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
      <RefreshmentMap {...pageProps}>
        <Head>
          <title>{`${
            pageProps.title ? `${pageProps.title} - ` : ' '
          }Erfrischungskarte Berlin`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} query={parsedQuery} />
      </RefreshmentMap>
    </StrictMode>
  )
}

export default App
