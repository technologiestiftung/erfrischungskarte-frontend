import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC } from 'react'

export const AppTitle: FC = () => (
  <div
    className={classNames(
      'fixed top-4 sm:top-6 left-0 z-10 px-4',
      'pointer-events-none w-screen flex',
      'place-items-start place-content-start',
      'sm:place-items-center sm:place-content-center'
    )}
  >
    <InternalLink
      href="/"
      className={classNames(
        'italic sm:text-2xl font-semibold',
        'rounded-lg bg-white px-3 py-2',
        'pointer-events-auto shadow-lg w-auto',
        'text-gray-800 group hover:bg-gray-200',
        'transition-colors focus:outline-none',
        'focus:ring-2 focus:ring-gray-800'
      )}
    >
      <span>Berliner</span>
      <span className="text-layer-turquoise-300">Erfrischungskarte</span>
    </InternalLink>
  </div>
)
