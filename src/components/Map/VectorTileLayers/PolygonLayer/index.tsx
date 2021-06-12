import { FC } from 'react'
import { Source, Layer, LayerProps } from 'react-map-gl'

export interface PolygonLayerType {
  id: string
  tileset: {
    url: string
    layerName: string
  }
  fillColorMap: Map<number | string, string>
  fillColorProperty: string
}

export const PolygonLayer: FC<PolygonLayerType> = ({
  id,
  tileset,
  fillColorMap,
  fillColorProperty,
}) => {
  const flattenedFillColorMap = Array.from(fillColorMap).flat(2)

  const layerStyle: LayerProps = {
    id: id,
    type: 'fill',
    'source-layer': tileset.layerName,
    paint: {
      'fill-color': [
        'match',
        ['get', `${fillColorProperty}`],
        ...flattenedFillColorMap,
        /* fallback color */
        '#fff',
      ],
      'fill-opacity': 0.5,
    },
  }

  return (
    <Source id={id} type="vector" url={tileset.url}>
      <Layer {...layerStyle} />
    </Source>
  )
}
