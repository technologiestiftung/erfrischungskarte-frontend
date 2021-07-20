import { Story, Meta } from '@storybook/react'
import classNames from 'classnames'

import { SharingOverlay } from '.'

export default {
  title: 'UI Elements/SharingOverlay',
  component: SharingOverlay,
} as Meta

const Template: Story = () => (
  <div
    className={classNames(
      'grid place-content-center place-items-center',
      'bg-gray-300 h-full fixed inset-0'
    )}
  >
    <SharingOverlay />
  </div>
)

export const WithGoogleMapsLink = Template.bind({})
WithGoogleMapsLink.parameters = {
  nextRouter: {
    query: {
      latitude: '15.142124',
      longitude: '13.142124',
      zoom: '10.142124',
    },
    pathname: '/map',
  },
}
WithGoogleMapsLink.args = {}

export const WithoutGoogleMapsLink = Template.bind({})
WithoutGoogleMapsLink.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithoutGoogleMapsLink.args = {}
