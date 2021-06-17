import { render } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Search } from '../../pages/search'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Search page', () => {
  it('renders without crashing', () => {
    render(<Search query={{}} />)
  })
})
