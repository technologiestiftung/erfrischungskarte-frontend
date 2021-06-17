import { Story, Meta } from '@storybook/react'
import classNames from 'classnames'

import { HourSelector } from '.'

export default {
  title: 'UI Elements/HourSelector',
  component: HourSelector,
} as Meta

const Template: Story = () => (
  <div
    className={classNames(
      'grid place-content-center place-items-center',
      'bg-gray-300 h-full fixed inset-0'
    )}
  >
    <HourSelector isOpened={true} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
