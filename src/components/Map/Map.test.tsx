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

const mapProps = {
  width: 1440,
  height: 960,
  initialViewportProps: {
    latitude: 15.123,
    longitude: 16.456,
    zoom: 10,
  },
}

describe('Map component', () => {
  it('renders a map container', () => {
    render(<Map {...mapProps} />)
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    )
    expect(mapContainer).toBeInTheDocument()
  })
})
