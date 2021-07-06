import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'
import { Map } from '@components/Map'
import '../MapPoiTooltip/MapPoiTooltip.css'

import { MapPoiTooltip, MapPoiTooltipType } from '.'

const initialViewportProps = {
  latitude: 52.520952,
  longitude: 13.400033,
  zoom: 12,
}

export default {
  title: 'UI Elements/MapPoiTooltip',
  component: MapPoiTooltip,
  decorators: [withNextRouter],
} as Meta

const Template: Story<MapPoiTooltipType> = (args) => {
  return (
    <Map
      width={800}
      height={500}
      initialViewportProps={initialViewportProps}
      mapStyle="mapbox://styles/mapbox/light-v10"
    >
      <MapPoiTooltip {...args} />
    </Map>
  )
}

export const Default = Template.bind({})
Default.args = {
  coordinates: { latitude: 52.520952, longitude: 13.400033 },
  title: 'Tooltip for a park',
  category: 'Park',
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  coordinates: { latitude: 52.520952, longitude: 13.400033 },
  title: 'Tooltip for a park',
  category: 'Park',
  info: 'Lots of trees here, some fountains as well',
}

export const WithIdenticalTitleAndCategory = Template.bind({})
WithIdenticalTitleAndCategory.args = {
  coordinates: { latitude: 52.520952, longitude: 13.400033 },
  title: 'Park',
  category: 'PARK',
}
