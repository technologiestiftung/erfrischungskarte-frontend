import classNames from 'classnames'
import { FC } from 'react'

interface SidebarPropType {
  title?: string
}

export const Sidebar: FC<SidebarPropType> = ({ title, children }) => {
  if (!children) return null
  return (
    <aside
      className={classNames(
        'fixed inset-8 bg-white',
        'rounded shadow-lg p-8 right-auto',
        'w-full max-w-sm'
      )}
    >
      {title && <h1>{title}</h1>}
      {children}
    </aside>
  )
}
