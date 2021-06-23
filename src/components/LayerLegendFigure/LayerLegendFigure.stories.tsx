import { Story, Meta } from '@storybook/react'
import classNames from 'classnames'

import { LayerLegendFigure, LayerLegendFigureType } from '.'

export default {
  title: 'UI Elements/LayerLegendFigure',
  component: LayerLegendFigure,
} as Meta

const Template: Story<LayerLegendFigureType> = (args) => {
  return (
    <div className="w-72">
      <LayerLegendFigure {...args}>{args.children}</LayerLegendFigure>
    </div>
  )
}

export const WithColorScale = Template.bind({})
WithColorScale.args = {
  maxLabel: 'Maximum',
  minLabel: 'Minimum',
  children: (
    <div className={classNames('h-[10px]', 'grid grid-cols-5')}>
      <div className={classNames('bg-layer-green-400 opacity-50')}></div>
      <div className={classNames('bg-layer-green-300 opacity-50')}></div>
      <div className={classNames('bg-layer-green-200 opacity-50')}></div>
      <div className={classNames('bg-layer-green-100 opacity-50')}></div>
      <div className={classNames('bg-white opacity-50')}></div>
    </div>
  ),
}
