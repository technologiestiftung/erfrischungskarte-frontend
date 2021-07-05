import { FC } from 'react'
import NextHead from 'next/head'
import colors from '../../style/colors'
import { useRouter } from 'next/router'

const siteUrl =
  process.env.URL ||
  (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) ||
  'http://localhost:3000'

const faviconPath = '/favicon.ico'
const faviconPathPNG16 = '/favicons/favicon-16x16.png'
const faviconPathPNG32 = '/favicons/favicon-32x32.png'

interface HeadPropType {
  currentPagePath: string
  description: string
  siteTitle: string
  pageTitle: string
  fbAppId: string
  keywords: string[]
  themeColor: string
  locales: string[]
  locale: string
  twitterUsername: string
  socialThumbnail: string
}

export const Head: FC<Partial<HeadPropType>> = ({
  description = '',
  siteTitle = 'Berliner Erfrischungskarte',
  pageTitle = 'Karte',
  fbAppId = '',
  keywords = [
    'Berlin',
    'Heatmap',
    'Temperatur',
    'Wind',
    'Schwimmen',
    'Schatten',
    'Erfrischung',
    'Baden',
    'Bänke',
    'Park',
  ],
  themeColor = colors['layer-turquoise']['300'],
  locales = ['de'],
  locale = 'de',
  twitterUsername = 'TSBBerlin',
  socialThumbnail = '',
}) => {
  const { pathname } = useRouter()
  const longTitle = [pageTitle, siteTitle].join(' ❄️ ')
  const formatedSocialImage = `${siteUrl}/social-image.png`

  return (
    <NextHead>
      <title>{longTitle}</title>

      {description && <meta name="description" content={description} />}

      <meta property="og:type" content="article" />

      <meta name="theme-color" content={themeColor} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />

      <meta itemProp="name" content={longTitle} />
      <meta itemProp="description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:site" content={`@${twitterUsername}`} />
      )}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={`[${locales.join(',')}]`} />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

      <meta itemProp="image" content={formatedSocialImage} />
      <meta name="twitter:image" content={formatedSocialImage} />
      <meta property="og:image" content={formatedSocialImage} />
      {socialThumbnail && (
        <meta property="og:image:alt" content={socialThumbnail} />
      )}

      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />

      <link href={faviconPath} type="image/x-icon" rel="shortcut icon" />
      <link href={faviconPathPNG16} type="image/png" rel="icon" />
      <link href={faviconPathPNG32} type="image/png" rel="icon" />

      <link rel="manifest" href="/manifest.webmanifest" />

      <link rel="author" href="https://odis-berlin.de" />
    </NextHead>
  )
}
