import { CrossIcon } from '@components/Icons'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface SharingOptionPropType {
  title: string
  description: ReactNode
  link: string
}

interface SharingOverlayPropType {
  onClose?: () => void
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
            'rounded-lg border-2 border-layer-turquoise-300',
            'px-2 py-1 sm:text-xl text-layer-turquoise-300 transition',
            'focus:outline-none focus:ring-4 focus:ring-layer-turquoise-200',
            'hover:text-layer-turquoise-400 hover:border-layer-turquoise-400'
          )}
          onClick={() => copyToClipboard(link)}
        >
          {hasCopied ? 'Link kopiert!' : 'Link kopieren'}
        </button>
      </div>
    </div>
  )
}

export const SharingOverlay: FC<SharingOverlayPropType> = ({
  onClose = () => undefined,
}) => {
  const { query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const hasEnoughToCreateGMapsLink = Boolean(
    mappedQuery.latitude && mappedQuery.longitude && mappedQuery.zoom
  )

  return (
    <div
      className={classNames(
        'fixed bottom-6 right-20 bg-white',
        'rounded shadow-xl p-6 sm:p-8 w-96 max-w-full',
        'grid grid-flow-row gap-4'
      )}
    >
      <h3 className="font-bold text-2xl pr-20">
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
              Gibt dir die Koor&shy;di&shy;naten, die sich in der Mitte deines
              Karten&shy;aus&shy;schnitts be&shy;finden.
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
        onClick={() => onClose()}
      >
        <CrossIcon />
      </button>
    </div>
  )
}
