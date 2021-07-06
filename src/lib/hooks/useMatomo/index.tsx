import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

interface MatomoClassType {
  getTracker: (url: string, siteId: string) => MatomoInstanceType
}
interface MatomoInstanceType {
  trackPageView: (val: string[]) => void
}

const MATOMO_URL =
  process.env.NEXT_PUBLIC_MATOMO_URL || 'https://piwik.example.com'
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '1'

export const useMatomo = (pageTitle?: string): void => {
  const { pathname } = useRouter()
  const matomoInstance = useRef<MatomoInstanceType | null>(null)

  useEffect(() => {
    if (!matomoInstance.current) return
    matomoInstance.current.trackPageView([pageTitle || pathname])
  }, [pageTitle, pathname])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const matomo = (window.matomo as unknown as string[][]) || []
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.matomo = matomo
    matomo.push(['disableCookies'])
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    matomo.push(['trackPageView'])
    matomo.push(['enableLinkTracking'])
    matomo.push(['setTrackerUrl', `${MATOMO_URL}/matomo.php`])
    matomo.push(['setSiteId', MATOMO_SITE_ID])

    const newScript = document.createElement('script')
    const firstScript = document.getElementsByTagName('script')[0]
    newScript.type = 'text/javascript'
    newScript.async = true
    newScript.src = `${MATOMO_URL}/matomo.js`
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(newScript, firstScript)
    } else {
      document.body.appendChild(newScript)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const matomoClass = window.Matomo as MatomoClassType
    if (typeof matomoClass === 'undefined') return
    matomoInstance.current = matomoClass.getTracker(MATOMO_URL, MATOMO_SITE_ID)
  }, [])
}
