import classNames from 'classnames'
import { FC, Fragment } from 'react'

interface HourSelectorPropType {
  isOpened: boolean
}

const hoursPositions = [
  { x: 81.9568, y: 6.19678 },
  { x: 155.716, y: 79.9568 },
  { x: 8.19678, y: 79.9568 },
  { x: 15.9611, y: 43.0767 },
  { x: 147.953, y: 43.0767 },
  { x: 147.953, y: 116.837 },
  { x: 15.9611, y: 116.837 },
  { x: 45.0767, y: 15.9021 },
  { x: 118.837, y: 15.9021 },
  { x: 118.837, y: 144.011 },
  { x: 45.0767, y: 144.011 },
  { x: 81.9568, y: 153.717 },
]

const buttonSize = 31.0568
const hourButtonCommonProps = {
  width: buttonSize,
  height: buttonSize,
  rx: buttonSize / 2,
  fill: 'white',
}
const HourButtonShadow: FC<{ x: number; y: number; id: string }> = ({
  x,
  y,
  id,
}) => (
  <filter
    id={id}
    x={x}
    y={y}
    width="47.0568"
    height="47.0568"
    filterUnits="userSpaceOnUse"
    colorInterpolationFilters="sRGB"
  >
    <feFlood floodOpacity="0" result="BackgroundImageFix" />
    <feColorMatrix
      in="SourceAlpha"
      type="matrix"
      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
    />
    <feMorphology
      radius="8"
      operator="erode"
      in="SourceAlpha"
      result="effect1_dropShadow"
    />
    <feOffset dy="2" />
    <feGaussianBlur stdDeviation="8" />
    <feColorMatrix
      type="matrix"
      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"
    />
    <feBlend
      mode="multiply"
      in2="BackgroundImageFix"
      result="effect1_dropShadow"
    />
    <feBlend
      mode="normal"
      in="SourceGraphic"
      in2="effect1_dropShadow"
      result="shape"
    />
  </filter>
)

export const HourSelector: FC<HourSelectorPropType> = () => (
  <div className="w-48 h-48 relative">
    <div className="absolute w-48 h-48 grid place-items-center inset-0">
      <div
        style={{ borderWidth: 40 }}
        className={classNames(
          'outer-ring w-24 h-24 rounded-full',
          'border-white box-content',
          'transform scale-110 opacity-90'
        )}
      />
    </div>
    <div className="absolute w-48 h-48 grid place-items-center inset-0">
      <div
        className={classNames(
          'inner-ring w-24 h-24',
          'flex flex-col place-items-center justify-center',
          'rounded-full bg-white shadow-lg'
        )}
      >
        <span className="text-4xl leading-8">14</span>
        <span className="text-sm">Uhr</span>
      </div>
    </div>
    <div className="absolute w-48 h-48 grid place-items-center inset-0transform scale-50">
      <svg
        width="195"
        height="195"
        viewBox="0 0 195 195"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hoursPositions.map(({ x, y }, idx) => (
          <Fragment key={`${x}-${y}`}>
            <g filter={`url(#shadow-${idx})`}>
              <rect x={x} y={y} {...hourButtonCommonProps} />
            </g>
            <text
              fill="#000"
              x={x + buttonSize / 2}
              y={y + buttonSize / 2 + 1}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {idx}
            </text>
          </Fragment>
        ))}
        <defs>
          {hoursPositions.map(({ x, y }, idx) => (
            <HourButtonShadow
              x={x}
              y={y}
              key={`shadow-${idx}`}
              id={`shadow-${idx}`}
            />
          ))}
        </defs>
      </svg>
    </div>
  </div>
)
