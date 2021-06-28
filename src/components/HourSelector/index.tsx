import { CrossIcon } from '@components/Icons'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { HOURS } from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import colors from '../../style/colors'
import styles from './HourSelector.module.css'

interface HourSelectorPropType {
  activeHourKey: keyof typeof HOURS
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

export const HourSelector: FC<HourSelectorPropType> = ({ activeHourKey }) => {
  const hasMobileSize = useHasMobileSize()
  const { pathname, replace, push, query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const { showShadows, showTemperature, showWind } = mappedQuery
  const areAllHourBasedFiltersDisabled =
    showShadows === false && showTemperature === false && showWind === false
  const componentIsMounted = useRef(true)
  const [isOpened, setIsOpened] = useState<boolean>(true)

  useEffect(
    () => () => {
      componentIsMounted.current = false
    },
    []
  )

  const onChange = useCallback(
    (hour: keyof typeof HOURS): void => {
      const allFiltersOn = {
        showShadows: true,
        showTemperature: true,
        showWind: true,
      }
      const filterReset = areAllHourBasedFiltersDisabled ? allFiltersOn : {}
      void replace(
        {
          query: {
            ...mappedQuery,
            ...filterReset,
            visibleHour: hour,
          },
        },
        undefined
      )
    },
    [areAllHourBasedFiltersDisabled, mappedQuery, replace]
  )

  useEffect(() => {
    if (hasMobileSize) setIsOpened(false)
    if (!hasMobileSize) setIsOpened(true)
  }, [hasMobileSize])

  useEffect(() => {
    if (hasMobileSize && pathname !== '/map') setIsOpened(false)
  }, [hasMobileSize, pathname])

  return (
    <div
      className={classNames(
        'absolute transform z-50',
        hasMobileSize && 'right-16 bottom-24',
        !hasMobileSize && 'top-8 right-8',
        !isOpened && 'pointer-events-none'
      )}
    >
      <div className="w-48 h-48 relative">
        {isOpened && (
          <button
            aria-label="close-hour-selector"
            className={classNames(
              'absolute pointer-events-auto',
              'w-10 h-10 rounded-full shadow-lg bg-white transition',
              'flex items-center justify-center hover:bg-gray-800 hover:text-white',
              'focus:outline-none focus:ring-2 focus:ring-gray-800',
              'focus:ring-offset-2 focus:ring-offset-white z-50',
              !hasMobileSize && '-top-4 right-6 transform translate-x-full',
              hasMobileSize && 'top-1/2 -right-12 transform -translate-y-1/2'
            )}
            onClick={() => setIsOpened(false)}
          >
            <CrossIcon />
          </button>
        )}
        <div className="absolute w-48 h-48 grid place-items-center inset-0">
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
            aria-label={
              !isOpened ? 'open-hour-selector' : 'hour-selector-closed'
            }
            onClick={async () => {
              if (isOpened) return
              if (!hasMobileSize) return setIsOpened(true)
              await push({ pathname: '/map', query: mappedQuery })
              componentIsMounted && setIsOpened(true)
            }}
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
                'select-none cursor-pointer pointer-events-auto',
                'shadow-none border-2 border-gray-300',
              ]
            )}
            style={{
              transform: classNames(
                isOpened && 'scale(1) translate(0, 0)',
                !isOpened &&
                  !hasMobileSize &&
                  'scale(.75) translate(80px, -80px)',
                !isOpened && hasMobileSize && 'scale(.5) translate(145%, 346px)'
              ),
            }}
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
                  role="button"
                  aria-label={
                    key === activeHourKey
                      ? `active-hour-${key}`
                      : `select-hour-${key}`
                  }
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
            <g
              role="button"
              aria-label="night-indicator"
              className={styles.nightIndicator}
              transform={`translate(${8.19678}, ${79.9568})`}
            >
              <rect
                x={0}
                y={0}
                {...hourButtonCommonProps}
                fill={colors['night-indicator-sky']}
              />
              <g transform={`translate(${4}, ${6}) scale(0.9)`}>
                <path
                  d="M9.00032 19C15.0755 19 20.0003 14.0751 20.0003 7.99999C20.0003 6.1059 19.5216 4.32362 18.6785 2.76755C21.2894 4.57186 23.0001 7.58615 23.0001 11C23.0001 16.5228 18.5229 21 13.0001 21C10.6065 21 8.40939 20.1591 6.68799 18.7565C7.43356 18.916 8.20714 19 9.00032 19Z"
                  fill={colors['night-indicator-moon']}
                />
                <path
                  d="M7 0L7.44028 3.91389C7.59678 5.30518 8.69483 6.40322 10.0861 6.55972L14 7L10.0861 7.44028C8.69482 7.59678 7.59678 8.69483 7.44028 10.0861L7 14L6.55972 10.0861C6.40322 8.69482 5.30517 7.59678 3.91388 7.44028L0 7L3.91389 6.55972C5.30518 6.40322 6.40322 5.30517 6.55972 3.91388L7 0Z"
                  fill={colors['night-indicator-moon']}
                />
              </g>
            </g>

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
    </div>
  )
}
