import { render } from '@testing-library/react'
import { MapExtrusionLayer, MapExtrusionLayerType } from '.'
import { Map as MapRoot } from '../Map'
import * as nextRouter from 'next/router'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  replace: jest.fn().mockResolvedValue(true),
  pathname: '/map',
})

const testViewport = {
  width: 1440,
  height: 960,
  initialLatitude: 15.123,
  initialLongitude: 16.456,
  initialZoom: 10,
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
      <MapRoot {...testViewport}>
        <MapExtrusionLayer {...testExtrusionLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
