import { TemperatureIcon, WindIcon, ShadeIcon } from '@components/Icons'
import { LayerLegendBlockType } from '@components/LayerLegendBlock'
import classNames from 'classnames'
import { MapExtrusionLayerType } from '../components/MapExtrusionLayer'
import { MapFilledPolygonLayerType } from '../components/MapFilledPolygonLayer'
import colors from '../style/colors'
import { LayerLegendFigure } from '@components/LayerLegendFigure'
import Image from 'next/image'
import shadeImage from '../../public/images/shade-legend.png'

export * from './generics'
export * from './about'

export const WIND_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'wind-data',
  tileset: {
    url: 'mapbox://technologiestiftung.1hrk87mv',
    layerName: 'wind_data-dgvmuc',
  },
  fillColorMap: new Map([
    // Note: the mapping here is different than the one for the temperature data.
    [5, colors['layer-green'][400]],
    [4, colors['layer-green'][300]],
    [3, colors['layer-green'][200]],
    [2, colors['layer-green'][100]],
    [1, 'rgba(255,255,255,0)'],
  ]),
}

export const TEMPERATURE_DATA: Pick<
  MapFilledPolygonLayerType,
  'id' | 'tileset' | 'fillColorMap'
> = {
  id: 'temperature-data',
  tileset: {
    url: 'mapbox://technologiestiftung.4e9mfohk',
    layerName: 'temperature_data-5k7yue',
  },
  fillColorMap: new Map([
    [1, colors['layer-blue'][400]],
    [2, colors['layer-blue'][300]],
    [3, colors['layer-blue'][200]],
    [4, colors['layer-blue'][100]],
    [5, 'rgba(255,255,255,0)'],
  ]),
}

export const EXTRUDED_BUILDINGS_DATA: MapExtrusionLayerType = {
  id: '3d-buildings',
  url: 'mapbox://mapbox.mapbox-streets-v8',
  source: 'composite',
  sourceLayer: 'building',
  extrusionProperties: {
    base: 'min_height',
    height: 'height',
  },
  extrusionColor: '#ddd',
}

const maxShadeLabel = (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-[#808080] rounded-full"></div>
    <span className="ml-1">Schattig</span>
  </div>
)

const minShadeLabel = (
  <div className="flex items-center">
    <div className="w-2 h-2 bg-[#F4F4F2] rounded-full"></div>
    <span className="ml-1">Sonnig</span>
  </div>
)

export const LAYER_LEGEND_ITEMS: {
  shade: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
  temperature: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
  wind: Pick<
    LayerLegendBlockType,
    'title' | 'description' | 'icon' | 'legendFigure'
  >
} = {
  shade: {
    title: 'Schatten',
    description: 'Zeigt, wohin die Schatten fallen.',
    icon: <ShadeIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel={maxShadeLabel} minLabel={minShadeLabel}>
        <Image
          src={shadeImage}
          alt="Beispiel von Schatten auf der Karte"
          width={400}
          height={30}
        />
      </LayerLegendFigure>
    ),
  },
  temperature: {
    title: 'Kühle Bereiche',
    description: 'Zeigt die vergleichsweise kühlsten Bereiche in der Stadt.',
    icon: <TemperatureIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="Kühl" minLabel="Weniger kühl">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-blue-400 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-300 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-200 opacity-50')}></div>
          <div className={classNames('bg-layer-blue-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
  wind: {
    title: 'Frischer Wind',
    description: 'Zeigt, wo vergleichsweise viel kalter Wind weht.',
    icon: <WindIcon />,
    legendFigure: (
      <LayerLegendFigure maxLabel="Windig" minLabel="Weniger windig">
        <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
          <div className={classNames('bg-layer-green-400 opacity-50')}></div>
          <div className={classNames('bg-layer-green-300 opacity-50')}></div>
          <div className={classNames('bg-layer-green-200 opacity-50')}></div>
          <div className={classNames('bg-layer-green-100 opacity-50')}></div>
          <div className={classNames('bg-white opacity-50')}></div>
        </div>
      </LayerLegendFigure>
    ),
  },
}
