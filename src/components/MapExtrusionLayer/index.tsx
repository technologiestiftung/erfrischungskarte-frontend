import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'

type RequiredLayerTypes = Pick<LayerProps, 'id' | 'source'>
type RequiredSourceTypes = Pick<SourceProps, 'url'>

export interface MapExtrusionLayerType
  extends Required<RequiredLayerTypes>,
    Required<RequiredSourceTypes> {
  sourceLayer: string
  minzoom?: SourceProps['minzoom']
  extrusionProperties: {
    base: string
    height: string
  }
  extrusionColor: string
  isVisible?: boolean
}

export const MapExtrusionLayer: FC<MapExtrusionLayerType> = ({
  id,
  url,
  source,
  sourceLayer,
  minzoom,
  extrusionProperties,
  extrusionColor,
  isVisible = true,
}) => {
  return (
    <>
      <Source id={id} type="vector" url={url} />
      <Layer
        id={id}
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
        layout={{
          visibility: isVisible ? 'visible' : 'none',
        }}
      />
    </>
  )
}
