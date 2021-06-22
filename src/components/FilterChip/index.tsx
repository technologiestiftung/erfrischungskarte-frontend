import classNames from 'classnames'
import { FC, HTMLAttributes } from 'react'

export interface FilterChipType extends HTMLAttributes<HTMLButtonElement> {
  ariaLabel: string
  isSelected?: boolean
  otherClassNames?: string
}

export const FilterChip: FC<FilterChipType> = ({
  ariaLabel,
  isSelected = true,
  otherClassNames,
  children,
  ...otherButtonProps
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'px-2 py-1 border rounded-md cursor-default',
        'focus:rounded focus:ring-2 focus:ring-gray-800 focus:outline-none',
        'focus:ring-offset-2 focus:ring-offset-white',
        otherClassNames,
        isSelected
          ? 'border-gray-400 text-gray-900'
          : 'border-gray-200 text-gray-500'
      )}
      aria-label={ariaLabel}
      disabled
      {...otherButtonProps}
    >
      {children}
    </button>
  )
}
