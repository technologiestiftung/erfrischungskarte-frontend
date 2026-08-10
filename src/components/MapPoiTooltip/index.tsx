import { FC } from 'react'
import { Popup } from 'react-map-gl'

export interface MapPoiTooltipType {
  title: string
  category: string
  info?: string
  source?: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export const MapPoiTooltip: FC<MapPoiTooltipType> = ({
  title,
  category,
  info,
  source,
  coordinates,
}) => {
  return (
    <Popup
      latitude={coordinates.latitude}
      longitude={coordinates.longitude}
      closeButton={false}
      className="w-64"
    >
      <h4 className="text-xl leading-6 text-gray-900">{title}</h4>
      {category.toLowerCase() !== title.toLowerCase() && (
        <p className="text-gray-400">{category}</p>
      )}

      {(info || source) && <hr className="mt-2" />}

      {info && <p className="text-xs text-gray-900 pt-2">{info}</p>}

      {source && category !== 'Eure Tipps' && (
        <p className="text-xs text-gray-400 pt-1 mt-1">Quelle: {source}</p>
      )}
    </Popup>
  )
}
