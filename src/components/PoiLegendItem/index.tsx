import { FC, HTMLAttributes } from 'react'

export interface PoiLegendItemType extends HTMLAttributes<HTMLElement> {
  label: string
  fill: string
  border: string
}

export const PoiLegendItem: FC<PoiLegendItemType> = ({
  label,
  fill,
  border,
  ...otherProps
}) => {
  return (
    <div className="flex items-center" {...otherProps}>
      <span
        // here the size of the circle and the border are set
        className="inline-block w-4 h-4 self-baseline rounded-full shadow-md border-2"
        style={{ backgroundColor: fill, borderColor: border }}
      ></span>
      <span className="ml-1 text-gray-700 text-sm">{label}</span>
    </div>
  )
}
