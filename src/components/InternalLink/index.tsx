import { FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { mapRawQueryToState } from '@lib/utils/queryUtil'

interface InternalLinkPropType extends LinkProps {
  href: string
  className?: string
}

const serialize = (obj: Record<string, unknown>): string => {
  const str = []
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(String(obj[p])))
    }
  return str.join('&')
}

export const InternalLink: FC<InternalLinkPropType> = ({
  href,
  children,
  className = '',
  ...rest
}) => {
  const { query } = useRouter()
  const cleanedQuery = mapRawQueryToState(query)
  const queryAsString = serialize(cleanedQuery)

  return (
    <Link
      href={{
        pathname: href,
        query: queryAsString,
      }}
      {...rest}
    >
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  )
}
