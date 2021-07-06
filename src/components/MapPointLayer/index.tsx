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
  activePropertyKeys?: string[]
}

type ZoomThresholds = 12 | 15 | 17 | 18

type CircleSizeMapType = Map<ZoomThresholds, number>

const CircleRadiusMap: CircleSizeMapType = new Map([
  [12, 2],
  [15, 4],
  [17, 5],
  [18, 7],
])

const CircleStrokeWidthMap: CircleSizeMapType = new Map([
  [12, 1],
  [15, 4],
  [17, 5],
  [18, 7],
])

export const MapPointLayer: FC<MapPointLayerType> = ({
  id,
  tileset,
  minzoom,
  fillColorMap,
  fillColorProperty,
  activePropertyKeys,
}) => {
  const flattenedFillColorMap = Array.from(fillColorMap).flat(2)
  const flattenedCircleRadiusMap = Array.from(CircleRadiusMap).flat(2)
  const flattenedCircleStrokeWidthMap = Array.from(CircleStrokeWidthMap).flat(2)

  const filterDataIsProvided = !!activePropertyKeys

  const filteringExpression = [
    'in',
    ['get', `${fillColorProperty}`],
    ['literal', activePropertyKeys],
  ]

  const nonFilteringExpression = ['has', `${fillColorProperty}`]

  const filter = filterDataIsProvided
    ? filteringExpression
    : nonFilteringExpression

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
      'circle-radius': [
        'interpolate',
        ['exponential', 0.5],
        ['zoom'],
        ...flattenedCircleRadiusMap,
      ],
      'circle-stroke-width': [
        'interpolate',
        ['exponential', 0.5],
        ['zoom'],
        ...flattenedCircleStrokeWidthMap,
      ],
      'circle-stroke-color': '#ffffff',
    },
  }

  return (
    <Source id={id} type="vector" url={tileset.url}>
      <Layer {...layerStyle} id={id} filter={filter} />
    </Source>
  )
}
