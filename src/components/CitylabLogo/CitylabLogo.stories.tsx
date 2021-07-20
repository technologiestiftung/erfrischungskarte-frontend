import { Story, Meta } from '@storybook/react'

import { CitylabLogo } from '.'

export default {
  title: 'Brand/CitylabLogo',
  component: CitylabLogo,
} as Meta

const Template: Story = (args) => <CitylabLogo {...args} />

export const Default = Template.bind({})
Default.args = {}
