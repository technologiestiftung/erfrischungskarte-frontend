import { render } from '@testing-library/react'
import { MapPoiTooltip } from '.'
import { Map as MapRoot } from '@components/Map'

const initialViewportProps = {
  latitude: 15.123,
  longitude: 16.456,
  zoom: 10,
}

describe('MapPoiTooltip', () => {
  test('renders in a map container', () => {
    render(
      <MapRoot
        width={800}
        height={500}
        initialViewportProps={initialViewportProps}
      >
        <MapPoiTooltip
          coordinates={{ latitude: 52.520952, longitude: 13.400033 }}
          title="Tooltip title"
          category="Tooltip category"
          info="Tooltip info"
        />
      </MapRoot>
    )

    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
