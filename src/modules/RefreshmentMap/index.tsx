import React, { FC, useEffect, useState } from 'react'
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
import {
  MapPoiTooltip as PoiTooltip,
  MapPoiTooltipType,
} from '@components/MapPoiTooltip'
import { MapEvent } from 'react-map-gl'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useHasWebPSupport } from '@lib/hooks/useHasWebPSupport'
import { useCurrentTime } from '@lib/hooks/useCurrentTime'

interface RefreshmentMapPropType {
  title?: string
}

interface MapFeatureType {
  source: string
  properties: {
    name?: string
    category?: string
    info?: string
  }
  [key: string]: unknown
}
interface CustomMapEventType extends MapEvent {
  features: MapFeatureType[]
}

export const RefreshmentMap: FC<RefreshmentMapPropType> = (pageProps) => {
  const hasMobileSize = useHasMobileSize()
  const hasWebPSupport = useHasWebPSupport()
  const currentTime = useCurrentTime()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { pathname, query, replace: routerReplace } = useRouter()
  const mappedQuery = mapRawQueryToState(query)

  const [activeHourKey, setActiveHourKey] = useState<HourType>(
    `${mappedQuery.visibleHour || currentTime}`
  )
  const activeHour = HOURS[activeHourKey]

  useEffect(() => {
    setActiveHourKey(`${mappedQuery.visibleHour || currentTime}`)
  }, [mappedQuery.visibleHour, currentTime])

  const hourKeys = Object.keys(HOURS) as HourType[]
  const [poiTooltipContent, setPoiTooltipContent] = useState<Pick<
    MapPoiTooltipType,
    'title' | 'category' | 'info'
  > | null>(null)

  const [poiTooltipCoordinates, setPoiTooltipCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const handleHover = (e: MapEvent): void => {
    if (!e.features || !e.features.length) return

    const allHoveredFeatures = e.features as CustomMapEventType['features']

    const hoveredPoiFeatures = allHoveredFeatures.filter(
      (f) => f.source === POI_DATA.id
    )

    setPoiTooltipContent({
      title: hoveredPoiFeatures[0].properties.name || '',
      category: hoveredPoiFeatures[0].properties.category || '',
      info: hoveredPoiFeatures[0].properties.info || '',
    })

    setPoiTooltipCoordinates({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
    })
  }

  const handleMouseLeave = (): void => setPoiTooltipContent(null)

  const poiTooltipContentIsNotEmpty =
    poiTooltipContent &&
    poiTooltipContent.title !== '' &&
    poiTooltipContent.category !== ''

  return (
    <>
      {pathname === '/' && <SplashScreen />}
      <MapRoot
        mapStyle="mapbox://styles/mapbox/light-v10"
        width={windowWidth}
        height={windowHeight}
        staticViewportProps={{
          minZoom: 11.5,
          maxZoom: 18,
        }}
        initialViewportProps={{
          latitude: 52.520952,
          longitude: 13.400033,
          zoom: 12,
        }}
        interactiveLayerIds={[POI_DATA.id]}
        handleMouseLeave={handleMouseLeave}
        handleHover={handleHover}
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
        {hasWebPSupport &&
          hourKeys.map((key) => {
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
        {poiTooltipCoordinates &&
          poiTooltipContent &&
          poiTooltipContentIsNotEmpty && (
            <PoiTooltip
              coordinates={{
                latitude: poiTooltipCoordinates.latitude,
                longitude: poiTooltipCoordinates.longitude,
              }}
              title={poiTooltipContent.title}
              category={poiTooltipContent.category}
              info={poiTooltipContent.info}
            />
          )}
      </MapRoot>
      {pathname !== '/' && (
        <>
          <Sidebar {...pageProps} />
          <div
            className={classNames(
              'absolute transform z-50',
              hasMobileSize && 'right-16 bottom-24',
              !hasMobileSize && 'top-8 right-8'
            )}
          >
            <HourSelector
              activeHourKey={activeHourKey}
              onChange={(hour) => {
                void routerReplace(
                  {
                    query: { ...mappedQuery, visibleHour: hour },
                  },
                  undefined
                )
              }}
            />
          </div>
        </>
      )}
    </>
  )
}
