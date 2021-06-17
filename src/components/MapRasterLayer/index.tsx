import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'
export interface MapRasterLayerType {
  id: string
  url: SourceProps['url']
  bounds?: SourceProps['bounds']
  minZoom?: SourceProps['minzoom']
  maxZoom?: SourceProps['maxzoom']
  opacity?: number
}

export const MapRasterLayer: FC<MapRasterLayerType> = ({
  id,
  url,
  bounds,
  minZoom,
  opacity,
}) => {
  const layerStyle: LayerProps = {
    id: id,
    type: 'raster',
    paint: {
      'raster-opacity': opacity,
    },
  }

  return (
    <Source id={id} type="raster" url={url} bounds={bounds} minzoom={minZoom}>
      <Layer {...layerStyle} />
    </Source>
  )
}
