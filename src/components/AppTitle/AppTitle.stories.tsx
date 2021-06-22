import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { AppTitle } from '.'

export default {
  title: 'UI Elements/AppTitle',
  component: AppTitle,
  decorators: [withNextRouter],
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
