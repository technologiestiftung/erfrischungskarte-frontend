import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'
export interface MapRasterLayerType {
  id: string
  url: SourceProps['url']
  bounds?: SourceProps['bounds']
  minZoom?: SourceProps['minzoom']
  maxZoom?: SourceProps['maxzoom']
  opacity?: number
  isVisible?: boolean
  beforeId?: string
}

export const MapRasterLayer: FC<MapRasterLayerType> = ({
  id,
  url,
  bounds,
  minZoom,
  opacity,
  isVisible = true,
  beforeId,
}) => {
  const layerStyle: LayerProps = {
    id,
    beforeId,
    type: 'raster',
    paint: {
      'raster-opacity': opacity,
    },
    layout: {
      visibility: isVisible ? 'visible' : 'none',
    },
  }

  return (
    <Source id={id} type="raster" url={url} bounds={bounds} minzoom={minZoom}>
      <Layer {...layerStyle} />
    </Source>
  )
}
