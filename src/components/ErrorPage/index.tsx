import { InternalLink } from '@components/InternalLink'
import { FC } from 'react'

interface ErrorPagePropType {
  statusCode: number
  message: string
}

export const ErrorPage: FC<ErrorPagePropType> = ({ statusCode, message }) => (
  <div
    className="flex flex-col items-center justify-center relative gap-4"
    style={{
      height: 'calc(100vh - (var(--sidebarPadding, 24px) * 2) - 32px)',
    }}
  >
    <h1 className="text-7xl">{statusCode}</h1>
    <p className="px-8 text-center">{message}</p>
    <InternalLink
      href="/"
      className="underline opacity-100 transition-opacity hover:opacity-60"
    >
      Startseite
    </InternalLink>
  </div>
)

export default ErrorPage
