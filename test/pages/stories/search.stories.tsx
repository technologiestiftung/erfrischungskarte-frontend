import { Sidebar } from '@components/Sidebar'
import { Story, Meta } from '@storybook/react'
import React from 'react'
import { Search } from '../../../pages/search'

export default {
  title: 'Pages/Search',
  component: Search,
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
