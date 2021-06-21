import { MapPointLayerType } from '@components/MapPointLayer'
import { MapExtrusionLayerType } from '../../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../../components/MapFilledPolygonLayer'
import colors from '../../style/colors'

export type HourType =
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'

export type HourDataType = {
  [key in HourType]: {
    displayName: string
    vectorTilesetKey: string
    shadeTilesetId: string
  }
}

// Note: Hours are mapped. In mapbox the tiles are labeled with solar time not local time, that is 66 minutes behind. For example the shadow layer '2 am' in mapbox actually shows the shadows for 3 am.
export const HOURS: HourDataType = {
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
    //missing, this is just a placeholder!
    displayName: '17 Uhr',
    vectorTilesetKey: '17Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '18': {
    //missing, this is just a placeholder!
    displayName: '18 Uhr',
    vectorTilesetKey: '18Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.4tg8dy6l',
  },
  '19': {
    //missing, this is just a placeholder!
    displayName: '19 Uhr',
    vectorTilesetKey: '19Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '20': {
    displayName: '20 Uhr',
    vectorTilesetKey: '20Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
  },
  '21': {
    //missing, this is just a placeholder!
    displayName: '21 Uhr',
    vectorTilesetKey: '21Uhr',
    shadeTilesetId: 'mapbox://technologiestiftung.atdnvldm',
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
    [5, colors['layer-green'][400]],
    [4, colors['layer-green'][300]],
    [3, colors['layer-green'][200]],
    [2, colors['layer-green'][100]],
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
    [1, colors['layer-blue'][400]],
    [2, colors['layer-blue'][300]],
    [3, colors['layer-blue'][200]],
    [4, colors['layer-blue'][100]],
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
  id: string
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
    ['Gruenanlage', colors['poi-green']],
    ['Badestelle', colors['poi-darkblue']],
    ['Strandbad', colors['poi-darkblue']],
    ['Badestelle', colors['poi-darkblue']],
    ['Freibad', colors['poi-darkblue']],
    ['Schwimmhalle', colors['poi-darkblue']],
    ['Wasserspielplatz', colors['poi-pink']],
    ['Brunnen', colors['poi-turquoise']],
    ['Trinkbrunnen', colors['poi-lightblue']],
    ['Sitzbank', colors['poi-yellow']],
    ['Picknicktisch', colors['poi-red']],
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

export const ABOUT_INTRODUCTION_TEXT =
  'Eine Webkarte vom Berliner Stadtgebiet, die Temperatur(-verhältnisse), Wind(-verhältnisse) und Schattenbereiche anzeigt. Diese Daten können für jede Stunde des Tages zwischen 9 -22 Uhr angezeigt werden. Die Karte gibt also Informationen darüber an welchen Orten vergleichsweise höhere oder niedrigere Temperaturen und Windstärken vorherrschen und zu welchen Uhrzeiten wo Schatten und Sonne zu erwarten sind. Mit der Karte werden also unter anderem Bereiche visualisieren, in denen sich die Bürger in Berlin an heißen Tagen erfrischen können.'

const dummyParagraph =
  'Temperaturen und Windstärken vorherrschen und zu welchen Uhrzeiten wo Schatten und Sonne zu erwarten sind. Mit der Karte werden also unter anderem Bereiche visualisieren, in denen sich die Bürger in Berlin an heißen Tagen erfrischen können.'

export const ABOUT_ACCORDION_ITEMS = [
  {
    id: 'shadows',
    title: 'Schatten',
    content: dummyParagraph,
  },
  {
    id: 'cool-areas',
    title: 'Kühle Bereiche',
    content: dummyParagraph,
  },
  {
    id: 'windy-areas',
    title: 'Windige Bereiche',
    content: dummyParagraph,
  },
  {
    id: 'places',
    title: 'Orte',
    content: dummyParagraph,
  },
]
