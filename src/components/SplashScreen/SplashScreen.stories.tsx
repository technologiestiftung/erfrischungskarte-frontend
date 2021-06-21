import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import { SplashScreen } from '.'

export default {
  title: 'Content/SplashScreen',
  component: SplashScreen,
  decorators: [withNextRouter],
} as Meta

const Template: Story = (args) => <SplashScreen {...args} />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/',
  },
}
Default.args = {}
