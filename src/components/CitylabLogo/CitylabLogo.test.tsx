import { render } from '@testing-library/react'
import React from 'react'
import { CitylabLogo } from '.'

describe('CitylabLogo', () => {
  it('renders without crashing', () => {
    render(<CitylabLogo />)
  })
})
