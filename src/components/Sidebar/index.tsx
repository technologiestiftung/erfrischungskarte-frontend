import { SidebarNav } from '@components/SidebarNav'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface SidebarPropType {
  title?: string
}

export const Sidebar: FC<SidebarPropType> = ({ title, children }) => {
  const { pathname } = useRouter()
  const isOpened = pathname !== '/' && pathname !== '/map'
  const cssVariables = {
    '--sidebarWidth': '400px',
    '--sidebarPadding': '24px',
  } as React.CSSProperties

  return (
    <div style={cssVariables}>
      <aside
        className={classNames(
          'fixed inset-0 transform',
          'right-auto transition',
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
      <SidebarNav isOpened={isOpened} pathname={pathname} />
    </div>
  )
}
