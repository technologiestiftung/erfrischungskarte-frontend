import React, { FC, useState } from 'react'
import { Map as MapRoot } from '@components/Map'
import { Sidebar } from '@components/Sidebar'
import { MapFilledPolygonLayer as FilledPolygonLayer } from '@components/MapFilledPolygonLayer'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { MapControls } from '@components/MapControls'
import { WIND_DATA, WIND_HOUR_KEYS } from '@content/wind'
import { TEMPERATURE_DATA, TEMPERATURE_HOUR_KEYS } from '@content/temperature'
import { POI_DATA, POI_CATEGORY_ID_MAP } from '@content/pois'
import { SHADE_TILESETS } from '@content/shade'
import {
  AvailableHoursType,
  HOURS,
  MAP_CONFIG,
  EXTRUDED_BUILDINGS_DATA,
} from '@content/general'
import { MapRasterLayer as RasterLayer } from '@components/MapRasterLayer'
import { MapExtrusionLayer as ExtrusionLayer } from '@components/MapExtrusionLayer'
import { MapPointLayer } from '@components/MapPointLayer'
import { HourSelector } from '@components/HourSelector'
import { useRouter } from 'next/router'
import { SplashScreen } from './../../components/SplashScreen'
import {
  MapPoiTooltip as PoiTooltip,
  MapPoiTooltipType,
} from '@components/MapPoiTooltip'
import { MapEvent } from 'react-map-gl'
import { mapRawQueryToState, PageQueryType } from '@lib/utils/queryUtil'
import { AppTitle } from '@components/AppTitle'
import { useHasWebPSupport } from '@lib/hooks/useHasWebPSupport'
import { SharingOverlay } from '@components/SharingOverlay'
import { useCurrentTime } from '@lib/hooks/useCurrentTime'
import { DisclaimerLinks } from '@components/DisclaimerLinks'

interface RefreshmentMapPropType {
  title?: string
  query: Partial<PageQueryType>
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

  const { pathname, query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)

  const hourKeys = Object.keys(HOURS) as AvailableHoursType[]

  const activeHourKey = `${
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    mappedQuery.visibleHour || currentTime
  }` as keyof typeof SHADE_TILESETS
  const activeHour =
    hourKeys.find((hour) => hour === activeHourKey) || hourKeys[0]

  const [poiTooltipContent, setPoiTooltipContent] = useState<Pick<
    MapPoiTooltipType,
    'title' | 'category' | 'info'
  > | null>(null)

  const [poiTooltipCoordinates, setPoiTooltipCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const handleHover = (e: MapEvent): void => {
    if (!POI_DATA || !e.features || !e.features.length) return

    const allHoveredFeatures = e.features as CustomMapEventType['features']

    const hoveredPoiFeatures = allHoveredFeatures.filter(
      (f) => f.source === POI_DATA?.id
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

  const activeCategories = mappedQuery.places
    ?.map(
      (poiId) =>
        Object.entries(POI_CATEGORY_ID_MAP).find(
          ([, id]) => id === poiId
        )?.[0] || ''
    )
    .filter(Boolean)

  return (
    <>
      {(pathname === '/map' || pathname === '/social-image') && <AppTitle />}
      {pathname === '/' && <SplashScreen />}
      <MapRoot
        mapStyle="mapbox://styles/mapbox/light-v10"
        staticViewportProps={{
          minZoom: MAP_CONFIG.minZoom,
          maxZoom: MAP_CONFIG.maxZoom,
        }}
        initialViewportProps={{
          latitude: pageProps.query.latitude || MAP_CONFIG.defaultLatitude,
          longitude: pageProps.query.longitude || MAP_CONFIG.defaultLongitude,
          zoom: pageProps.query.zoom || MAP_CONFIG.defaultZoom,
        }}
        interactiveLayerIds={POI_DATA ? [POI_DATA.id] : []}
        handleMouseLeave={handleMouseLeave}
        handleHover={handleHover}
      >
        {pathname !== '/' && pathname !== '/social-image' && (
          <>
            <MapControls
              className={`absolute right-4 ${
                hasMobileSize ? 'top-4' : 'bottom-4'
              }`}
            />
          </>
        )}
        {WIND_DATA && (
          <FilledPolygonLayer
            {...WIND_DATA}
            fillColorProperty={WIND_HOUR_KEYS[activeHour]}
            isVisible={mappedQuery.showWind !== false}
          />
        )}
        {TEMPERATURE_DATA && (
          <FilledPolygonLayer
            {...TEMPERATURE_DATA}
            fillColorProperty={TEMPERATURE_HOUR_KEYS[activeHour]}
            isVisible={mappedQuery.showTemperature !== false}
          />
        )}
        {hasWebPSupport &&
          hourKeys.map((key) => {
            return (
              SHADE_TILESETS && (
                <RasterLayer
                  key={`shade-${key}`}
                  id={`shade-${key}`}
                  url={SHADE_TILESETS[key]}
                  bounds={[13.06, 52.33, 13.77, 52.69]}
                  minZoom={MAP_CONFIG.defaultZoom}
                  opacity={key !== activeHourKey ? 0 : 0.5}
                  isVisible={mappedQuery.showShadows !== false}
                  beforeId={EXTRUDED_BUILDINGS_DATA?.id}
                />
              )
            )
          })}
        {EXTRUDED_BUILDINGS_DATA && (
          <ExtrusionLayer {...EXTRUDED_BUILDINGS_DATA} minzoom={15.5} />
        )}
        {POI_DATA && (
          <MapPointLayer
            {...POI_DATA}
            activePropertyKeys={activeCategories}
            minzoom={MAP_CONFIG.minZoom}
          />
        )}
        {POI_DATA &&
          poiTooltipCoordinates &&
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
      {pathname !== '/' && pathname !== '/social-image' && (
        <>
          <DisclaimerLinks
            className={pathname !== '/map' && hasMobileSize ? 'hidden' : ''}
          />
          <SharingOverlay />
          <Sidebar {...pageProps} />
          <HourSelector activeHourKey={activeHourKey} />
        </>
      )}
    </>
  )
}
