import { Story, Meta } from '@storybook/react'

import { AppTitle } from '.'

export default {
  title: 'UI Elements/AppTitle',
  component: AppTitle,
} as Meta

const Template: Story = () => <AppTitle />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {}
