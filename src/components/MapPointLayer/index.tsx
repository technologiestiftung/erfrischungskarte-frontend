import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'

export interface MapPointLayerType extends Omit<LayerProps, 'type' | 'paint'> {
  id: SourceProps['id']
  tileset: {
    url: SourceProps['url']
    layerName: string
  }
  fillColorMap: Map<number | string, string>
  fillColorProperty: string
}

export const MapPointLayer: FC<MapPointLayerType> = ({
  id,
  tileset,
  minzoom,
  fillColorMap,
  fillColorProperty,
}) => {
  const flattenedFillColorMap = Array.from(fillColorMap).flat(2)

  const layerStyle: LayerProps = {
    id: id,
    type: 'circle',
    'source-layer': tileset.layerName,
    minzoom: minzoom,
    paint: {
      'circle-color': [
        'match',
        ['get', `${fillColorProperty}`],
        ...flattenedFillColorMap,
        /* fallback color */
        'rgba(100,100,100,100)',
      ],
      'circle-radius': 6,
      'circle-stroke-width': 6,
      'circle-stroke-color': '#ffffff',
    },
  }

  return (
    <Source id={id} type="vector" url={tileset.url}>
      <Layer {...layerStyle} />
    </Source>
  )
}
