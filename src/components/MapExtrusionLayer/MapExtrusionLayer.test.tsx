import { render } from '@testing-library/react'
import { MapExtrusionLayer, MapExtrusionLayerType } from '.'
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

const testExtrusionLayerData: MapExtrusionLayerType = {
  id: 'some-id',
  source: 'some-source',
  url: 'some-url',
  minzoom: 12,
  sourceLayer: 'some-source-layer',
  extrusionProperties: {
    base: 'some-base-prop',
    height: 'some-height-prop',
  },
  extrusionColor: '#ff00ff',
}
describe('MapExtrusionLayer component', () => {
  it('renders in a map container', () => {
    render(
      <MapRoot {...mapProps}>
        <MapExtrusionLayer {...testExtrusionLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
