import { Story, Meta } from '@storybook/react'

import { FullScreenMapWrapper, FullScreenMapWrapperType } from '.'

export default {
  title: 'Layouts/FullScreenMapWrapper',
  component: FullScreenMapWrapper,
} as Meta

const Template: Story<FullScreenMapWrapperType> = ({
  children,
  topLeft,
  topRight,
  bottomRight,
  bottomLeft,
}) => (
  <div className="container mx-auto max-w-lg py-8 prose">
    <FullScreenMapWrapper
      topLeft={topLeft}
      topRight={topRight}
      bottomRight={bottomRight}
      bottomLeft={bottomLeft}
    >
      {children}
    </FullScreenMapWrapper>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: <h1>Hello, I am the children</h1>,
  topLeft: <h1>Hello, I am the topLeft</h1>,
  topRight: <h1>Hello, I am the topRight</h1>,
  bottomRight: <h1>Hello, I am the bottomRight</h1>,
  bottomLeft: <h1>Hello, I am the bottomLeft</h1>,
}
