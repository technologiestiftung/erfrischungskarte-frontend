import { ExclamationIcon } from '@components/Icons'
import classNames from 'classnames'
import { FC } from 'react'

export const Warning: FC = ({ children, ...otherWarningProps }) => {
  return (
    <div
      className={classNames(
        'flex',
        'w-max max-w-prose p-3',
        'border border-[#ff7300] border-opacity-40 rounded'
      )}
      {...otherWarningProps}
    >
      <div className="flex-grow-0 text-[#ff7300]">
        <ExclamationIcon />
      </div>
      <div className="ml-2">{children}</div>
    </div>
  )
}
