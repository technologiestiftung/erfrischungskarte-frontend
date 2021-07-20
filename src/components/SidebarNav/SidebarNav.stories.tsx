import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { Story, Meta } from '@storybook/react'
import { SidebarNav } from '.'

export default {
  title: 'UI Elements/SidebarNav',
  component: SidebarNav,
} as Meta

const Template: Story<{
  isOpened: boolean
  pathname: string
}> = (args) => {
  const hasMobileSize = useHasMobileSize()
  return <SidebarNav {...args} hasMobileSize={hasMobileSize} />
}

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
