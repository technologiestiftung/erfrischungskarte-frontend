import { FC } from 'react'
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'

export const Map: FC<{ width?: number; height?: number }> = ({
  width = 800,
  height = 500,
}) => {
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
    ></ReactMapGL>
  )
}
