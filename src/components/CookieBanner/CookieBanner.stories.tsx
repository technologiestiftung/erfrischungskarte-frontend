import { Story, Meta } from '@storybook/react'
import { CookieBanner } from '.'

export default {
  title: 'CookieBanner',
  component: CookieBanner,
} as Meta

// CAUTION: This story is not visible with AsBlocker enabled
const Template: Story = (args) => <CookieBanner ignoreCookie {...args} />

export const Default = Template.bind({})
Default.args = {}
