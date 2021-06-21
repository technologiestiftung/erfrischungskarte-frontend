import { Story, Meta } from '@storybook/react'
import { Map } from '@components/Map'

import { MapPoiTooltip } from '.'

const initialViewportProps = {
  latitude: 52.520952,
  longitude: 13.400033,
  zoom: 12,
}

export default {
  title: 'UI Elements/MapPoiTooltip',
  component: MapPoiTooltip,
} as Meta

const Template: Story = (args) => {
  return (
    <Map
      width={800}
      height={500}
      initialViewportProps={initialViewportProps}
      mapStyle="mapbox://styles/mapbox/light-v10"
    >
      <MapPoiTooltip
        coordinates={{ latitude: 52.520952, longitude: 13.400033 }}
        title="Tooltip for a park"
        {...args}
      />
    </Map>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const WithCategory = Template.bind({})
WithCategory.args = {
  category: 'Park',
}

export const WithCategoryAndInfo = Template.bind({})
WithCategoryAndInfo.args = {
  category: 'Park',
  info: 'Lots of trees here, some fountains as well',
}
