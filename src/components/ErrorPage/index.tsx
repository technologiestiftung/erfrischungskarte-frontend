import { InternalLink } from '@components/InternalLink'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { FC } from 'react'

interface ErrorPagePropType {
  statusCode: number
  message: string
}

export const ErrorPage: FC<ErrorPagePropType> = ({ statusCode, message }) => {
  const hasMobileSize = useHasMobileSize()

  return (
    <div
      className="flex flex-col items-center justify-center relative"
      style={{
        height: hasMobileSize
          ? 'calc(var(--screenHeight) - (var(--sidebarPadding, 24px) * 2) - 80px)'
          : 'calc(var(--screenHeight) - (var(--sidebarPadding, 24px) * 2) - 32px)',
      }}
    >
      <h1 className="text-5xl sm:text-7xl mb-2 sm:mb-4">{statusCode}</h1>
      <p className="px-8 text-center">{message}</p>
      <InternalLink
        href="/"
        className="underline opacity-100 transition-opacity hover:opacity-60"
      >
        Startseite
      </InternalLink>
    </div>
  )
}

export default ErrorPage
