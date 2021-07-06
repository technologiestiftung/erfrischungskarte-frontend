import { useRouter } from 'next/router'
import { useEffect } from 'react'

const MATOMO_URL =
  process.env.NEXT_PUBLIC_MATOMO_URL || 'https://piwik.example.com'
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '1'

const createImageNoscript = (pathname = ''): HTMLElement => {
  const newNoscript = document.createElement('noscript')
  const newParagraph = document.createElement('p')
  const newImage = document.createElement('img')

  newImage.src = [
    `${MATOMO_URL}/matomo.php?idsite=${MATOMO_SITE_ID}`,
    `rec=1`,
    `action_name=${encodeURIComponent(
      `pageview/${pathname.replace('/', '') || 'splashscreen'}`
    )}`,
    `url=${encodeURIComponent(`${window.location.origin}${pathname}`)}`,
    `rand=${Date.now()}`,
  ].join('&')
  newImage.setAttribute('style', 'border:0;')
  newImage.alt = ''

  newParagraph.appendChild(newImage)
  newNoscript.appendChild(newParagraph)

  return newNoscript
}

const replaceNewScript = (newNoscript: HTMLElement): void => {
  const oldNewScript = document.getElementById('matomo-image')
  if (oldNewScript) oldNewScript.remove()
  const allScripts = document.getElementsByTagName('script')
  const lastScript = allScripts[allScripts.length - 1]

  newNoscript.setAttribute('id', 'matomo-image')

  if (lastScript && lastScript.parentNode) {
    lastScript.parentNode.append(newNoscript, lastScript)
  } else {
    document.body.appendChild(newNoscript)
  }
}

export const useMatomo = (): void => {
  const { pathname } = useRouter()

  useEffect(() => {
    const newScript = createImageNoscript(pathname)
    replaceNewScript(newScript)
  }, [pathname])
}
