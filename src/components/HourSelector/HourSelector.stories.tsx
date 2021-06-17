import { HOURS } from '@modules/RefreshmentMap/content'
import { Story, Meta } from '@storybook/react'
import classNames from 'classnames'
import { useState } from 'react'

import { HourSelector } from '.'

export default {
  title: 'UI Elements/HourSelector',
  component: HourSelector,
} as Meta

const Template: Story = () => {
  const [activeHourKey, setActiveHourKey] = useState<keyof typeof HOURS>('10')
  return (
    <div
      className={classNames(
        'grid place-content-center place-items-center',
        'bg-gray-300 h-full fixed inset-0'
      )}
    >
      <HourSelector onChange={setActiveHourKey} activeHourKey={activeHourKey} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {}
