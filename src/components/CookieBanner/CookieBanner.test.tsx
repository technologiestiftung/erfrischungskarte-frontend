import { render, screen } from '@testing-library/react'
import { CookieBanner } from '.'

describe('CookieBanner component', () => {
  it('should render the data privacy link', () => {
    render(<CookieBanner />)
    const moreInfoLink = screen.getByText(/Weitere Informationen/g)
    expect(moreInfoLink).toBeInTheDocument()
  })
  it('should render the Info text', () => {
    render(<CookieBanner />)
    const infoText = screen.getByText(/Diese Webseite verwendet Cookies/g)
    expect(infoText).toBeInTheDocument()
  })
})
