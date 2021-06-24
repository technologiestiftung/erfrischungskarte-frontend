import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { HourSelector } from '.'

export default {
  title: 'UI Elements/HourSelector',
  component: HourSelector,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => {
  return (
    <div className="bg-gray-300 h-full fixed inset-0">
      <HourSelector activeHourKey="16" />
    </div>
  )
}

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {}
