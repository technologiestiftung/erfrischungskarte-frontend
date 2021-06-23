import { Story, Meta } from '@storybook/react'

import { Warning } from '.'

export default {
  title: 'UI Elements/Warning',
  component: Warning,
} as Meta

const Template: Story = (args) => {
  return <Warning {...args}>{args.children}</Warning>
}

export const WithShortTextContent = Template.bind({})
WithShortTextContent.args = {
  children: <p>I am a short warning text.</p>,
}

export const WithLongTextContent = Template.bind({})
WithLongTextContent.args = {
  children: (
    <p>
      A lot went wrong here. That&apos;s why there is a a long warning message.
      Very, very long message. A lot went wrong here. That&apos;s why there is a
      a long warning message. Very, very long message. A lot went wrong here.
      That&apos;s why there is a a long warning message. Very, very long
      message. A lot went wrong here. That&apos;s why there is a a long warning
      message. Very, very long message.
    </p>
  ),
}
