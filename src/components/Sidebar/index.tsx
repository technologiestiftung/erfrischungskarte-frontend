import { SidebarNav } from '@components/SidebarNav'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

interface SidebarPropType {
  title?: string
}

export const Sidebar: FC<SidebarPropType> = ({ title, children }) => {
  const { pathname } = useRouter()
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const isOpened = pathname !== '/' && pathname !== '/map'
  const cssVariables = {
    '--sidebarWidth': '400px',
    '--sidebarPadding': '24px',
  } as React.CSSProperties

  useEffect(() => {
    const scrollContainer = document.querySelector('#sidebar-scroll-container')
    if (!scrollContainer) return
    const onScroll: EventListener = (evt) => {
      const target = evt.target as HTMLButtonElement
      if (target.scrollTop > 5) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }
    scrollContainer.addEventListener('scroll', onScroll)
    return () => scrollContainer.removeEventListener('scroll', onScroll)
  }, [setHasScrolled])

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
          id="sidebar-scroll-container"
          className={classNames(
            'rounded bg-white shadow-lg relative',
            'h-full overflow-x-hidden overflow-y-auto'
          )}
        >
          {title && (
            <h1
              className={classNames(
                'sticky inset-0 bottom-auto transition',
                'p-8 pb-6 text-2xl font-bold bg-white',
                hasScrolled && 'shadow-md'
              )}
            >
              {title}
            </h1>
          )}
          <div className="p-8 pt-0">{children}</div>
        </div>
      </aside>
      <SidebarNav isOpened={isOpened} pathname={pathname} />
    </div>
  )
}
