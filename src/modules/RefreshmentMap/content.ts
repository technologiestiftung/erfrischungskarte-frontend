import { MapPointLayerType } from '@components/MapPointLayer'
import { MapExtrusionLayerType } from '../../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../../components/MapFilledPolygonLayer'

// Note: Hours are mapped. In mapbox the tiles are labeled with solar time not local time, that is 66 minutes behind. For example the shadow layer '2 am' in mapbox actually shows the shadows for 3 am.
export const HOURS = {
  '10': {
    displayName: '10 Uhr',
    vectorTilesetKey: '10Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6pkd1c22',
  },
  '11': {
    // incomplete, needs to be replaced!
    displayName: '11 Uhr',
    vectorTilesetKey: '11Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.cgvhefjx',
  },
  '12': {
    displayName: '12 Uhr',
    vectorTilesetKey: '12Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.czmr5c6o',
  },
  '13': {
    displayName: '13 Uhr',
    vectorTilesetKey: '13Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6i6vo02j',
  },
  '14': {
    displayName: '14 Uhr',
    vectorTilesetKey: '14Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.79eus56w',
  },
  '15': {
    displayName: '15 Uhr',
    vectorTilesetKey: '15Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.0gpw7ll3',
  },
  '16': {
    displayName: '16 Uhr',
    vectorTilesetKey: '16Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.b7kilqew',
  },
  '17': {
    displayName: '17 Uhr',
    vectorTilesetKey: '17Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.9vqcrksk',
  },
  '18': {
    displayName: '18 Uhr',
    vectorTilesetKey: '18Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.5w67kmqm',
  },
  '19': {
    displayName: '19 Uhr',
    vectorTilesetKey: '19Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.6291ii6g',
  },
  '20': {
    displayName: '20 Uhr',
    vectorTilesetKey: '20Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.9gfkjbpe',
  },
  '21': {
    //here are some errors, needs to be replaced!
    displayName: '21 Uhr',
    vectorTilesetKey: '21Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.cri2jkh2',
  },
}

export type QuantileValues = 1 | 2 | 3 | 4 | 5

export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
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
  MapFilledPolygonLayerType,
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

export const EXTRUDED_BUILDINGS_DATA: MapExtrusionLayerType = {
  id: '3d-buildings',
  url: 'mapbox://mapbox.mapbox-streets-v8',
  source: 'composite',
  sourceLayer: 'building',
  minzoom: 15.5,
  extrusionProperties: {
    base: 'min_height',
    height: 'height',
  },
  extrusionColor: '#ddd',
}

type PoiCategory =
  | 'Sitzbank'
  | 'Picknicktisch'
  | 'Gruenanlage'
  | 'Trinkbrunnen'
  | 'Brunnen'
  | 'Wasserspielplatz'
  | 'Badestelle'
  | 'Strandbad'
  | 'Freibad'
  | 'Schwimmhalle'

export interface PoiDataType extends MapPointLayerType {
  fillColorMap: Map<PoiCategory, string>
  activePropertyKeys: Partial<PoiCategory>[]
}

export const POI_DATA: PoiDataType = {
  id: 'poi-data',
  tileset: {
    url: 'mapbox://technologiestiftung.a9f6qix2',
    layerName: 'erfrischungskarte_poi-0mftmq',
  },
  minzoom: 11.5,
  fillColorProperty: 'category',
  fillColorMap: new Map([
    ['Gruenanlage', '#B2DF8A'],
    ['Badestelle', '#09AAA4'],
    ['Strandbad', '#09AAA4'],
    ['Badestelle', '#09AAA4'],
    ['Freibad', '#09AAA4'],
    ['Schwimmhalle', '#09AAA4'],
    ['Brunnen', '#A6CEE3'],
    ['Trinkbrunnen', '#A6CEE3'],
    ['Sitzbank', '#C37D3C'],
    ['Picknicktisch', '#C37D3C'],
  ]),
  activePropertyKeys: [
    'Picknicktisch',
    'Gruenanlage',
    'Trinkbrunnen',
    'Brunnen',
    'Wasserspielplatz',
    'Badestelle',
    'Strandbad',
    'Freibad',
    'Schwimmhalle',
  ],
}
