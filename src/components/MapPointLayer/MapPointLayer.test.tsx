import { render } from '@testing-library/react'
import { MapPointLayer, MapPointLayerType } from '.'
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

const mapProps = {
  width: 1440,
  height: 960,
  initialViewportProps: {
    latitude: 15.123,
    longitude: 16.456,
    zoom: 10,
  },
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
      <MapRoot {...mapProps}>
        <MapPointLayer {...testPointLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
