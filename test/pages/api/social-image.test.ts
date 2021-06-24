import socialImage from '../../../pages/api/social-image'
import chromium from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

const launchMock = jest.fn().mockReturnValue({
  newPage: jest.fn().mockReturnValue({
    setViewport: jest.fn(),
    goto: jest.fn(),
    screenshot: jest.fn(),
  }),
  close: jest.fn(),
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
chromium.puppeteer.launch = launchMock

const mockRequest = {
  headers: {
    host: 'H',
    'x-forwarded-host': 'FWH',
  },
  query: {
    latitude: '12.23525',
    longitude: '16.23525',
    zoom: '3',
  },
}

const mockResponse = {
  status: jest.fn().mockReturnValue({
    json: jest.fn(),
  }),
  setHeader: jest.fn(),
  send: jest.fn(),
}

describe('socialImage api', () => {
  test('happy path', async () => {
    await socialImage(
      mockRequest as unknown as NextApiRequest,
      mockResponse as unknown as NextApiResponse
    )

    expect(launchMock).toHaveBeenCalled()
  })
  test('error path', async () => {
    launchMock.mockRejectedValue(false)
    await socialImage(
      mockRequest as unknown as NextApiRequest,
      mockResponse as unknown as NextApiResponse
    )

    expect(launchMock).toHaveBeenCalled()
  })
})
