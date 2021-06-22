import { render } from '@testing-library/react'
import { MapFilledPolygonLayer, MapFilledPolygonLayerType } from '.'
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
      <MapRoot {...testViewport}>
        <MapFilledPolygonLayer {...testPolygonLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
