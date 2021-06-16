import React, { FC, useState } from 'react'
import { FullScreenMapWrapper } from '../../layouts/FullScreenMapWrapper'
import { Map as MapRoot } from '../../components/Map'
import { MapFilledPolygonLayer as FilledPolygonLayer } from '../../components/MapFilledPolygonLayer'
import { useWindowSize } from '../../lib/hooks/useWindowSize'
import { HOURS, TEMPERATURE_DATA, WIND_DATA } from './content'
import { isMobile } from 'react-device-detect'

export const RefreshmentMap: FC = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [activeHour, setActiveHour] = useState(HOURS[0].vectorTilesetId)

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
    >
      <MapRoot
        width={windowWidth}
        height={windowHeight}
        latitude={52.520952}
        longitude={13.400033}
        zoom={13}
        isMobile={isMobile}
      >
        <FilledPolygonLayer {...WIND_DATA} fillColorProperty={activeHour} />
        <FilledPolygonLayer
          {...TEMPERATURE_DATA}
          fillColorProperty={activeHour}
        />
      </MapRoot>
    </FullScreenMapWrapper>
  )
}
