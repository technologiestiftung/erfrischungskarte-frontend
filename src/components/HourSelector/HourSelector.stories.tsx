import { HOURS } from '@modules/RefreshmentMap/content'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { withNextRouter } from 'storybook-addon-next-router'

import { HourSelector } from '.'

export default {
  title: 'UI Elements/HourSelector',
  component: HourSelector,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => {
  const [activeHourKey, setActiveHourKey] = useState<keyof typeof HOURS>('10')
  return (
    <div className="bg-gray-300 h-full fixed inset-0">
      <HourSelector onChange={setActiveHourKey} activeHourKey={activeHourKey} />
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
