import { FC, useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, { ViewportProps, MapEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map'

interface MapProps extends InteractiveMapProps {
  initialViewportProps: Partial<ViewportProps>
  staticViewportProps?: Partial<ViewportProps>
  width: number
  height: number
  mapStyle?: string
  handleHover?: (event: MapEvent) => void
  handleMouseLeave?: (event: MapEvent) => void
}

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
