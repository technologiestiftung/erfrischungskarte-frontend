import { Story, Meta } from '@storybook/react'

import { FilterChip } from '.'

export default {
  title: 'UI Elements/FilterChip',
  component: FilterChip,
} as Meta

const Template: Story = (args) => {
  return (
    <FilterChip ariaLabel="I am an aria label" {...args}>
      {args.children}
    </FilterChip>
  )
}

export const Default = Template.bind({})
Default.args = {
  isSelected: true,
  children: <p>I could be a label</p>,
}

export const Deselected = Template.bind({})
Deselected.args = {
  isSelected: false,
  children: <p>I could be a label</p>,
}
