import classNames from 'classnames'
import { FC, HTMLProps, ReactNode } from 'react'

export interface LayerLegendContentType extends HTMLProps<HTMLDivElement> {
  maxLabel?: string | ReactNode
  minLabel?: string | ReactNode
}

export const LayerLegendContent: FC<LayerLegendContentType> = ({
  maxLabel,
  minLabel,
  children,
}) => {
  return (
    <div
      className={classNames(
        'pt-2 pr-2 pl-2',
        maxLabel || minLabel ? 'pb-1' : 'pb-2',
        'flex flex-wrap place-content-between'
      )}
    >
      <div className={classNames('w-full', 'rounded-full')}>{children}</div>
      {maxLabel && <div className="text-xs mt-1">{maxLabel}</div>}
      {minLabel && <div className="text-xs mt-1">{minLabel}</div>}
    </div>
  )
}
