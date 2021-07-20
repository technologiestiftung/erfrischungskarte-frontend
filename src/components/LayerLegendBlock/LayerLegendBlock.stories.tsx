import { WindIcon } from '@components/Icons'
import { Story, Meta } from '@storybook/react'

import { LayerLegendBlock, LayerLegendBlockType } from '.'

const testContent = {
  title: 'I am a title',
  description: 'I am a description for this legend item.',
  icon: <WindIcon className="transform scale-125" />,
  legendContent: <p>Fill this with the actual legend</p>,
}

export default {
  title: 'UI Elements/LayerLegendBlock',
  component: LayerLegendBlock,
} as Meta

const Template: Story<LayerLegendBlockType> = (args) => {
  return <LayerLegendBlock {...args} />
}

export const Default = Template.bind({})
Default.args = {
  ...testContent,
}
