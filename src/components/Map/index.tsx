import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Map: FC<ViewportProps> = ({
  width,
  height,
  latitude,
  longitude,
  zoom,
  children,
  ...otherViewportProps
}) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    width,
    height,
    latitude,
    longitude,
    zoom,
    ...otherViewportProps,
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
      onViewportChange={(nextViewport: ViewportProps) =>
        setViewport(nextViewport)
      }
    >
      {children}
    </ReactMapGL>
  )
}
