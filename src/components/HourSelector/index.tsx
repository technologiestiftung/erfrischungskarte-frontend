import { CrossIcon } from '@components/Icons'
import { HOURS } from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import styles from './HourSelector.module.css'

interface HourSelectorPropType {
  activeHourKey: keyof typeof HOURS
  onChange: (newKey: keyof typeof HOURS) => void
}

interface HourPositionType {
  x: number
  y: number
}

const hoursPositions: Record<string, HourPositionType> = {
  '10': { x: 15.9611, y: 43.0767 },
  '11': { x: 45.0767, y: 15.9021 },
  '12': { x: 81.9568, y: 6.19678 },
  '13': { x: 118.837, y: 15.9021 },
  '14': { x: 147.953, y: 43.0767 },
  '15': { x: 155.716, y: 79.9568 },
  '16': { x: 147.953, y: 116.837 },
  '17': { x: 118.837, y: 144.011 },
  '18': { x: 81.9568, y: 153.717 },
  '19': { x: 45.0767, y: 144.011 },
  '20': { x: 15.9611, y: 116.837 },
  '21': { x: 8.19678, y: 79.9568 },
}

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
    x={x - buttonSize}
    y={y - buttonSize}
    width={buttonSize * 4}
    height={buttonSize * 4}
    filterUnits="userSpaceOnUse"
    colorInterpolationFilters="sRGB"
  >
    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="lightgrey" />
  </filter>
)

export const HourSelector: FC<HourSelectorPropType> = ({
  activeHourKey,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(true)

  return (
    <div className="w-48 h-48 relative">
      {isOpened && (
        <button
          className={classNames(
            'absolute -top-4 right-6 transform translate-x-full',
            'w-10 h-10 rounded-full shadow-lg bg-white transition',
            'grid place-items-center hover:bg-gray-800 hover:text-white',
            'focus:outline-none focus:ring-2 focus:ring-gray-800',
            'focus:ring-offset-2 focus:ring-offset-white z-50'
          )}
          onClick={() => setIsOpened(false)}
        >
          <CrossIcon />
        </button>
      )}
      <div
        className={classNames(
          'absolute w-48 h-48 grid place-items-center inset-0'
        )}
      >
        <div
          style={{ borderWidth: 40 }}
          className={classNames(
            'outer-ring w-24 h-24 rounded-full',
            'border-white box-content opacity-90',
            'transform transition',
            isOpened ? 'scale-110 opacity-90 delay-200' : 'scale-50 opacity-0'
          )}
        />
      </div>
      <div className="absolute w-48 h-48 grid place-items-center inset-0">
        <button
          onClick={() => !isOpened && setIsOpened(true)}
          tabIndex={isOpened ? -1 : 0}
          className={classNames(
            'inner-ring w-24 h-24',
            'flex flex-col place-items-center justify-center',
            'rounded-full bg-white shadow-lg delay-100',
            'transform origin-top-right transition',
            'focus:outline-none',
            !isOpened && [
              'focus:ring-3 focus:ring-gray-800',
              'hover:bg-gray-800 hover:text-white',
              'select-none cursor-pointer',
            ],
            isOpened
              ? 'scale-100 translate-x-0 translate-y-0'
              : 'scale-75 translate-x-16 -translate-y-14'
          )}
        >
          <span className="text-4xl leading-8">{activeHourKey}</span>
          <span className="text-sm">Uhr</span>
        </button>
      </div>
      <div
        className={classNames(
          'absolute w-48 h-48 grid place-items-center',
          'inset-0 transform transition',
          isOpened ? 'scale-100 opacity-90 delay-200' : 'scale-50 opacity-0'
        )}
      >
        <svg
          width="195"
          height="195"
          viewBox="0 0 195 195"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Object.keys(hoursPositions).map((key) => {
            const { x, y } = hoursPositions[key]
            return (
              <g
                key={key}
                className={classNames(
                  styles.hourButton,
                  key === activeHourKey && styles.hourButtonActive
                )}
                onClick={() => onChange(key as keyof typeof HOURS)}
              >
                <g filter={`url(#shadow-${key})`}>
                  <rect x={x} y={y} {...hourButtonCommonProps} />
                </g>
                <text
                  fontSize={14}
                  fill="#000"
                  x={x + buttonSize / 2}
                  y={y + buttonSize / 2 + 1}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {key}
                </text>
              </g>
            )
          })}
          <defs>
            {Object.keys(hoursPositions).map((key) => {
              const { x, y } = hoursPositions[key]
              return (
                <HourButtonShadow
                  x={x}
                  y={y}
                  key={`shadow-${key}`}
                  id={`shadow-${key}`}
                />
              )
            })}
          </defs>
        </svg>
      </div>
    </div>
  )
}
