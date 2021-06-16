import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import {
  FunnelIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  CrossIcon,
} from '@components/Icons'
import { InternalLink } from '@components/InternalLink'

interface SidebarNavPropType {
  isOpened: boolean
  pathname: string
}

interface SidebarNavLinkPropType {
  path: string
  title: string
  icon: ReactNode
  isActive: boolean
}

const pages: Omit<SidebarNavLinkPropType, 'isActive'>[] = [
  { title: 'Filters', path: '/filters', icon: <FunnelIcon /> },
  { title: 'Suche', path: '/search', icon: <MagnifyingGlassIcon /> },
  { title: 'Über das Projekt', path: '/about', icon: <InfoIcon /> },
]

const SidebarNavLink: FC<SidebarNavLinkPropType> = ({
  path,
  title,
  icon,
  isActive,
}) => (
  <li
    className={classNames(
      'h-16 group relative first:rounded-t last:rounded-b',
      isActive && 'bg-gray-800 text-white active'
    )}
  >
    <span
      className={classNames(
        'transition opacity-0 px-3 py-1',
        'rounded bg-gray-800 text-white transform',
        'absolute left-full top-1/2 whitespace-nowrap',
        'translate-x-2 delay-1000 pointer-events-none',
        '-translate-y-1/2 group-hover:opacity-100',
        'group-hover:delay-0 bg-opacity-90'
      )}
    >
      {title}
    </span>
    <InternalLink
      href={isActive ? '/map' : path}
      className={classNames('w-full h-full', 'grid place-items-center')}
    >
      {isActive ? <CrossIcon /> : icon}
    </InternalLink>
  </li>
)

export const SidebarNav: FC<SidebarNavPropType> = ({ isOpened, pathname }) => (
  <nav
    className={classNames(
      'fixed inset-0 ',
      'right-auto',
      'w-16 transition',
      isOpened ? 'opened' : 'closed'
    )}
    style={{
      left: 'var(--sidebarWidth, 320px)',
      paddingTop: 'var(--sidebarPadding, 20px)',
      paddingBottom: 'var(--sidebarPadding, 20px)',
      transform: `translateX(${
        isOpened
          ? '0'
          : 'calc(var(--sidebarWidth, 320px) * -1 + var(--sidebarPadding, 20px))'
      })`,
    }}
  >
    <ul className={classNames('flex flex-col bg-white rounded', 'shadow-lg')}>
      {pages.map((page) => (
        <SidebarNavLink
          key={page.path}
          {...page}
          isActive={page.path === pathname}
        />
      ))}
    </ul>
  </nav>
)
