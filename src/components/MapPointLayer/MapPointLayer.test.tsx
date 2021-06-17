import { render } from '@testing-library/react'
import { MapPointLayer, MapPointLayerType } from '.'
import { Map as MapRoot } from '../Map'

const testViewport = {
  width: 1440,
  height: 960,
  latitude: 15.123,
  longitude: 16.456,
  zoom: 10,
}

const testPointLayerData: MapPointLayerType = {
  id: 'some-id',
  tileset: {
    url: 'some-url',
    layerName: 'some-layer-name',
  },
  minzoom: 11.5,
  fillColorProperty: 'some-fill-prop',
  fillColorMap: new Map([
    ['key-1', 'value-1'],
    ['key-2', 'value-2'],
    ['key-3', 'value-3'],
  ]),
}
describe('MapPointLayer component', () => {
  it('renders in a map container', () => {
    render(
      <MapRoot {...testViewport}>
        <MapPointLayer {...testPointLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
