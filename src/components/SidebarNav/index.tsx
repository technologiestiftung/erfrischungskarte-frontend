import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import {
  FunnelIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  GeoPinPlusIcon,
} from '@components/Icons'
import { InternalLink } from '@components/InternalLink'
import { SharingOverlay } from '@components/SharingOverlay'

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
  isExternal?: boolean
}

const pages: Omit<SidebarNavLinkPropType, 'isActive' | 'hasMobileSize'>[] = [
  { title: 'Über das Projekt', path: '/about', icon: <InfoIcon /> },
  { title: 'Filter', path: '/filters', icon: <FunnelIcon /> },
  { title: 'Suche', path: '/search', icon: <MagnifyingGlassIcon /> },
  {
    title: 'Ort vorschlagen',
    path: 'https://citylabberlin.typeform.com/to/sFu9ZIKh',
    icon: <GeoPinPlusIcon />,
    isExternal: true,
  },
]

const SidebarNavLink: FC<SidebarNavLinkPropType> = ({
  path,
  title,
  icon,
  isActive,
  hasMobileSize,
  isExternal,
}) => {
  const linkContent = (
    <>
      {icon}
      {hasMobileSize && (
        <span className="text-[10px] mt-1 text-center font-medium leading-none hidden xs:inline">
          {title}
        </span>
      )}
    </>
  )

  const commonClassName = classNames(
    'transition w-full h-full flex flex-col items-center justify-center',
    hasMobileSize && 'group-first:rounded-l',
    !hasMobileSize && [
      'group-first:rounded-t group-last:rounded-b',
      'focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none',
      'focus:ring-offset-2 focus:ring-offset-white focus:z-10 relative',
      'hover:bg-gray-200 hover:text-gray-800',
    ],
    isActive && 'bg-gray-800 text-white active'
  )

  return (
    <li
      className={classNames(
        'group relative',
        hasMobileSize ? 'h-16 w-1/4' : 'h-16'
      )}
    >
      {!hasMobileSize && (
        <span
          className={classNames(
            'transition opacity-0 px-3 py-1',
            'rounded bg-gray-800 text-white transform',
            'absolute whitespace-nowrap',
            'delay-1000 pointer-events-none',
            'group-hover:opacity-100',
            'group-hover:delay-0 bg-opacity-90',
            'left-full top-1/2 translate-x-2 -translate-y-1/2'
          )}
        >
          {title}
        </span>
      )}
      {isExternal ? (
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClassName}
        >
          {linkContent}
        </a>
      ) : (
        <InternalLink
          href={isActive ? '/map' : path}
          className={commonClassName}
        >
          {linkContent}
        </InternalLink>
      )}
    </li>
  )
}

export const SidebarNav: FC<SidebarNavPropType> = ({
  isOpened,
  hasMobileSize,
  pathname,
}) => {
  const renderedItems = []

  // 1. Über das Projekt
  renderedItems.push(
    <SidebarNavLink
      key={pages[0].path}
      {...pages[0]}
      isActive={pages[0].path === pathname}
      hasMobileSize={hasMobileSize}
    />
  )

  // 2. Sharing button here
  renderedItems.push(
    <SharingOverlay key="sharing" hasMobileSize={hasMobileSize} />
  )

  // 3. Filters
  renderedItems.push(
    <SidebarNavLink
      key={pages[1].path}
      {...pages[1]}
      isActive={pages[1].path === pathname}
      hasMobileSize={hasMobileSize}
    />
  )

  // 4. Suche (only desktop)
  if (!hasMobileSize) {
    renderedItems.push(
      <SidebarNavLink
        key={pages[2].path}
        {...pages[2]}
        isActive={pages[2].path === pathname}
        hasMobileSize={hasMobileSize}
      />
    )
  }

  // 5. Ort vorschlagen
  renderedItems.push(
    <SidebarNavLink
      key={pages[3].path}
      {...pages[3]}
      isActive={pages[3].path === pathname}
      hasMobileSize={hasMobileSize}
    />
  )

  return (
    <nav
      className={classNames(
        'fixed inset-0 transition box-content z-20 pointer-events-none',
        isOpened ? 'opened' : 'closed',
        hasMobileSize ? 'top-auto h-16' : 'right-auto w-16'
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
          'flex bg-white rounded shadow-lg pointer-events-auto',
          hasMobileSize ? ' flex-row' : ' flex-col',
          hasMobileSize ? ' pr-14' : ' '
        )}
      >
        {renderedItems}
      </ul>
    </nav>
  )
}
