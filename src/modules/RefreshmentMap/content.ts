import { PolygonLayerType } from '../../components/Map/VectorTileLayers'

export const HOURS = [
  {
    id: 10,
    vectorTilesetId: '10Uhr',
  },
  {
    id: 11,
    vectorTilesetId: '11Uhr',
  },
  {
    id: 12,
    vectorTilesetId: '12Uhr',
  },
  {
    id: 13,
    vectorTilesetId: '13Uhr',
  },
  {
    id: 14,
    vectorTilesetId: '14Uhr',
  },
  {
    id: 15,
    vectorTilesetId: '15Uhr',
  },
  {
    id: 16,
    vectorTilesetId: '16Uhr',
  },
  {
    id: 17,
    vectorTilesetId: '17Uhr',
  },
  {
    id: 18,
    vectorTilesetId: '18Uhr',
  },
  {
    id: 19,
    vectorTilesetId: '19Uhr',
  },
  {
    id: 20,
    vectorTilesetId: '20Uhr',
  },
  {
    id: 21,
    vectorTilesetId: '21Uhr',
  },
]

export const WIND_DATA: Pick<
  PolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.9s5puknr',
    layerName: 'wind_data-221dgh',
  },
  fillColorMap: new Map([
    // Note: the mapping here is different than the one for the temperature data.
    [5, 'rgba(0,68,27,100)'],
    [4, 'rgba(42,146,74,100)'],
    [3, 'rgba(123,200,124,100)'],
    [2, 'rgba(202,234,195,100)'],
    [1, 'rgba(255,255,255,0)'],
  ]),
}

export const TEMPERATURE_DATA: Pick<
  PolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1ejpa7pd',
    layerName: 'temperature_data-11wkut',
  },
  fillColorMap: new Map([
    [1, 'rgba(8,48,107,100)'],
    [2, 'rgba(40,121,185,100)'],
    [3, 'rgba(115,179,216,100)'],
    [4, 'rgba(200,221,240,100)'],
    [5, 'rgba(255,255,255,0)'],
  ]),
}
