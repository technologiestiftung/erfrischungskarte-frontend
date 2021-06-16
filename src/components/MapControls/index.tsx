import React, { FC } from 'react'
import { NavigationControl, GeolocateControl } from 'react-map-gl'

export const Controls: FC<{
  isMobile: boolean
}> = ({ isMobile }) => {
  return (
    <div className={`absolute right-4 ${isMobile ? 'top-4' : 'bottom-4'}`}>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        style={{ position: 'static' }}
      />
      <NavigationControl showCompass={false} style={{ position: 'static' }} />
    </div>
  )
}
