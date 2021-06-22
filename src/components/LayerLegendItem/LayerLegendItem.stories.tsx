import { WindIcon } from '@components/Icons'
import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { LayerLegendItem, LayerLegendItemType } from '.'

const testContent = {
  title: 'I am a title',
  description: 'I am a description for this legend item.',
  icon: <WindIcon className="transform scale-125" />,
  legendContent: <p>Fill this with the actual legend</p>,
}

export default {
  title: 'UI Elements/LayerLegendItem',
  component: LayerLegendItem,
  decorators: [withNextRouter],
} as Meta

const Template: Story<LayerLegendItemType> = (args) => {
  return <LayerLegendItem {...args} />
}

export const Default = Template.bind({})
Default.args = {
  ...testContent,
}
