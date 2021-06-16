import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'
import { Sidebar } from '.'

export default {
  title: 'UI Elements/Sidebar',
  component: Sidebar,
  decorators: [withNextRouter],
} as Meta

const Template: Story<{
  title?: string
}> = ({ title }) => <Sidebar title={title} />

export const OpenedWithActiveTab = Template.bind({})
OpenedWithActiveTab.parameters = {
  nextRouter: {
    query: {},
    pathname: '/filters',
  },
}
OpenedWithActiveTab.args = {}

export const ClosedWithNoActiveTab = Template.bind({})
ClosedWithNoActiveTab.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
ClosedWithNoActiveTab.args = {}

export const WithTitle = Template.bind({})
WithTitle.parameters = {
  nextRouter: {
    query: {},
    pathname: '/about',
  },
}
WithTitle.args = {
  title: 'About',
}
