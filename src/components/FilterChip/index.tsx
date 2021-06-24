import classNames from 'classnames'
import { FC, HTMLAttributes } from 'react'

export interface FilterChipType extends HTMLAttributes<HTMLButtonElement> {
  ariaLabel: string
  isSelected?: boolean
  otherClassNames?: string
  handleClick?: () => void
  isDisabled?: boolean
}

export const FilterChip: FC<FilterChipType> = ({
  ariaLabel,
  isSelected = true,
  otherClassNames,
  handleClick = console.log,
  isDisabled,
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
        isSelected ? 'border-gray-40' : 'border-gray-200',
        'transition-opacity duration-75 ease-in-out',
        isSelected ? 'opacity-100' : 'opacity-50',
        'disabled:opacity-100 disabled:cursor-not-allowed',
        isDisabled ? 'border-gray-200' : null
      )}
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={isDisabled}
      {...otherButtonProps}
    >
      {children}
    </button>
  )
}
