import { Story, Meta } from '@storybook/react'

import { OdisLogo } from '.'

export default {
  title: 'Brand/OdisLogo',
  component: OdisLogo,
} as Meta

const Template: Story = (args) => <OdisLogo {...args} />

export const Default = Template.bind({})
Default.args = {}
