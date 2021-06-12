import { render } from '@testing-library/react'
import { Map } from '.'

describe('Map component', () => {
  it('renders a map container', () => {
    render(<Map />)
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
