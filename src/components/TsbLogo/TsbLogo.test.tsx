import { render } from '@testing-library/react'
import React from 'react'
import { TsbLogo } from '.'

describe('TsbLogo page', () => {
  it('renders without crashing', () => {
    render(<TsbLogo />)
  })
})
