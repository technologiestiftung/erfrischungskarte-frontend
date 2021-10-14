import { HourType } from '@content/shade'

export interface PageQueryType {
  latitude: number | null
  longitude: number | null
  zoom: number | null
  places: number[] | null
  showShadows: boolean | null
  showTemperature: boolean | null
  showWind: boolean | null
  visibleHour: HourType | null
  searchTerm: string | null
}

const isNumber = (val: unknown): boolean =>
  !Number.isNaN(val) && Number.isInteger(parseFloat(String(val)))

const parseSingleNumber = (
  val: string | string[] | undefined
): number | null => {
  if (!val) return null
  if (typeof val === 'string') return parseFloat(val) || null
  if (isNumber(val)) return Number(val)
  return null
}

const parseNumbersArray = (
  val: string | string[] | undefined
): number[] | null => {
  if (typeof val === 'undefined') return null
  if (Array.isArray(val)) {
    return val.map(parseSingleNumber).filter(Boolean) as number[]
  }
  if (typeof val !== 'string') return null
  try {
    const parsedJson = JSON.parse(val) as unknown
    if (isNumber(parsedJson)) return [parsedJson] as number[]
    if (!Array.isArray(parsedJson)) return null
    return parsedJson.map(parseSingleNumber).filter(Boolean) as number[]
  } catch (err: unknown) {
    console.error(
      'There was an error while parsing the query parameter "places":',
      Error(err as string).message,
      Error(err as string).stack
    )
    return null
  }
}

const parseVisibleHour = (
  val: number | undefined | null
): PageQueryType['visibleHour'] | null => {
  if (!val) return null
  const allHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  if (allHours.includes(val))
    return val as unknown as PageQueryType['visibleHour']
  return null
}

const parseBoolean = (val: string | string[] | undefined): boolean | null => {
  if (val === 'true') return true
  if (val === 'false') return false
  return null
}

const parseString = (val: string | string[] | undefined): string | null =>
  (val && typeof val === 'string' && val.length > 0 && val) || null

const removeNull = (
  obj: Record<string, unknown | null>
): Partial<PageQueryType> => {
  Object.keys(obj).forEach(
    (k) => (obj[k] === null || typeof obj[k] === 'undefined') && delete obj[k]
  )
  return obj
}

export const mapRawQueryToState = (
  rawQuery: Record<string, string | string[] | undefined>
): Partial<PageQueryType> =>
  removeNull({
    latitude: parseSingleNumber(rawQuery.latitude),
    longitude: parseSingleNumber(rawQuery.longitude),
    zoom: parseSingleNumber(rawQuery.zoom),
    visibleHour: parseVisibleHour(parseSingleNumber(rawQuery.visibleHour)),
    places: parseNumbersArray(rawQuery.places),
    showShadows: parseBoolean(rawQuery.showShadows),
    showTemperature: parseBoolean(rawQuery.showTemperature),
    showWind: parseBoolean(rawQuery.showWind),
    searchTerm: parseString(rawQuery.searchTerm),
  })
