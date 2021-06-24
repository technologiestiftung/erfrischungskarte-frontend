import { FC } from 'react'
import { Source, Layer, LayerProps } from 'react-map-gl'
export interface MapFilledPolygonLayerType {
  id: string
  beforeId?: string
  tileset: {
    url: string
    layerName: string
  }
  fillColorMap: Map<number | string, string>
  fillColorProperty: string
}

export const MapFilledPolygonLayer: FC<MapFilledPolygonLayerType> = ({
  id,
  beforeId,
  tileset,
  fillColorMap,
  fillColorProperty,
}) => {
  const flattenedFillColorMap = Array.from(fillColorMap).flat(2)

  const layerStyle: LayerProps = {
    id,
    beforeId,
    type: 'fill',
    'source-layer': tileset.layerName,
    paint: {
      'fill-color': [
        'match',
        ['get', `${fillColorProperty}`],
        ...flattenedFillColorMap,
        /* fallback color (transparent) */
        'rgba(255,255,255,0)',
      ],
      'fill-opacity': 0.5,
    },
  }

  return (
    <Source id={id} type="vector" url={tileset.url}>
      <Layer {...layerStyle} id={id} />
    </Source>
  )
}
