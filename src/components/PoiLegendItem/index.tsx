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
        className="inline-block w-5 h-5 self-baseline rounded-full shadow-md border-4 border-white"
        style={{ backgroundColor: color }}
      ></span>
      <span className="ml-1 text-gray-700">{label}</span>
    </div>
  )
}
