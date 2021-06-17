import { Sidebar } from '@components/Sidebar'
import { Story, Meta } from '@storybook/react'
import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import { FourOFour } from '../../../pages/404'

export default {
  title: 'Pages/FourOFour',
  component: FourOFour,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => (
  <Sidebar>
    <FourOFour />
  </Sidebar>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/404',
  },
}
Default.args = {}
