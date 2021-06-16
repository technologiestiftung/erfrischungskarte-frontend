import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapControls } from '../MapControls'

interface ViewportType {
  width: number
  height: number
  latitude: number
  longitude: number
  zoom: number
}

interface MapProps extends ViewportType {
  isMobile: boolean
}

export const Map: FC<MapProps> = ({
  width,
  height,
  latitude,
  longitude,
  zoom,
  children,
  isMobile,
}) => {
  const [viewport, setViewport] = useState<ViewportType>({
    width,
    height,
    latitude,
    longitude,
    zoom,
  })

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
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport: ViewportType) =>
        setViewport(nextViewport)
      }
    >
      <MapControls isMobile={isMobile} />
      {children}
    </ReactMapGL>
  )
}
