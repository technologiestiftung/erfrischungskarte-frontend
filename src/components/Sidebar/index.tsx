import { SidebarNav } from '@components/SidebarNav'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

interface SidebarPropType {
  title?: string
}

export const Sidebar: FC<SidebarPropType> = ({ title, children }) => {
  const { pathname } = useRouter()
  const hasMobileSize = useHasMobileSize()
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const isOpened = pathname !== '/' && pathname !== '/map'
  const cssVariables = {
    '--sidebarWidth': hasMobileSize ? '100vw' : '420px',
    '--sidebarPadding': hasMobileSize ? '16px' : '24px',
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
          'fixed transform z-10',
          'transition inset-0 opacity-100',
          hasMobileSize ? 'top-auto bottom-16' : 'right-auto',
          !isOpened && hasMobileSize && 'opacity-0 pointer-events-none'
        )}
        style={{
          width: 'var(--sidebarWidth, 320px)',
          padding: 'var(--sidebarPadding, 20px)',
          paddingRight: hasMobileSize ? 'var(--sidebarPadding, 20px)' : 0,
          height: hasMobileSize
            ? 'var(--screenSemiHeight)'
            : 'var(--screenHeight)',
          transform: classNames(
            !isOpened &&
              hasMobileSize &&
              'translateY(calc(10 * var(--vh, 1vh)))',
            isOpened && hasMobileSize && 'translateY(0)',
            isOpened && !hasMobileSize && 'translateX(0)',
            !isOpened && !hasMobileSize && 'translateX(-100%)'
          ),
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
                'p-6 sm:p-8 pb-4 sm:pb-6 z-10',
                'text-xl sm:text-2xl font-bold bg-white',
                hasScrolled && 'shadow-md'
              )}
            >
              {title}
            </h1>
          )}
          <div
            className="p-6 sm:p-8 pt-0 sm:pt-0"
            style={{
              minHeight: hasMobileSize
                ? `calc(var(--screenSemiHeight) - (var(--sidebarPadding, 24px) * 2) - ${
                    title ? 68 : 0
                  }px)`
                : `calc(var(--screenHeight) - (var(--sidebarPadding, 24px) * 2) - ${
                    title ? 88 : 0
                  }px)`,
            }}
          >
            {children}
          </div>
        </div>
      </aside>
      <SidebarNav
        isOpened={isOpened}
        hasMobileSize={hasMobileSize}
        pathname={pathname}
      />
    </div>
  )
}
