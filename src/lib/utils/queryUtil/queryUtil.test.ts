import { mapRawQueryToState } from '.'

describe('mapRawQueryToState', () => {
  test('happy path', () => {
    const testLat = 12.452632
    const testLng = 13.123456
    const testZoom = 10
    const testPlaces = [1, 2, 3, 4]
    const testShowShadows = true
    const testShowTemperature = false
    const testShowWind = true
    const testVisibleHour = 14
    const testSearchTerm = 'Kreuzberg'
    const queryState = mapRawQueryToState({
      latitude: `${testLat}`,
      longitude: `${testLng}`,
      zoom: `${testZoom}`,
      places: testPlaces.map((id) => id.toString()),
      showShadows: testShowShadows.toString(),
      showTemperature: testShowTemperature.toString(),
      showWind: testShowWind.toString(),
      visibleHour: testVisibleHour.toString(),
      searchTerm: testSearchTerm,
    })

    expect(queryState.latitude).toBe(testLat)
    expect(queryState.longitude).toBe(testLng)
    expect(queryState.zoom).toBe(testZoom)
    expect(queryState.places).toMatchObject(testPlaces)
    expect(queryState.showShadows).toBe(testShowShadows)
    expect(queryState.showTemperature).toBe(testShowTemperature)
    expect(queryState.showWind).toBe(testShowWind)
    expect(queryState.visibleHour).toBe(testVisibleHour)
    expect(queryState.searchTerm).toBe(testSearchTerm)
  })

  test('should retrun undefined with invalid numbers', () => {
    const queryState = mapRawQueryToState({
      latitude: 'absc',
      longitude: '[absc,1,null]',
      zoom: 'NaN',
    })

    expect(queryState.latitude).toBe(undefined)
    expect(queryState.longitude).toBe(undefined)
    expect(queryState.zoom).toBe(undefined)
    expect(
      mapRawQueryToState({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignoressss
        latitude: {},
      }).places
    ).toBe(undefined)
  })

  test('should return undefined when places is not an array', () => {
    expect(
      mapRawQueryToState({
        places: '{}',
      }).places
    ).toBe(undefined)
  })
  test('should return an array of numbers for places', () => {
    expect(
      mapRawQueryToState({
        places: ['1', '2', '3', '4'],
      }).places
    ).toMatchObject([1, 2, 3, 4])
  })

  test('should return undefined if the places array could not be parsed', () => {
    expect(
      mapRawQueryToState({
        places: '[1,null,undefined,aa]',
      }).places
    ).toBe(undefined)
  })
  test('should filter out places that are not valid', () => {
    expect(
      mapRawQueryToState({
        places: ['1', 'null', 'aa'],
      }).places
    ).toMatchObject([1])
  })
  test('should work with places as an array', () => {
    expect(
      mapRawQueryToState({
        places: ['1', '2', '3'],
      }).places
    ).toMatchObject([1, 2, 3])
  })
  test('should convert booleans to true, false or undefined', () => {
    expect(
      mapRawQueryToState({
        showShadows: 'true',
        showTemperature: 'false',
        showWind: 'mama',
      })
    ).toMatchObject({
      showShadows: true,
      showTemperature: false,
    })
  })
  test('should return undefined for invalid visibleHour', () => {
    expect(mapRawQueryToState({ visibleHour: undefined }).visibleHour).toBe(
      undefined
    )
    expect(mapRawQueryToState({ visibleHour: '0.5' }).visibleHour).toBe(
      undefined
    )
    expect(mapRawQueryToState({ visibleHour: '-1' }).visibleHour).toBe(
      undefined
    )
    expect(mapRawQueryToState({ visibleHour: '24' }).visibleHour).toBe(
      undefined
    )
    const allHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    allHours.forEach((hour) => {
      expect(mapRawQueryToState({ visibleHour: `${hour}` }).visibleHour).toBe(
        hour
      )
    })
  })
  test('should only accept string search terms', () => {
    expect(
      mapRawQueryToState({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchTerm: 123,
      }).searchTerm
    ).toBe(undefined)
  })
})
