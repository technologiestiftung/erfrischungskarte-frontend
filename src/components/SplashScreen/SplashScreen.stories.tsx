import { Story, Meta } from '@storybook/react'

import { SplashScreen } from '.'

export default {
  title: 'Content/SplashScreen',
  component: SplashScreen,
} as Meta

const Template: Story = (args) => <SplashScreen {...args} />

export const Default = Template.bind({})
Default.args = {}
