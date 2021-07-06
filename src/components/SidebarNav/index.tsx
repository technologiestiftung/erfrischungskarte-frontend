import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { FunnelIcon, InfoIcon, MagnifyingGlassIcon } from '@components/Icons'
import { InternalLink } from '@components/InternalLink'

interface SidebarNavPropType {
  isOpened: boolean
  hasMobileSize: boolean
  pathname: string
}

interface SidebarNavLinkPropType {
  path: string
  title: string
  icon: ReactNode
  isActive: boolean
  hasMobileSize: boolean
}

const pages: Omit<SidebarNavLinkPropType, 'isActive' | 'hasMobileSize'>[] = [
  { title: 'Filters', path: '/filters', icon: <FunnelIcon /> },
  { title: 'Suche', path: '/search', icon: <MagnifyingGlassIcon /> },
  { title: 'Über das Projekt', path: '/about', icon: <InfoIcon /> },
]

const SidebarNavLink: FC<SidebarNavLinkPropType> = ({
  path,
  title,
  icon,
  isActive,
  hasMobileSize,
}) => (
  <li
    className={classNames(
      'group relative',
      hasMobileSize ? 'h-14 w-1/4' : 'h-16'
    )}
  >
    <span
      className={classNames(
        'transition opacity-0 px-3 py-1',
        'rounded bg-gray-800 text-white transform',
        'absolute whitespace-nowrap',
        'delay-1000 pointer-events-none',
        !hasMobileSize && [
          'group-hover:opacity-100',
          'group-hover:delay-0 bg-opacity-90',
        ],
        hasMobileSize
          ? 'bottom-full left-1/2 -translate-y-2 -translate-x-1/2'
          : 'left-full top-1/2 translate-x-2 -translate-y-1/2'
      )}
    >
      {title}
    </span>
    <InternalLink
      href={isActive ? '/map' : path}
      className={classNames(
        'transition w-full h-full grid place-items-center',
        hasMobileSize && 'group-first:rounded-l',
        !hasMobileSize && [
          'group-first:rounded-t group-last:rounded-b',
          'focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none',
          'focus:ring-offset-2 focus:ring-offset-white focus:z-10 relative',
          'hover:bg-gray-200 hover:text-gray-800',
        ],
        isActive && 'bg-gray-800 text-white active'
      )}
    >
      {icon}
    </InternalLink>
  </li>
)

export const SidebarNav: FC<SidebarNavPropType> = ({
  isOpened,
  hasMobileSize,
  pathname,
}) => (
  <nav
    className={classNames(
      'fixed inset-0 transition box-content z-20',
      isOpened ? 'opened' : 'closed',
      hasMobileSize ? 'top-auto h-14' : 'right-auto w-16'
    )}
    style={{
      left: hasMobileSize ? 0 : 'var(--sidebarWidth, 320px)',
      padding: hasMobileSize
        ? 'var(--sidebarPadding, 20px)'
        : 'var(--sidebarPadding, 20px) 16px',
      transform: classNames(
        !hasMobileSize && isOpened && `translateX(0)`,
        !hasMobileSize &&
          !isOpened &&
          `translateX(calc(var(--sidebarWidth, 320px) * -1 + (var(--sidebarPadding, 20px) / 2)))`
      ),
    }}
  >
    <ul
      className={classNames(
        'flex bg-white rounded shadow-lg',
        hasMobileSize ? ' flex-row' : ' flex-col'
      )}
    >
      {pages.map((page) => (
        <SidebarNavLink
          key={page.path}
          {...page}
          isActive={page.path === pathname}
          hasMobileSize={hasMobileSize}
        />
      ))}
    </ul>
  </nav>
)
