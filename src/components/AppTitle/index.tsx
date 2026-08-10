import { InternalLink } from '@components/InternalLink'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { MobileSearch } from '@components/MobileSearch'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const AppTitle: FC = () => {
  const hasMobileSize = useHasMobileSize()
  const { pathname } = useRouter()

  return (
    <div
      className={classNames(
        'fixed top-4 sm:top-6 left-0 z-10 px-4',
        'pointer-events-none w-screen flex flex-row items-center',
        'place-items-start place-content-start',
        pathname === '/map' && 'sm:place-items-center sm:place-content-center'
      )}
    >
      <InternalLink
        href="/"
        className={classNames(
          'italic sm:text-2xl font-semibold',
          'rounded-lg bg-white px-3 py-2',
          'pointer-events-auto shadow-lg w-auto flex-shrink-0',
          'text-gray-800 group hover:bg-gray-200',
          'transition-colors focus:outline-none',
          'focus:ring-2 focus:ring-gray-800'
        )}
      >
        <img
          src="./favicons/android-chrome-512x512.png"
          alt=""
          className="w-6 sm:hidden"
        />
        <span className="hidden sm:inline">Berliner</span>
        <span className="text-layer-turquoise-300 hidden sm:inline">
          Erfrischungskarte
        </span>
      </InternalLink>

      {hasMobileSize && <MobileSearch />}
    </div>
  )
}
