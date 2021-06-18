import { Story, Meta } from '@storybook/react'

import { TsbLogo } from '.'

export default {
  title: 'Brand/TsbLogo',
  component: TsbLogo,
} as Meta

const Template: Story = (args) => <TsbLogo {...args} />

export const Default = Template.bind({})
Default.args = {}
