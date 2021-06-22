import { render, waitFor } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { SearchResultType, useGeocodedPlace } from '.'

type OnSuccessType = (results: SearchResultType[]) => void
type TestComponentType = FC<{ searchTerm: string }>

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

const createTestComponent = (onSuccess: OnSuccessType): TestComponentType => {
  const TestComponent: TestComponentType = ({ searchTerm }) => {
    const { results, error } = useGeocodedPlace(searchTerm)
    useEffect(() => {
      results.length && !error && onSuccess(results)
    }, [results, error])

    return <div />
  }
  return TestComponent
}
describe('useGeocodedPlace', () => {
  test('should return results onSuccess', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetch.mockResponseOnce(JSON.stringify({ features: testFeatures }))

    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)
    render(<TestComponent searchTerm="Nollen" />)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(testParsedFeatures)
    })
  })
})
