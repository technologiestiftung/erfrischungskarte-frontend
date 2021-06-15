import { FC, useState } from 'react'
import { FullScreenMapWrapper } from '../../layouts/FullScreenMapWrapper'
import { Map as MapRoot } from '../../components/Map'
import {
  PolygonLayer,
  PolygonLayerType,
} from '../../components/Map/VectorTileLayers'
import { TilesetFeatureKeys } from './RefreshmentMap.types'

export const RefreshmentMap: FC = () => {
  const HOUR_KEYS: TilesetFeatureKeys[] = [
    '9Uhr',
    '10Uhr',
    '11Uhr',
    '12Uhr',
    '13Uhr',
    '14Uhr',
    '15Uhr',
    '16Uhr',
    '17Uhr',
    '18Uhr',
    '19Uhr',
    '20Uhr',
    '21Uhr',
  ]

  const [activeHour, setActiveHour] = useState(HOUR_KEYS[0])

  const WIND_DATA: PolygonLayerType = {
    id: 'wind-data',
    tileset: {
      url: 'mapbox://technologiestiftung.9s5puknr',
      layerName: 'wind_data-221dgh',
    },
    fillColorProperty: activeHour,
    fillColorMap: new Map([
      // Note: the mapping here is different than the one for the temperature data.
      [5, 'rgba(0,68,27,100)'],
      [4, 'rgba(42,146,74,100)'],
      [3, 'rgba(123,200,124,100)'],
      [2, 'rgba(202,234,195,100)'],
      [1, 'rgba(255,255,255,0)'],
    ]),
  }

  const TEMPERATURE_DATA: PolygonLayerType = {
    id: 'temperature-data',
    tileset: {
      url: 'mapbox://technologiestiftung.1ejpa7pd',
      layerName: 'temperature_data-11wkut',
    },
    fillColorProperty: activeHour,
    fillColorMap: new Map([
      [1, 'rgba(8,48,107,100)'],
      [2, 'rgba(40,121,185,100)'],
      [3, 'rgba(115,179,216,100)'],
      [4, 'rgba(200,221,240,100)'],
      [5, 'rgba(255,255,255,0)'],
    ]),
  }

  return (
    <FullScreenMapWrapper
      topLeft={<div className="bg-white shadow">Top left placeholder</div>}
      topRight={
        <select
          name="hours"
          id="hour-select"
          className="bg-white shadow"
          // Just a placeholder, so ts-ignored for now:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={(e) => setActiveHour(e.target.value)}
        >
          {HOUR_KEYS.map((hourKey) => {
            return (
              <option key={hourKey} value={hourKey}>
                {hourKey}
              </option>
            )
          })}
        </select>
      }
      bottomLeft={
        <div className="bg-white shadow">Bottom left placeholder</div>
      }
      bottomRight={
        <div className="bg-white shadow">Bottom right placeholder</div>
      }
    >
      <MapRoot>
        <PolygonLayer {...WIND_DATA} />
        <PolygonLayer {...TEMPERATURE_DATA} />
      </MapRoot>
    </FullScreenMapWrapper>
  )
}
