import { MapFilledPolygonLayerType } from '@components/MapFilledPolygonLayer'
import colors from '../style/colors'
import { AvailableHoursType, TilesetPropertyKeyType } from './general'

/*
  Most relevant here are the fields in TEMPERATURE_DATA.tileset. These should point to the temperature vector tileset in Mapbox.

  If no temperature data exists, you can set TEMPERATURE_DATA to null. Don't forget to remove any temperature-related content such as the respective section in the About sidebar
*/
export const TEMPERATURE_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.4e9mfohk',
    layerName: 'temperature_data-5k7yue',
  },
  fillColorMap: new Map([
    [1, colors['layer-blue'][400]],
    [2, colors['layer-blue'][300]],
    [3, colors['layer-blue'][200]],
    [4, colors['layer-blue'][100]],
    [5, 'rgba(255,255,255,0)'],
  ]),
}

/*
  Each hour here should be mapped to the property key of the vector tileset features. So, if your value for 10am is called '10Uhr' this should be mirrored here.
*/
export const TEMPERATURE_HOUR_KEYS: {
  [key in AvailableHoursType]: TilesetPropertyKeyType
} = {
  '10': '10Uhr',
  '11': '11Uhr',
  '12': '12Uhr',
  '13': '13Uhr',
  '14': '14Uhr',
  '15': '15Uhr',
  '16': '16Uhr',
  '17': '17Uhr',
  '18': '18Uhr',
  '19': '19Uhr',
  '20': '20Uhr',
}
