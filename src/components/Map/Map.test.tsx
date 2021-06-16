import { render } from '@testing-library/react'
import { Map } from '.'

const testViewport = {
  width: 1440,
  height: 960,
  latitude: 15.123,
  longitude: 16.456,
  zoom: 10,
  isMobile: false,
}

describe('Map component', () => {
  it('renders a map container', () => {
    render(<Map {...testViewport} />)
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
