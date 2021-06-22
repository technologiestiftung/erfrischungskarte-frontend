import { Story, Meta } from '@storybook/react'
import classNames from 'classnames'

import { LayerLegendContent, LayerLegendContentType } from '.'

export default {
  title: 'UI Elements/LayerLegendContent',
  component: LayerLegendContent,
} as Meta

const Template: Story<LayerLegendContentType> = (args) => {
  return (
    <div className="w-72">
      <LayerLegendContent {...args}>{args.children}</LayerLegendContent>
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
