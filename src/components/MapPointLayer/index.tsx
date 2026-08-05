import { FC } from 'react'
import { Source, Layer, LayerProps, SourceProps } from 'react-map-gl'

export interface MapPointLayerType extends Omit<LayerProps, 'type' | 'paint'> {
  id: string
  tileset?: {
    url: SourceProps['url']
    layerName: string
  }
  geojsonUrls: Record<string, string>
  fillColorMap: Map<number | string, string>
  fillColorProperty: string
  activePropertyKeys?: string[]
}

type ZoomThresholds = 12 | 15 | 17 | 18

type CircleSizeMapType = Map<ZoomThresholds, number>

const CircleRadiusMap: CircleSizeMapType = new Map([
  [12, 4],
  [15, 6],
  [17, 7],
  [18, 9],
])

const CircleStrokeWidthMap: CircleSizeMapType = new Map([
  [12, 1],
  [15, 4],
  [17, 5],
  [18, 7],
])

export const MapPointLayer: FC<MapPointLayerType> = ({
  id,
  minzoom,
  geojsonUrls,
  fillColorMap,
  activePropertyKeys,
}) => {
  const flattenedCircleRadiusMap = Array.from(CircleRadiusMap).flat(2)
  const flattenedCircleStrokeWidthMap = Array.from(CircleStrokeWidthMap).flat(2)

  const categoriesToRender =
    activePropertyKeys && activePropertyKeys.length > 0
      ? activePropertyKeys
      : Object.keys(geojsonUrls)

  return (
    <>
      {categoriesToRender.map((category) => {
        const url = geojsonUrls[category]
        if (!url) return null

        return (
          <Source
            key={`${id}-${category}`}
            id={`${id}-${category}`}
            type="geojson"
            data={url}
          >
            <Layer
              id={`${id}-${category}`}
              type="circle"
              minzoom={minzoom}
              paint={{
                'circle-color':
                  fillColorMap.get(category) || 'rgba(100,100,100,100)',
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
              }}
            />
          </Source>
        )
      })}
    </>
  )
}
