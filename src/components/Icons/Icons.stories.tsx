import { Story, Meta } from '@storybook/react'

import * as icons from '.'

export default {
  title: 'UI Elements/Icons',
} as Meta

const Template: Story = () => (
  <div className="container mx-auto flex flex-wrap gap-8 items-center justify-center h-screen">
    {Object.values(icons).map((Icon, idx) => (
      <Icon key={Object.keys(icons)[idx]} />
    ))}
  </div>
)

export const AllIcons = Template.bind({})
AllIcons.args = {}
