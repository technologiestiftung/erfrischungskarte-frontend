import { FC } from 'react'
import { Popup } from 'react-map-gl'

export interface MapPoiTooltipType {
  title?: string
  category?: string
  info?: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export const MapPoiTooltip: FC<MapPoiTooltipType> = ({
  title,
  category,
  info,
  coordinates,
}) => {
  return (
    <Popup
      latitude={coordinates.latitude}
      longitude={coordinates.longitude}
      closeButton={false}
      className="w-64 rounded-2xl"
    >
      {title && <h4 className="text-xl leading-6 text-gray-900">{title}</h4>}
      {category && <p className="text-gray-400">{category}</p>}
      {info && (
        <p className="text-xs text-gray-900 pt-2 mt-2 border-t">{info}</p>
      )}
    </Popup>
  )
}
