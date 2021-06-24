import { NextApiRequest } from 'next'

type AbsoluteUrlType = {
  protocol: string
  host: string
  origin: string
}
export function absoluteUrl(
  req: NextApiRequest,
  localhostAddress = 'localhost:3000'
): AbsoluteUrlType {
  let host =
    (req?.headers ? req.headers.host : window.location.host) || localhostAddress
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:'

  if (
    req &&
    req.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host']
  }

  if (
    req &&
    req.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${req.headers['x-forwarded-proto']}:`
  }

  return {
    protocol,
    host,
    origin: `${protocol}//${host}`,
  }
}
