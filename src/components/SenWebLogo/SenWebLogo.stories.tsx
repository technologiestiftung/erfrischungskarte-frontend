import { Story, Meta } from '@storybook/react'

import { SenWebLogo } from '.'

export default {
  title: 'Brand/SenWebLogo',
  component: SenWebLogo,
} as Meta

const Template: Story = (args) => <SenWebLogo {...args} />

export const Default = Template.bind({})
Default.args = {}
