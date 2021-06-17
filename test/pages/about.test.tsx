import { render } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { About } from '../../pages/about'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('About page', () => {
  it('renders without crashing', () => {
    render(<About query={{}} />)
  })
})
