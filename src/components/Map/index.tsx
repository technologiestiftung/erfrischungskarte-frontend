import { FC, ReactNode } from 'react'
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Map: FC<{
  width?: number
  height?: number
  children?: ReactNode
}> = ({ width = 800, height = 500, children }) => {
  const [viewport, setViewport] = useState({
    width,
    height,
    latitude: 52.520952,
    longitude: 13.400033,
    zoom: 13,
  })

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {children}
    </ReactMapGL>
  )
}
