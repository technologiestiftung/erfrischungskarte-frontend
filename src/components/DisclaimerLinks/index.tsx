import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import classNames from 'classnames'
import React, { FC } from 'react'

export const DisclaimerLinks: FC<{ className?: string }> = ({ className }) => {
  const hasMobileSize = useHasMobileSize()

  return (
    <div
      className={classNames(
        'absolute z-50',
        hasMobileSize
          ? 'transform -rotate-90 -left-20 bottom-44 pt-1'
          : 'w-full flex justify-center bottom-2',
        className
      )}
    >
      <a
        target="_blank"
        rel="noreferrer"
        className="border border-transparent hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100 bg-white p-1 text-xs rounded bg-opacity-75 hover:bg-opacity-100 underline mr-2"
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
      >
        Impressum
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        className="border border-transparent hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100 bg-white p-1 text-xs rounded bg-opacity-75 hover:bg-opacity-100 underline mr-2"
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
      >
        Datenschutz
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        className="border border-transparent hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100 bg-white p-1 text-xs rounded bg-opacity-75 hover:bg-opacity-100 underline"
        href="https://github.com/technologiestiftung/erfrischungskarte-frontend/"
      >
        GitHub
      </a>
    </div>
  )
}
