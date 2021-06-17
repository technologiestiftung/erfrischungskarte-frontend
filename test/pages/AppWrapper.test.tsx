import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import AppWrapper from '../../pages/_app'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('FourOFour', () => {
  test('should render its children', () => {
    render(
      <AppWrapper
        Component={({ title, query }) => (
          <>
            <h1>{title}-2</h1>
            <h2>{query?.searchTerm}</h2>
          </>
        )}
        pageProps={{ query: { searchTerm: 'SEARCHTERM' }, title: 'TITLE' }}
      />
    )

    const title = screen.getByText('TITLE-2')
    const searchTerm = screen.getByText('SEARCHTERM')

    expect(title).toBeInTheDocument()
    expect(searchTerm).toBeInTheDocument()
  })
})
