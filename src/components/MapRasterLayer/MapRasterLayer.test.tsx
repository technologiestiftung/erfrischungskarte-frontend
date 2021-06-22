import { render } from '@testing-library/react'
import { MapRasterLayer, MapRasterLayerType } from '.'
import { Map as MapRoot } from '../Map'

const mapProps = {
  width: 1440,
  height: 960,
  initialViewportProps: {
    latitude: 15.123,
    longitude: 16.456,
    zoom: 10,
  },
}

const testRasterLayerData: MapRasterLayerType = {
  id: 'some-id',
  url: 'some-tileset-url',
}
describe('MapRasterLayer component', () => {
  it('renders in a map container', () => {
    render(
      <MapRoot {...mapProps}>
        <MapRasterLayer {...testRasterLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
