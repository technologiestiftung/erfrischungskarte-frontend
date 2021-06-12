import { StrictMode, FC } from 'react'
import '../src/style/global.css'

const App: FC<{
  Component: FC
  pageProps: Record<string, unknown>
}> = ({ Component, pageProps }) => {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  )
}

export default App
