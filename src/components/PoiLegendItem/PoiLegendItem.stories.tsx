import { Story, Meta } from '@storybook/react'

import { PoiLegendItem, PoiLegendItemType } from '.'

export default {
  title: 'UI Elements/PoiLegendItem',
  component: PoiLegendItem,
} as Meta

const Template: Story<PoiLegendItemType> = (args) => {
  return <PoiLegendItem {...args} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'I am a label',
  color: '#ff0000',
}
