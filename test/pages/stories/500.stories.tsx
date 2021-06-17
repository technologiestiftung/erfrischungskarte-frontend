import { Sidebar } from '@components/Sidebar'
import { Story, Meta } from '@storybook/react'
import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import { FiveHundred } from '../../../pages/500'

export default {
  title: 'Pages/FiveHundred',
  component: FiveHundred,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => (
  <Sidebar>
    <FiveHundred />
  </Sidebar>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/500',
  },
}
Default.args = {}
