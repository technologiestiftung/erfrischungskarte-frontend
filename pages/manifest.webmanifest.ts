import { PROJECT_TITLE } from '@content/general'
import { NextApiResponse } from 'next'
import { Component } from 'react'
import colors from '../src/style/colors'

const getManifest = ({
  siteTitle = PROJECT_TITLE,
  themeTextColor = colors['layer-turquoise']['300'],
  themeBackgroundColor = '#ffffff',
}): string => `{
    "name": "${siteTitle}",
    "short_name": "FreshMap",
    "icons": [
        {
            "src": "/favicons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/favicons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "${themeTextColor}",
    "background_color": "${themeBackgroundColor}",
    "display": "standalone"
}
`

class Sitemap extends Component {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async getInitialProps({
    res,
  }: {
    res: NextApiResponse
  }): Promise<void> {
    res.setHeader('Content-Type', 'application/manifest+json')
    res.write(getManifest({}))
    res.end()
  }
}

export default Sitemap
