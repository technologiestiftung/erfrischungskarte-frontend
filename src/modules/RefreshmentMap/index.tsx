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
    [1, '#ffffff'],
    [2, '#CAEAC3'],
    [3, '#7BC87C'],
    [4, '#2A924A'],
    [5, '#00441B'],
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
    [1, '#ffffff'],
    [2, '#C8DDF0'],
    [3, '#73B3D8'],
    [4, '#2879B9'],
    [5, '#08306B'],
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
