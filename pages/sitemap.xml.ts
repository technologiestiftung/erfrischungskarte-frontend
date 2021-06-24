import { NextPage, NextApiResponse } from 'next'
import { Component } from 'react'

const createFullUrl: (path: string) => string = (path) =>
  `${process.env.URL || 'http://localhost:3000'}${path}`
const formatDate: (dateStr?: string) => string = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date()
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`
}

const getSitemap: () => string = () => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl('/')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/filters')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/map')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/about')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl('/search')}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
</urlset>`

class Sitemap extends Component<NextPage> {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async getInitialProps({
    res,
  }: {
    res: NextApiResponse
  }): Promise<void> {
    res.setHeader('Content-Type', 'text/xml')
    res.write(getSitemap())
    res.end()
  }
}

export default Sitemap
