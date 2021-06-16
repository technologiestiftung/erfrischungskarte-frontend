import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface SidebarPropType {
  title?: string
}

const pages = [
  { path: '/filters', icon: 'A' },
  { path: '/search', icon: 'B' },
  { path: '/about', icon: 'C' },
]

export const Sidebar: FC<SidebarPropType> = ({ title, children }) => {
  const { pathname } = useRouter()
  const cssVariables = {
    '--sidebarWidth': '400px',
    '--sidebarPadding': '24px',
  } as React.CSSProperties

  const isOpened = pathname !== '/' && pathname !== '/map'

  return (
    <div style={cssVariables}>
      <aside
        className={classNames(
          'fixed inset-0 transform',
          'shadow-lg right-auto transition',
          isOpened ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          width: 'var(--sidebarWidth, 320px)',
          padding: 'var(--sidebarPadding, 20px)',
          paddingRight: 16,
        }}
      >
        <div
          className={classNames(
            'rounded bg-white p-8 shadow-lg',
            'h-full overflow-x-hidden overflow-y-auto'
          )}
        >
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </aside>
      <nav
        className={classNames(
          'fixed inset-0 ',
          'right-auto',
          'w-16 transition'
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
        <ul
          className={classNames(
            'flex flex-col bg-white rounded',
            'shadow-lg overflow-hidden'
          )}
        >
          {pages.map(({ path, icon }) => (
            <li
              key={path}
              className={classNames(
                'h-16',
                pathname === path && 'bg-gray-800 text-white'
              )}
            >
              <InternalLink
                href={pathname === path ? '/map' : path}
                className={classNames(
                  'w-full h-full',
                  'grid place-items-center'
                )}
              >
                {pathname === path ? 'X' : icon}
              </InternalLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
