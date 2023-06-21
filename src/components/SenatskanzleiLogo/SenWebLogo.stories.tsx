import { Story, Meta } from '@storybook/react'

import { SenatskanzleiLogo } from '.'

export default {
  title: 'Brand/SenatskanzleiLogo',
  component: SenatskanzleiLogo,
} as Meta

const Template: Story = (args) => <SenatskanzleiLogo {...args} />

export const Default = Template.bind({})
Default.args = {}
