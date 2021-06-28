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
  POI_CATEGORY_ID_MAP,
} from './content'
import { MapRasterLayer as RasterLayer } from '../../components/MapRasterLayer'
import { MapExtrusionLayer as ExtrusionLayer } from '../../components/MapExtrusionLayer'
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
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { pathname, query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)

  const activeHourKey = `${
    mappedQuery.visibleHour || currentTime
  }` as keyof typeof HOURS
  const activeHour = HOURS[activeHourKey]

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
        width={windowWidth}
        height={windowHeight}
        staticViewportProps={{
          minZoom: 11.5,
          maxZoom: 18,
        }}
        initialViewportProps={{
          latitude: pageProps.query.latitude || 52.520952,
          longitude: pageProps.query.longitude || 13.400033,
          zoom: pageProps.query.zoom || 12,
        }}
        interactiveLayerIds={[POI_DATA.id]}
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
        {mappedQuery.showWind !== false && (
          <FilledPolygonLayer
            {...WIND_DATA}
            fillColorProperty={activeHour.vectorTilesetKey}
          />
        )}
        {mappedQuery.showTemperature !== false && (
          <FilledPolygonLayer
            {...TEMPERATURE_DATA}
            fillColorProperty={activeHour.vectorTilesetKey}
          />
        )}
        {hasWebPSupport &&
          mappedQuery.showShadows !== false &&
          hourKeys.map((key) => (
            <RasterLayer
              key={`shade-${key}`}
              id={`shade-${key}`}
              url={HOURS[key].shadeTilesetId}
              bounds={[13.06, 52.33, 13.77, 52.69]}
              minZoom={14}
              opacity={key !== activeHourKey ? 0 : 0.5}
            />
          ))}
        <ExtrusionLayer {...EXTRUDED_BUILDINGS_DATA} />
        <MapPointLayer {...POI_DATA} activePropertyKeys={activeCategories} />
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
