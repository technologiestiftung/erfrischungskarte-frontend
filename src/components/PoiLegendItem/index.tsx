import { FC, HTMLAttributes } from 'react'

export interface PoiLegendItemType extends HTMLAttributes<HTMLElement> {
  label: string
  color: string
}

export const PoiLegendItem: FC<PoiLegendItemType> = ({
  label,
  color,
  ...otherProps
}) => {
  return (
    <div className="flex items-center" {...otherProps}>
      <span
        className="inline-block w-4 h-4 self-baseline rounded-full shadow-md border-2 border-white"
        style={{ backgroundColor: color }}
      ></span>
      <span className="ml-1 text-gray-700 text-sm">{label}</span>
    </div>
  )
}
