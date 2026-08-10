import { CrossIcon, SharingIcon } from '@components/Icons'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import useClickOutside from '@lib/hooks/useClickOutside'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { MAP_CONFIG } from '@modules/RefreshmentMap'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface SharingOptionPropType {
  title: string
  description: ReactNode
  link: string
}

const getGoogleMapsLinkByQuery = (
  query: ReturnType<typeof mapRawQueryToState>
): string => {
  const latLonString = `${query.latitude || MAP_CONFIG.defaultLatitude},${
    query.longitude || MAP_CONFIG.defaultLongitude
  }`
  return `https://maps.google.com/?q=${latLonString}&ll=${latLonString}&z=${
    query.zoom || MAP_CONFIG.defaultZoom
  }`
}

export const SharingOption: FC<SharingOptionPropType> = ({
  title,
  description,
  link,
}) => {
  const { copyToClipboard, hasCopied } = useCopyToClipboard()

  return (
    <div className="flex mb-4 last-of-type:mb-0">
      <div className="pr-4">
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-sm text-gray-400 italic">{description}</p>
      </div>
      <div className="grid justify-end items-center">
        <button
          className={classNames(
            'rounded-lg border-2 px-2 py-1 sm:text-xl transition',
            'border-layer-turquoise-300 focus:outline-none whitespace-nowrap',
            !hasCopied && [
              'text-layer-turquoise-300',
              'hover:text-layer-turquoise-400 hover:border-layer-turquoise-400',
              'focus:ring-4 focus:ring-layer-turquoise-200',
            ],
            hasCopied && 'bg-layer-turquoise-300 text-white cursor-default'
          )}
          onClick={() => copyToClipboard(link)}
        >
          {hasCopied ? 'Link kopiert!' : 'Link kopieren'}
        </button>
      </div>
    </div>
  )
}

interface SharingOverlayPropType {
  hasMobileSize?: boolean
}

export const SharingOverlay: FC<SharingOverlayPropType> = ({
  hasMobileSize = false,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const { query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const hasEnoughToCreateGMapsLink = Boolean(
    mappedQuery.latitude && mappedQuery.longitude && mappedQuery.zoom
  )
  const elRef = useClickOutside<HTMLLIElement>(() => setIsOpened(false))

  const title = 'Teilen'

  const linkContent = (
    <>
      <SharingIcon />
      {hasMobileSize && (
        <span className="text-[10px] mt-1 text-center font-medium leading-none hidden xs:inline">
          {title}
        </span>
      )}
    </>
  )

  const commonClassName = classNames(
    'transition w-full h-full flex flex-col items-center justify-center',
    hasMobileSize && 'group-first:rounded-l',
    !hasMobileSize && [
      'group-first:rounded-t group-last:rounded-b',
      'focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none',
      'focus:ring-offset-2 focus:ring-offset-white focus:z-10 relative',
      'hover:bg-gray-200 hover:text-gray-800',
    ],
    isOpened && 'bg-gray-800 text-white active'
  )

  return (
    <li
      ref={elRef}
      className={classNames(
        'group relative',
        hasMobileSize ? 'h-16 w-1/4' : 'h-16'
      )}
    >
      {!hasMobileSize && (
        <span
          className={classNames(
            'transition opacity-0 px-3 py-1',
            'rounded bg-gray-800 text-white transform',
            'absolute whitespace-nowrap',
            'delay-1000 pointer-events-none',
            'group-hover:opacity-100',
            'group-hover:delay-0 bg-opacity-90',
            'left-full top-1/2 translate-x-2 -translate-y-1/2'
          )}
        >
          {title}
        </span>
      )}
      <button
        onClick={() => setIsOpened(!isOpened)}
        aria-label="Diesen Kartenabschnitt teilen"
        className={commonClassName}
      >
        {linkContent}
      </button>
      {isOpened &&
        mounted &&
        createPortal(
          <div
            className={classNames(
              'right-4 bottom-20 sm:bottom-4 sm:right-20',
              'rounded shadow-xl p-6 sm:p-8 w-96',
              'fixed bg-white flex flex-col z-30 text-left'
            )}
            style={{ maxWidth: 'calc(100% - 32px)' }}
          >
            <h3 className="font-bold text-xl sm:text-2xl pr-20 mb-4 text-gray-800">
              Erfrischenden Ort gefunden?{' '}
              <span className="text-layer-turquoise-300">Teile ihn!</span>
            </h3>
            <SharingOption
              title="Kartenausschnitt"
              description={
                <>
                  Mit diesem Link sehen andere deinen aktu&shy;ellen
                  Karten&shy;aus&shy;schnitt.
                </>
              }
              link={`${window.location.href}`}
            />
            {hasEnoughToCreateGMapsLink && (
              <SharingOption
                title="Google Maps"
                description={
                  <>
                    Gibt dir die Koor&shy;di&shy;naten, die sich in der Mitte
                    deines Karten&shy;aus&shy;schnitts be&shy;finden.
                  </>
                }
                link={getGoogleMapsLinkByQuery(mappedQuery)}
              />
            )}
            <button
              className={classNames(
                'absolute top-6 sm:top-8 right-6 sm:right-8 cursor-pointer',
                'w-10 h-10 grid place-content-center rounded-full',
                'focus:outline-none focus:ring-2 focus:ring-gray-800',
                'hover:bg-gray-200 transition text-gray-800'
              )}
              onClick={() => setIsOpened(false)}
            >
              <CrossIcon />
            </button>
          </div>,
          document.body
        )}
    </li>
  )
}
