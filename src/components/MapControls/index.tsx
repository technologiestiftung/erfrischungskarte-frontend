import React, { FC } from 'react'
import { NavigationControl, GeolocateControl } from 'react-map-gl'

export const MapControls: FC<{
  className: string
}> = ({ className }) => {
  return (
    <div className={className}>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        style={{ position: 'static' }}
      />
      <NavigationControl showCompass={false} style={{ position: 'static' }} />
    </div>
  )
}
