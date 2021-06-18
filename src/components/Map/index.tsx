import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map'

interface MapProps extends InteractiveMapProps {
  initialViewportProps: Partial<ViewportProps>
  staticViewportProps?: Partial<ViewportProps>
  width: number
  height: number
  mapStyle: string
}

export const Map: FC<MapProps> = ({
  initialViewportProps,
  staticViewportProps,
  width,
  height,
  mapStyle,
  children,
  ...otherMapProps
}) => {
  const [viewport, setViewport] = useState<ViewportProps>({
    width,
    height,
    ...staticViewportProps,
    ...initialViewportProps,
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
      reuseMaps
      {...otherMapProps}
    >
      {children}
    </ReactMapGL>
  )
}
