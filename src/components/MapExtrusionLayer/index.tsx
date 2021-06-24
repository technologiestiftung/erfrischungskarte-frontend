import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'

type RequiredLayerTypes = Pick<LayerProps, 'id' | 'source'>
type RequiredSourceTypes = Pick<SourceProps, 'url' | 'minzoom'>

export interface MapExtrusionLayerType
  extends Required<RequiredLayerTypes>,
    Required<RequiredSourceTypes> {
  sourceLayer: string
  beforeId?: string
  extrusionProperties: {
    base: string
    height: string
  }
  extrusionColor: string
}

export const MapExtrusionLayer: FC<MapExtrusionLayerType> = ({
  id,
  beforeId,
  url,
  source,
  sourceLayer,
  minzoom,
  extrusionProperties,
  extrusionColor,
}) => {
  return (
    <>
      <Source id={id} type="vector" url={url} />
      <Layer
        id={id}
        beforeId={beforeId}
        type="fill-extrusion"
        source={source}
        source-layer={sourceLayer}
        minzoom={minzoom}
        paint={{
          'fill-extrusion-color': extrusionColor,
          'fill-extrusion-height': ['get', extrusionProperties.height],
          'fill-extrusion-base': ['get', extrusionProperties.base],
          'fill-extrusion-opacity': 1,
        }}
      />
    </>
  )
}
