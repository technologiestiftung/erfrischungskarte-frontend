import classNames from 'classnames'
import { FC, HTMLAttributes } from 'react'

export interface FilterChipType extends HTMLAttributes<HTMLButtonElement> {
  ariaLabel: string
  isSelected?: boolean
  otherClassNames?: string
  handleClick?: () => void
}

export const FilterChip: FC<FilterChipType> = ({
  ariaLabel,
  isSelected = true,
  otherClassNames,
  handleClick = console.log,
  children,
  ...otherButtonProps
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'px-2 py-1 border rounded-md',
        'focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none',
        'focus:ring-offset-2 focus:ring-offset-white',
        otherClassNames,
        isSelected
          ? 'border-gray-400 text-gray-900'
          : 'border-gray-200 text-gray-500',
        'transition-opacity duration-75 ease-in-out',
        isSelected ? 'opacity-100' : 'opacity-50'
      )}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...otherButtonProps}
    >
      {children}
    </button>
  )
}
