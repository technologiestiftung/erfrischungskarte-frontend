import { Story, Meta } from '@storybook/react'

import { Accordion } from '.'

export default {
  title: 'UI Elements/Accordion',
  component: Accordion,
} as Meta

const Template: Story<{
  items: { id: string; title: string; content: string }[]
}> = (args) => (
  <div className="container mx-auto max-w-lg py-8 prose">
    <Accordion {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  items: Array(12)
    .fill(null)
    .map((_, idx: number) => ({
      id: `${idx}`,
      title: `Do you like the number ${idx + 1}?`,
      content: `Me too! The number ${idx + 1} is great!`,
    })),
}
