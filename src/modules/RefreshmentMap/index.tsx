import React, { FC, useState } from 'react'
import { FullScreenMapWrapper } from '../../layouts/FullScreenMapWrapper'
import { Map as MapRoot } from '../../components/Map'
import { PolygonLayer } from '../../components/Map/VectorTileLayers'
import { useWindowSize } from '../../lib/hooks/useWindowSize'
import { HOURS, TEMPERATURE_DATA, WIND_DATA } from './content'

export const RefreshmentMap: FC = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [activeHour, setActiveHour] = useState(HOURS[0].vectorTilesetId)

  return (
    <FullScreenMapWrapper
      topLeft={<div className="bg-white shadow">Top left placeholder</div>}
      topRight={
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select
          name="hours"
          id="hour-select"
          className="bg-white shadow"
          onChange={(e) => setActiveHour(e.target.value)}
        >
          {HOURS.map((hour) => {
            return (
              <option key={hour.id} value={hour.vectorTilesetId}>
                {hour.vectorTilesetId}
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
      <MapRoot
        width={windowWidth}
        height={windowHeight}
        latitude={52.520952}
        longitude={13.400033}
        zoom={13}
      >
        <PolygonLayer {...WIND_DATA} fillColorProperty={activeHour} />
        <PolygonLayer {...TEMPERATURE_DATA} fillColorProperty={activeHour} />
      </MapRoot>
    </FullScreenMapWrapper>
  )
}
