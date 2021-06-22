import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import { InternalLink } from '@components/InternalLink'
import { FilterChip } from '@components/FilterChip'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

export interface LayerLegendBlockType {
  title: string
  description: string
  icon: ReactNode
  legendContent: ReactNode | HTMLElement
  handleToggle: () => void
}

export const LayerLegendBlock: FC<LayerLegendBlockType> = ({
  title,
  description,
  icon,
  legendContent,
  handleToggle,
}) => {
  const hasMobileSize = useHasMobileSize()
  return (
    <div className={classNames('max-w-[420px]')}>
      <div
        className={classNames(hasMobileSize ? 'flex items-center' : 'block')}
      >
        <div className="flex flex-wrap">
          {icon}
          <h3
            className={classNames(
              'text-md',
              hasMobileSize ? 'sr-only' : 'block ml-2'
            )}
          >
            {title}
          </h3>
          <p
            className={classNames(
              'w-full text-gray-500 text-sm',
              hasMobileSize ? 'sr-only' : 'block'
            )}
          >
            {description}
            <InternalLink href={'/about'} className="underline italic ml-1">
              Zur Methodik
            </InternalLink>
          </p>
        </div>
        <div
          className={classNames(hasMobileSize ? 'mt-0 ml-3 w-full' : 'mt-3')}
        >
          <FilterChip
            ariaLabel={`${title} an oder auswählen`}
            otherClassNames="w-full"
            handleClick={handleToggle}
          >
            {legendContent}
          </FilterChip>
        </div>
      </div>
    </div>
  )
}
