import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import * as geocodedPlace from '@lib/hooks/useGeocodedPlace'
import { Search } from '../../pages/search'
import { SEARCH_SUGGESTIONS } from '@content/search'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

const testFeatures = [
  {
    id: 'poi.274877947656',
    place_name_de:
      'U-Bahnhof Nollendorfplatz, Kleiststr., Berlin, 10777, Deutschland',
    geometry: {
      coordinates: [13.353788, 52.49920075],
    },
  },
  {
    id: 'poi.798863981061',
    place_name_de:
      'Neues Schauspielhaus, Nollendorfplatz 5, Berlin, 10777, Deutschland',
    geometry: { coordinates: [13.35264, 52.4991] },
  },
  {
    id: 'poi.68719533160',
    place_name_de:
      'Nollen Asia Imbiss, U-Bahnhof Nollendorfplatz, Berlin, 10777, Deutschland',
    geometry: { coordinates: [13.353677, 52.4997] },
  },
  {
    id: 'address.4498082237572484',
    place_name_de: 'Nollendorfplatz, 10777 Berlin, Deutschland',
    geometry: {
      coordinates: [13.3542573, 52.4992713],
    },
  },
]

const testParsedFeatures = testFeatures.map(
  ({ id, place_name_de, geometry }) => ({
    id,
    name: place_name_de,
    latitude: geometry.coordinates[0],
    longitude: geometry.coordinates[1],
  })
)

const useGeocodedPlace = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
geocodedPlace.useGeocodedPlace = useGeocodedPlace.mockReturnValue({
  results: testParsedFeatures,
})

describe('Search page', () => {
  it('should render a heading', async () => {
    render(<Search />)

    const heading = screen.getByRole('heading', { name: 'Standort' })
    await waitFor(() => expect(heading).toBeInTheDocument())
  })
  it('should render a search input', async () => {
    render(<Search />)

    const textInput = screen.getByRole('textbox')
    await waitFor(() => expect(textInput).toBeInTheDocument())
  })
  it('should render each POI suggestion', async () => {
    useGeocodedPlace.mockReturnValue({
      results: [],
    })
    render(<Search />)

    for (let i = 0; i < SEARCH_SUGGESTIONS.length; i++) {
      const { properties } = SEARCH_SUGGESTIONS[i]
      const name = screen.getByRole('heading', { name: properties.name })
      await waitFor(() => expect(name).toBeInTheDocument())
    }
  })
  it('should change the input value when typing', async () => {
    useGeocodedPlace.mockReturnValue({
      results: testParsedFeatures,
    })
    render(<Search />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Nollen' } })

    await waitFor(() => {
      const firstResult = screen.getByText(
        /dorfplatz, Kleiststr., Berlin, 10777, Deutschland/gi
      )
      expect(firstResult).toBeInTheDocument()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(input.value).toBe('Nollen')
    })
  })
})
