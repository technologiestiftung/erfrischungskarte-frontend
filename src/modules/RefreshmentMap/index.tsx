import React, { FC, useState } from 'react'
import { Map as MapRoot } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { MapFilledPolygonLayer as FilledPolygonLayer } from '@components/MapFilledPolygonLayer'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { MapControls } from '@components/MapControls'
import {
  EXTRUDED_BUILDINGS_DATA,
  HOURS,
  TEMPERATURE_DATA,
  WIND_DATA,
  POI_DATA,
} from './content'
import { MapRasterLayer as RasterLayer } from '../../components/MapRasterLayer'
import { MapExtrusionLayer as ExtrusionLayer } from '../../components/MapExtrusionLayer'
import { MapPointLayer } from '@components/MapPointLayer'
import { useRouter } from 'next/router'
import { SplashScreen } from './../../components/SplashScreen'

interface RefreshmentMapPropType {
  title?: string
}

export const RefreshmentMap: FC<RefreshmentMapPropType> = (pageProps) => {
  const hasMobileSize = useHasMobileSize()
  const { pathname } = useRouter()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [activeHour, setActiveHour] = useState(HOURS['10'])

  return (
    <>
      {pathname === '/' && <SplashScreen />}
      <MapRoot
        mapStyle="mapbox://styles/mapbox/light-v10"
        width={windowWidth}
        height={windowHeight}
        latitude={52.520952}
        longitude={13.400033}
        zoom={12}
        minZoom={11.5}
        maxZoom={18}
      >
        {pathname !== '/' && (
          <MapControls
            className={`absolute right-4 ${
              hasMobileSize ? 'top-4' : 'bottom-4'
            }`}
          />
        )}
        <FilledPolygonLayer
          {...WIND_DATA}
          fillColorProperty={activeHour.vectorTilesetKey}
        />
        <FilledPolygonLayer
          {...TEMPERATURE_DATA}
          fillColorProperty={activeHour.vectorTilesetKey}
        />
        <RasterLayer
          id="shade-data"
          url={activeHour.shadeTilesetId}
          bounds={[13.06, 52.33, 13.77, 52.69]}
          minZoom={14}
          opacity={0.5}
        />
        <ExtrusionLayer {...EXTRUDED_BUILDINGS_DATA} />
        <MapPointLayer {...POI_DATA} />
      </MapRoot>
      {pathname !== '/' && (
        <>
          <Sidebar {...pageProps} />
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            name="hours"
            id="hour-select"
            className="bg-white shadow fixed top-4 right-4"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={(e) => setActiveHour(HOURS[e.target.value])}
          >
            {Object.entries(HOURS).map(([key, info]) => {
              return (
                <option key={key} value={key}>
                  {info.displayName}
                </option>
              )
            })}
          </select>
        </>
      )}
    </>
  )
}
