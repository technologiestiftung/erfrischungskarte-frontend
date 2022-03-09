import { TemperatureIcon, WindIcon, ShadeIcon } from '@components/Icons'
import { LayerLegendBlockType } from '@components/LayerLegendBlock'
import classNames from 'classnames'
import { LayerLegendFigure } from '@components/LayerLegendFigure'
import Image from 'next/image'
import shadeImage from '../../public/images/shade-legend.png'

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

/*
  If a layer is removed, its corresponding layer legend item can be removed here. This will automatically remove it from the filter sidebar.
*/
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
