import { render } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Filters } from '../../pages/filters'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Filters page', () => {
  it('renders without crashing', () => {
    render(<Filters query={{}} />)
  })
})
