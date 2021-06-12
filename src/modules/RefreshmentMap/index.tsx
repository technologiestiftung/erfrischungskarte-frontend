import { FC } from 'react'
import { Map as MapRoot } from '../../components/Map'
import {
  PolygonLayer,
  PolygonLayerType,
} from '../../components/Map/VectorTileLayers'

const WIND_DATA: PolygonLayerType = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.9s5puknr',
    layerName: 'wind_data-221dgh',
  },
  fillColorProperty: '9Uhr',
  fillColorMap: new Map([
    [1, 'rgba(0,68,27,100)'],
    [2, 'rgba(42,146,74,100)'],
    [3, 'rgba(123,200,124,100)'],
    [4, 'rgba(202,234,195,100)'],
    [5, 'rgba(255,255,255,0)'],
  ]),
}

const TEMPERATURE_DATA: PolygonLayerType = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1ejpa7pd',
    layerName: 'temperature_data-11wkut',
  },
  fillColorProperty: '9Uhr',
  fillColorMap: new Map([
    [1, 'rgba(8,48,107,100)'],
    [2, 'rgba(40,121,185,100)'],
    [3, 'rgba(115,179,216,100)'],
    [4, 'rgba(200,221,240,100)'],
    [5, 'rgba(255,255,255,0)'],
  ]),
}

export const RefreshmentMap: FC = () => {
  return (
    <MapRoot>
      <PolygonLayer {...WIND_DATA} />
      <PolygonLayer {...TEMPERATURE_DATA} />
    </MapRoot>
  )
}
