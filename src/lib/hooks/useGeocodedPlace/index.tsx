import useSWR from 'swr'

interface RawSearchResultType {
  id: string
  place_name_de: string
  geometry: {
    coordinates: [latitude: number, longitude: number]
  }
}

export interface SearchResultType {
  id: string
  name: string
  latitude: number
  longitude: number
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

const mapRawResults = (rawResults: RawSearchResultType[]): SearchResultType[] =>
  rawResults.map(({ id, place_name_de, geometry }) => ({
    id,
    name: place_name_de,
    latitude: geometry.coordinates[0],
    longitude: geometry.coordinates[1],
  }))

const fetchSearch = async (searchTerm: string): Promise<SearchResultType[]> => {
  if (searchTerm.length < 3) return []

  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?autocomplete=true&language=de&country=de&bbox=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973&access_token=${MAPBOX_TOKEN}`
  const res = await fetch(geocodingUrl)

  if (!res.ok) return []

  const json = (await res.json()) as { features: RawSearchResultType[] }
  return mapRawResults(json.features || [])
}

export const useGeocodedPlace = (
  searchTerm: string
): {
  results: SearchResultType[]
  error: Error | null
} => {
  const { data: results, error } = useSWR<SearchResultType[], Error>(
    ['sidebarSearch', searchTerm],
    () => fetchSearch(searchTerm)
  )

  return { results: results || [], error: error || null }
}
