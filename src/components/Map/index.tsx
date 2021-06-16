import { FC, ReactNode, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Controls } from '../MapControls'

export const Map: FC<{
  width: number
  height: number
  latitude: number
  longitude: number
  zoom: number
  children?: ReactNode
  isMobile: boolean
}> = ({ width, height, latitude, longitude, zoom, children, isMobile }) => {
  const [viewport, setViewport] = useState({
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
  }, [width, height])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Controls isMobile={isMobile} />
      {children}
    </ReactMapGL>
  )
}
