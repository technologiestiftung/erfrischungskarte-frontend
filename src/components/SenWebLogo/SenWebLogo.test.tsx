import { render } from '@testing-library/react'
import React from 'react'
import { SenWebLogo } from '.'

describe('SenWebLogo page', () => {
  it('renders without crashing', () => {
    render(<SenWebLogo />)
  })
})
