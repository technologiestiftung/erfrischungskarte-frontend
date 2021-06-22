import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps, MapEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map'
import { FlyToInterpolator } from 'react-map-gl'

interface MapProps extends InteractiveMapProps {
  initialViewportProps: Partial<ViewportProps>
  staticViewportProps?: Partial<ViewportProps>
  width: number
  height: number
  mapStyle?: string
  handleHover?: (event: MapEvent) => void
  handleMouseLeave?: (event: MapEvent) => void
}

type URLViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>

export const Map: FC<MapProps> = ({
  initialViewportProps,
  staticViewportProps,
  width,
  height,
  mapStyle,
  interactiveLayerIds,
  handleHover,
  handleMouseLeave,
  children,
  ...otherMapProps
}) => {
  const { pathname, query, replace } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const transitionProps = {
    transitionDuration: 2000,
    transitionEasing: (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    transitionInterpolator: new FlyToInterpolator(),
  }
  const [viewport, setViewport] = useState<ViewportProps>({
    width,
    height,
    ...staticViewportProps,
    ...initialViewportProps,
  })

  const debouncedViewportChange = useDebouncedCallback(
    (viewport: URLViewportType): void => {
      const newQuery = { ...mappedQuery, ...viewport }
      void replace({ pathname, query: newQuery }, undefined, { shallow: true })
    },
    1000
  )

  useEffect(() => {
    setViewport({
      ...viewport,
      ...transitionProps,
      latitude: mappedQuery.latitude || viewport.latitude,
      longitude: mappedQuery.longitude || viewport.longitude,
      zoom: mappedQuery.zoom || viewport.zoom,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedQuery.latitude, mappedQuery.longitude, mappedQuery.zoom])

  useEffect(() => {
    setViewport({
      ...viewport,
      ...transitionProps,
      width,
      height,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={mapStyle}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport: ViewportProps) => {
        setViewport(nextViewport)
        debouncedViewportChange({
          latitude: nextViewport.latitude,
          longitude: nextViewport.longitude,
          zoom: nextViewport.zoom,
        })
      }}
      interactiveLayerIds={interactiveLayerIds}
      onHover={handleHover}
      onMouseLeave={handleMouseLeave}
      reuseMaps
      {...otherMapProps}
    >
      {children}
    </ReactMapGL>
  )
}
