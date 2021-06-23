import { CrossIcon, SharingIcon } from '@components/Icons'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode, useState } from 'react'
import styles from './SharingOverlay.module.css'

interface SharingOptionPropType {
  title: string
  description: ReactNode
  link: string
}

const getGoogleMapsLinkByQuery = (
  query: ReturnType<typeof mapRawQueryToState>
): string =>
  `https://www.google.com/maps/place/${query.latitude || ''},${
    query.longitude || ''
  },${query.zoom || ''}z`

export const SharingOption: FC<SharingOptionPropType> = ({
  title,
  description,
  link,
}) => {
  const { copyToClipboard, hasCopied } = useCopyToClipboard()
  return (
    <div className="grid gap-4 grid-cols-2">
      <div>
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-sm text-gray-400 italic">{description}</p>
      </div>
      <div className="grid place-content-center">
        <button
          className={classNames(
            'rounded-lg border-2 px-2 py-1 sm:text-xl transition',
            'border-layer-turquoise-300 focus:outline-none',
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

export const SharingOverlay: FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const hasEnoughToCreateGMapsLink = Boolean(
    mappedQuery.latitude && mappedQuery.longitude && mappedQuery.zoom
  )

  return (
    <>
      <button
        onClick={() => setIsOpened(!isOpened)}
        aria-label="Diesen Kartenabschnitt teilen"
        className={classNames(
          styles.sharingButton,
          'rounded-full bg-white w-12 h-12',
          'fixed right-4 text-center py-2',
          'shadow-lg transition',
          'focus:outline-none focus:ring-2',
          isOpened && 'text-white bg-gray-800',
          isOpened && 'focus:ring-white',
          !isOpened && 'focus:ring-gray-800'
        )}
      >
        <SharingIcon className="inline transform -translate-x-0.5" />
      </button>
      {isOpened && (
        <div
          className={classNames(
            'right-4 bottom-20 sm:bottom-4 sm:right-20',
            'rounded shadow-xl p-6 sm:p-8 w-96',
            'fixed bg-white grid grid-flow-row gap-4'
          )}
          style={{ maxWidth: 'calc(100% - 32px)' }}
        >
          <h3 className="font-bold text-xl sm:text-2xl pr-20">
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
              'hover:bg-gray-200 transition'
            )}
            onClick={() => setIsOpened(false)}
          >
            <CrossIcon />
          </button>
        </div>
      )}
    </>
  )
}
