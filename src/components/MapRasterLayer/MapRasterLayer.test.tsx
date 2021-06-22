import { render } from '@testing-library/react'
import { MapRasterLayer, MapRasterLayerType } from '.'
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

const testRasterLayerData: MapRasterLayerType = {
  id: 'some-id',
  url: 'some-tileset-url',
}
describe('MapRasterLayer component', () => {
  it('renders in a map container', () => {
    render(
      <MapRoot {...testViewport}>
        <MapRasterLayer {...testRasterLayerData} />
      </MapRoot>
    )
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
