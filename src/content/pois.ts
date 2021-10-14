import { MapPointLayerType } from '@components/MapPointLayer'
import colors from '../style/colors'

export type PoiCategory =
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

export const POI_CATEGORY_COLOR_MAP: Map<PoiCategory, string> = new Map([
  ['Badestelle', colors['poi-darkblue']],
  ['Strandbad', colors['poi-darkblue']],
  ['Freibad', colors['poi-darkblue']],
  ['Schwimmhalle', colors['poi-darkblue']],
  ['Wasserspielplatz', colors['poi-pink']],
  ['Trinkbrunnen', colors['poi-lightblue']],
  ['Brunnen', colors['poi-turquoise']],
  ['Gruenanlage', colors['poi-green']],
  ['Sitzbank', colors['poi-yellow']],
  ['Picknicktisch', colors['poi-red']],
])

export interface PoiDataType extends MapPointLayerType {
  id: string
  fillColorMap: Map<PoiCategory, string>
  activePropertyKeys: Partial<PoiCategory>[]
}

type PoiCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const POI_CATEGORY_ID_MAP: { [key in PoiCategory]: PoiCategoryId } = {
  Badestelle: 1,
  Strandbad: 2,
  Freibad: 3,
  Schwimmhalle: 4,
  Wasserspielplatz: 5,
  Trinkbrunnen: 6,
  Brunnen: 7,
  Gruenanlage: 8,
  Sitzbank: 9,
  Picknicktisch: 10,
}

/*
  If you have POI data, you can set it here. The POI data is a Mapbox vector tileset, derived from a Point-based GeoJSON. The fillColorProperty has to be set to the feature property that you want to sort your POIs by, e.g. by the key 'category'. Currently, we have the properties 'id', 'category' and 'name'.
  
  If you don't have any POIs, set POI_DATA to null. Remember to also remove any other POI-related content in that case.
*/
export const POI_DATA: PoiDataType | null = {
  id: 'poi-data',
  tileset: {
    url: 'mapbox://technologiestiftung.a9f6qix2',
    layerName: 'erfrischungskarte_poi-0mftmq',
  },
  fillColorProperty: 'category',
  fillColorMap: POI_CATEGORY_COLOR_MAP,
  activePropertyKeys: [
    'Badestelle',
    'Strandbad',
    'Freibad',
    'Schwimmhalle',
    'Wasserspielplatz',
    'Trinkbrunnen',
    'Brunnen',
    'Gruenanlage',
    'Sitzbank',
    'Picknicktisch',
  ],
}
