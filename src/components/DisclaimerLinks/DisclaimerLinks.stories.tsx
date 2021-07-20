import { Story, Meta } from '@storybook/react'

import { DisclaimerLinks } from '.'

export default {
  title: 'UI Elements/DisclaimerLinks',
  component: DisclaimerLinks,
} as Meta

const Template: Story = () => (
  <div className="p-4 bg-gray-400 h-96 w-full relative">
    <DisclaimerLinks />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {}
Default.args = {}
