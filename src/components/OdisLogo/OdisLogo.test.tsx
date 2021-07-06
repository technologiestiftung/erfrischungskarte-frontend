import { render } from '@testing-library/react'
import React from 'react'
import { OdisLogo } from '.'

describe('OdisLogo page', () => {
  it('renders without crashing', () => {
    render(<OdisLogo />)
  })
})
