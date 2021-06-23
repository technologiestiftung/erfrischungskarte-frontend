import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import classNames from 'classnames'
import React, { FC } from 'react'

export const DisclaimerLinks: FC = () => {
  const hasMobileSize = useHasMobileSize()

  return (
    <div
      className={classNames(
        'absolute',
        hasMobileSize
          ? 'transform -rotate-90 -right-12 bottom-48'
          : 'bottom-2 left-28'
      )}
    >
      <a
        className="bg-white p-1 text-xs rounded bg-opacity-75 hover:bg-opacity-100 underline mr-2"
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
      >
        Impressum
      </a>
      <a
        className="bg-white p-1 text-xs rounded bg-opacity-75 hover:bg-opacity-100 underline"
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
      >
        Datenschutz
      </a>
    </div>
  )
}
