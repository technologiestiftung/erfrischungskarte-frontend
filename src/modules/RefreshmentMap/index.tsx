import React, { FC, useState } from 'react'
import { Map as MapRoot } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { MapFilledPolygonLayer as FilledPolygonLayer } from '@components/MapFilledPolygonLayer'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import { HOURS, TEMPERATURE_DATA, WIND_DATA } from './content'
import { isMobile } from 'react-device-detect'
import { MapControls } from '../../components/MapControls'

interface RefreshmentMapPropType {
  title?: string
}

export const RefreshmentMap: FC<RefreshmentMapPropType> = (pageProps) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [activeHour, setActiveHour] = useState(HOURS[0].vectorTilesetId)

  return (
    <>
      <MapRoot
        width={windowWidth}
        height={windowHeight}
        latitude={52.520952}
        longitude={13.400033}
        zoom={13}
      >
        <MapControls
          className={`absolute right-4 ${isMobile ? 'top-4' : 'bottom-4'}`}
        />
        <FilledPolygonLayer {...WIND_DATA} fillColorProperty={activeHour} />
        <FilledPolygonLayer
          {...TEMPERATURE_DATA}
          fillColorProperty={activeHour}
        />
      </MapRoot>
      <Sidebar {...pageProps} />
      {
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select
          name="hours"
          id="hour-select"
          className="bg-white shadow fixed top-4 right-4"
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
    </>
  )
}
