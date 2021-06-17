import { render } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Map } from '../../pages/map'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Map page', () => {
  it('renders without crashing', () => {
    render(<Map />)
  })
})
