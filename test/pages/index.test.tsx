import { render } from '@testing-library/react'
import React from 'react'
import { Home } from '../../pages/index'

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />)
  })
})
