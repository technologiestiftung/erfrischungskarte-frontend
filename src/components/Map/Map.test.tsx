import { render } from '@testing-library/react'
import { Map } from '.'
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

describe('Map component', () => {
  it('renders a map container', () => {
    render(<Map {...testViewport} />)
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
