import { render } from '@testing-library/react'
import { MapFilledPolygonLayer, MapFilledPolygonLayerType } from '.'
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

const testPolygonLayerData: MapFilledPolygonLayerType = {
  id: 'some-id',
  tileset: {
    url: 'some-url',
    layerName: 'some-layer-name',
  },
  fillColorProperty: 'some-fill-prop',
  fillColorMap: new Map([
    ['key-1', 'value-1'],
    ['key-2', 'value-2'],
    ['key-3', 'value-3'],
  ]),
}
describe('MapFilledPolygonLayer component', () => {
  it('renders in a map container', () => {
    render(
      <MapRoot {...mapProps}>
        <MapFilledPolygonLayer {...testPolygonLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
