import { Sidebar } from '@components/Sidebar'
import { Story, Meta } from '@storybook/react'
import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import { Search } from '../../../pages/search'

export default {
  title: 'Pages/Search',
  component: Search,
  decorators: [withNextRouter],
} as Meta

const Template: Story = () => (
  <Sidebar title="Suche">
    <Search />
  </Sidebar>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/search',
  },
}
Default.args = {}
