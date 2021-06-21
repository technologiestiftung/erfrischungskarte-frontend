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
  HourType,
} from './content'
import { MapRasterLayer as RasterLayer } from '../../components/MapRasterLayer'
import { MapExtrusionLayer as ExtrusionLayer } from '../../components/MapExtrusionLayer'
import { MapPointLayer } from '@components/MapPointLayer'
import { HourSelector } from '@components/HourSelector'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { SplashScreen } from './../../components/SplashScreen'

interface RefreshmentMapPropType {
  title?: string
}

export const RefreshmentMap: FC<RefreshmentMapPropType> = (pageProps) => {
  const hasMobileSize = useHasMobileSize()
  const { pathname } = useRouter()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [activeHourKey, setActiveHourKey] = useState<HourType>('10')
  const activeHour = HOURS[activeHourKey]

  const hourKeys = Object.keys(HOURS) as HourType[]

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
        {hourKeys.map((key) => {
          const item = HOURS[key]
          if (key !== activeHourKey) {
            return (
              <RasterLayer
                key={`shade-${key}`}
                id={`shade-${key}`}
                url={item.shadeTilesetId}
                bounds={[13.06, 52.33, 13.77, 52.69]}
                minZoom={14}
                opacity={0}
              />
            )
          }
          return (
            <RasterLayer
              key={`shade-${key}`}
              id={`shade-${key}`}
              url={item.shadeTilesetId}
              bounds={[13.06, 52.33, 13.77, 52.69]}
              minZoom={14}
              opacity={0.5}
            />
          )
        })}
        <ExtrusionLayer {...EXTRUDED_BUILDINGS_DATA} />
        <MapPointLayer {...POI_DATA} />
      </MapRoot>
      {pathname !== '/' && (
        <>
          <Sidebar {...pageProps} />
          <div
            className={classNames(
              'absolute transform z-50 pointer-events-none',
              hasMobileSize && 'right-16 bottom-24',
              !hasMobileSize && 'top-8 right-8'
            )}
          >
            <HourSelector
              activeHourKey={activeHourKey}
              onChange={setActiveHourKey}
            />
          </div>
        </>
      )}
    </>
  )
}
