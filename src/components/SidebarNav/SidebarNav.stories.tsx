import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'
import { SidebarNav } from '.'

export default {
  title: 'UI Elements/SidebarNav',
  component: SidebarNav,
  decorators: [withNextRouter],
} as Meta

const Template: Story<{
  isOpened: boolean
  pathname: string
}> = (args) => <SidebarNav {...args} />

export const OpenedWithActiveTab = Template.bind({})
OpenedWithActiveTab.parameters = {
  nextRouter: {
    query: {},
  },
}
OpenedWithActiveTab.args = {
  isOpened: true,
  pathname: '/filters',
}

export const ClosedWithNoActiveTab = Template.bind({})
ClosedWithNoActiveTab.parameters = {
  nextRouter: {
    query: {},
  },
}
ClosedWithNoActiveTab.args = {
  isOpened: false,
  pathname: '/nope',
}
