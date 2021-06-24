import qs from 'querystring'
import chromium from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'
import { absoluteUrl } from '@lib/utils/urlUtil'

const isDev = process.env.NODE_ENV === 'development'
const config = {
  width: 900,
  height: 480,
}

const delay = async (time: number): Promise<void> =>
  new Promise(function (resolve) {
    setTimeout(resolve, time)
  })

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let browser = null

  try {
    const { origin } = absoluteUrl(req)
    const query = qs.stringify({ ...config, ...(req.query || {}) })
    const url = `${origin}/social-image?${query}`

    browser = await chromium.puppeteer.launch({
      args: isDev ? [] : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: isDev
        ? chromium.puppeteer.executablePath()
        : await chromium.executablePath,
      headless: isDev ? true : chromium.headless,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()

    await page.setViewport({
      width: config.width,
      height: config.height,
    })

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    })

    await delay(3000)

    const screenshot = await page.screenshot({
      encoding: 'binary',
    })

    res.setHeader('content-type', 'image/png')
    res.setHeader('cache-control', 'public, max-age=604800')
    res.send(screenshot)
  } catch (error) {
    res.status(500).json({ error: new Error(error) })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
