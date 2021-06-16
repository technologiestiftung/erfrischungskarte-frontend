import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface MapProps extends ViewportProps {
  mapStyle: string
}

export const Map: FC<MapProps> = ({
  width,
  height,
  latitude,
  longitude,
  zoom,
  mapStyle,
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
      mapStyle={mapStyle}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport: ViewportProps) =>
        setViewport(nextViewport)
      }
    >
      {children}
    </ReactMapGL>
  )
}
