import { CrossIcon } from '@components/Icons'
import React, { useState } from 'react'

export const CookieBanner: React.FC<{
  ignoreCookie?: true
}> = ({ ignoreCookie }) => {
  const cookie = typeof window !== 'undefined' && window.document.cookie
  const cookieIsAccepted = cookie
    ? Boolean(
        cookie?.split('; ')?.find((row) => row.startsWith('disclaimerAccepted'))
      )
    : false
  const [cookieStatus, setCookieStatus] = useState<boolean>(
    ignoreCookie === undefined ? cookieIsAccepted : false
  )

  const acceptCookies: () => void = () => {
    document.cookie = 'disclaimerAccepted=true;path=/;max-age=31536000;'
    setCookieStatus(true)
  }

  if (cookieStatus !== false) return null
  return (
    <>
      <div
        className={[
          'p-3 border border-gray-200 shadow-xl fixed left-1/2 transform -translate-x-1/2',
          'bottom-0 sm:bottom-4 z-50 bg-white text-sm rounded container max-w-3xl',
          'flex justify-between z-50',
        ].join(' ')}
      >
        <p className="max-w-none sm:pr-4">
          Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
          ermöglichen und das Angebot zu verbessern. Indem Sie hier fortfahren,
          stimmen Sie der Nutzung von Cookies zu. &nbsp;
          <a
            href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weitere Informationen
          </a>
        </p>
        <span className="cursor-pointer opacity-100 hover:opacity-50 transition">
          <CrossIcon onClick={acceptCookies} />
        </span>
      </div>
    </>
  )
}
