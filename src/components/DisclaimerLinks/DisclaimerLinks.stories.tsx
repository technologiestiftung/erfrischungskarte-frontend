import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { DisclaimerLinks } from '.'

export default {
  title: 'UI Elements/DisclaimerLinks',
  component: DisclaimerLinks,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => (
  <div className="p-4 bg-gray-400">
    <DisclaimerLinks />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {}
Default.args = {}
