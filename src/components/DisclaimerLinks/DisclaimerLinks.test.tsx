import { render, screen } from '@testing-library/react'
import { DisclaimerLinks } from '.'

describe('DisclaimerLinks', () => {
  test('should render the disclaimer links', () => {
    render(<DisclaimerLinks />)

    const impressum = screen.getByText('Impressum')
    const datenschutz = screen.getByText('Datenschutz')

    expect(impressum).toBeInTheDocument()
    expect(datenschutz).toBeInTheDocument()
  })
})
