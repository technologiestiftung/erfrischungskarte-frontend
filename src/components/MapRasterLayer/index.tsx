import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'
export interface MapRasterLayerType {
  id: string
  beforeId?: string
  url: SourceProps['url']
  bounds?: SourceProps['bounds']
  minZoom?: SourceProps['minzoom']
  maxZoom?: SourceProps['maxzoom']
  opacity?: number
}

export const MapRasterLayer: FC<MapRasterLayerType> = ({
  id,
  beforeId,
  url,
  bounds,
  minZoom,
  opacity,
}) => {
  const layerStyle: LayerProps = {
    id,
    beforeId,
    type: 'raster',
    paint: {
      'raster-opacity': opacity,
    },
  }

  return (
    <Source id={id} type="raster" url={url} bounds={bounds} minzoom={minZoom}>
      <Layer {...layerStyle} id={id} />
    </Source>
  )
}
