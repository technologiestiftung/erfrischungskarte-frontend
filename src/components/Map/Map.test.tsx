import { render } from '@testing-library/react'
import { Map } from '.'

const mapProps = {
  width: 1440,
  height: 960,
  initialViewportProps: {
    latitude: 15.123,
    longitude: 16.456,
    zoom: 10,
  },
}

describe('Map component', () => {
  it('renders a map container', () => {
    render(<Map {...mapProps} />)
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
