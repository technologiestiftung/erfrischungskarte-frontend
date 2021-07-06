import { FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { mapRawQueryToState } from '@lib/utils/queryUtil'

interface InternalLinkPropType extends LinkProps {
  href: string
  className?: string
}

export const InternalLink: FC<InternalLinkPropType> = ({
  href,
  children,
  className = '',
  ...rest
}) => {
  const { query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)

  return (
    <Link
      href={{
        pathname: href,
        query: mappedQuery,
      }}
      {...rest}
    >
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  )
}
