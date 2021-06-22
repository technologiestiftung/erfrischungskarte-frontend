import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { mapRawQueryToState } from '@lib/utils/queryUtil'

interface MapProps extends ViewportProps {
  mapStyle?: string
  initialLatitude: number
  initialLongitude: number
  initialZoom: number
}

type URLViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>

export const Map: FC<MapProps> = ({
  width,
  height,
  initialLatitude,
  initialLongitude,
  initialZoom,
  mapStyle,
  children,
  ...otherViewportProps
}) => {
  const { pathname, query, replace } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const [viewport, setViewport] = useState<ViewportProps>({
    width,
    height,
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoom,
    ...otherViewportProps,
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
      latitude: mappedQuery.latitude || viewport.latitude,
      longitude: mappedQuery.longitude || viewport.longitude,
      zoom: mappedQuery.zoom || viewport.zoom,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedQuery.latitude, mappedQuery.longitude, mappedQuery.zoom])

  useEffect(() => {
    setViewport({
      ...viewport,
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
      reuseMaps
    >
      {children}
    </ReactMapGL>
  )
}
