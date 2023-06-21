import { render } from '@testing-library/react'
import React from 'react'
import { SenatskanzleiLogo } from '.'

describe('SenatskanzleiLogo page', () => {
  it('renders without crashing', () => {
    render(<SenatskanzleiLogo />)
  })
})
