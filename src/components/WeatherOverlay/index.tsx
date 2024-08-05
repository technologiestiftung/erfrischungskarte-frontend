import {
  CrossIcon,
  WindSpeedIcon,
  PrecipitationIcon,
  CloudIcon,
  PressureIcon,
  ClearDayIcon,
  RainyIcon,
  CloudyIcon,
  PartlyCloudyDayIcon,
  WindyIcon,
  ThunderstormIcon,
  ClearNightIcon,
  PartlyCloudyNightIcon,
} from '@components/Icons'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import useClickOutside from '@lib/hooks/useClickOutside'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import styles from './WeatherOverlay.module.css'

interface WeatherOptionPropType {
  value: ReactNode
  icon: ReactNode
}

interface WeatherType {
  timestamp: string | null | undefined
  temperature: number | null | undefined
  precipitation: number | null | undefined
  wind_speed: number | null | undefined
  cloud_cover: number | null | undefined
  pressure_msl: number | null | undefined
  icon:
    | 'clear-day'
    | 'rain'
    | 'partly-cloudy-day'
    | 'thunderstorm'
    | 'snow'
    | 'hail'
    | 'clear-night'
    | 'partly-cloudy-night'
    | 'cloudy'
    | 'sleet'
    | 'fog'
    | 'wind'
}

interface SourceType {
  station_name: string
}

interface WeatherAPIResponseType {
  weather: WeatherType[]
  sources: SourceType[]
}

export const WeatherOption: FC<WeatherOptionPropType> = ({ icon, value }) => {
  return (
    <div className="flex last-of-type:mb-0 mb-1">
      <div className="pr-4 flex">
        {icon}
        <p className="text-sm text-gray-400 italic pl-2">{value}</p>
      </div>
    </div>
  )
}

export const WeatherOverlay: FC = () => {
  const [isWeatherOpened, setIsWeatherOpened] = useState(false)
  const { query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const elRef = useClickOutside<HTMLDivElement>(() => setIsWeatherOpened(false))

  const [weatherRecords, setWeatherRecords] = useState<WeatherType[] | null>(
    null
  )
  const [weatherStation, setWeatherStation] = useState<
    SourceType['station_name'] | null
  >(null)

  const current = new Date()
  const date = `${current.getDate()}.${
    current.getMonth() + 1
  }.${current.getFullYear()}`
  const day = current.getDate().toString().padStart(2, '0')
  const month = (current.getMonth() + 1).toString().padStart(2, '0')
  const dateAPI = `${current.getFullYear()}-${month.slice(-2)}-${day}`

  const currentHour = current.getHours()
  const hour = mappedQuery.visibleHour || currentHour

  const ICON_MAPPING = {
    'clear-day': <ClearDayIcon />,
    'partly-cloudy-day': <PartlyCloudyDayIcon />,
    rain: <RainyIcon />,
    wind: <WindyIcon />,
    thunderstorm: <ThunderstormIcon />,
    cloudy: <CloudyIcon />,
    fog: <CloudyIcon />,
    snow: <CloudyIcon />,
    sleet: <CloudyIcon />,
    hail: <CloudyIcon />,
    'clear-night': <ClearNightIcon />,
    'partly-cloudy-night': <PartlyCloudyNightIcon />,
  }

  useEffect(() => {
    if (!mappedQuery.latitude || !mappedQuery.longitude) return

    fetch(
      `https://api.brightsky.dev/weather?lat=${mappedQuery.latitude}&lon=${mappedQuery.longitude}&date=${dateAPI}`
    )
      .then((response) => response.json())
      .then((data: WeatherAPIResponseType) => {
        console.log(data)
        const station = data.sources[0].station_name
        const weatherData = data.weather
        const weatherVariables = weatherData.map(
          (hourlyData) =>
            ({
              timestamp: hourlyData.timestamp,
              temperature: hourlyData.temperature,
              precipitation: hourlyData.precipitation,
              wind_speed: hourlyData.wind_speed,
              cloud_cover: hourlyData.cloud_cover,
              pressure_msl: hourlyData.pressure_msl,
              icon: hourlyData.icon,
            } as unknown as Pick<
              WeatherType,
              | 'timestamp'
              | 'temperature'
              | 'precipitation'
              | 'wind_speed'
              | 'cloud_cover'
              | 'pressure_msl'
              | 'icon'
            >)
        )
        setWeatherRecords(weatherVariables)
        setWeatherStation(station)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error)
      })
  }, [])

  return (
    <span ref={elRef}>
      {weatherRecords &&
        weatherRecords[hour] &&
        weatherRecords[hour].temperature && (
          <button
            onClick={() => setIsWeatherOpened(!isWeatherOpened)}
            aria-label="Wettervorhersage"
            className={classNames(
              styles.weatherButton,
              'rounded-full bg-white w-12 h-12',
              'fixed right-4 text-center py-2',
              'shadow-lg transition',
              'focus:outline-none focus:ring-2',
              isWeatherOpened && 'text-white bg-gray-800',
              isWeatherOpened && 'focus:ring-white',
              !isWeatherOpened && 'focus:ring-gray-800'
            )}
          >
            {' '}
            <span className="font-bold">
              {weatherRecords[hour].temperature?.toFixed()}
            </span>
            <span className="text-sm">°C</span>
          </button>
        )}
      {isWeatherOpened && weatherRecords && (
        <div
          className={classNames(
            'right-4 bottom-20 sm:bottom-4 sm:right-20',
            'rounded shadow-xl p-6 sm:p-8 w-96',
            'fixed bg-white flex flex-col'
          )}
          style={{ maxWidth: 'calc(100% - 32px)' }}
        >
          <h3 className="font-bold text-xl sm:text-2xl pr-20 mb-2">
            Wie wird das Wetter?{' '}
            <span className="text-layer-turquoise-300">
              Vorhersage für heute
            </span>
          </h3>
          <div className="flex mb-4 last-of-type:mb-0">
            <div className="pr-4">
              <p className="text-sm text-gray-400 italic mb-3">
                Stelle auf der Uhr die Uhrzeit ein, für die du das Wetter sehen
                möchtest.
              </p>
              <div className="flex">
                <h4 className="font-bold text-l">{`Heute ${hour} Uhr`}</h4>
                <p className="text-sm text-gray-400 italic pl-4 pt-0.5">
                  {`${date}`}
                </p>
              </div>
              {weatherStation && (
                <p className="text-sm text-gray-400 italic mb-1">
                  {`Wetterstation  ${weatherStation}`}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <div>
              {typeof weatherRecords[hour].precipitation !== 'undefined' && (
                <WeatherOption
                  icon={<PrecipitationIcon />}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  value={`${weatherRecords[hour].precipitation} mm/h`}
                />
              )}
              {typeof weatherRecords[hour].wind_speed !== 'undefined' && (
                <WeatherOption
                  icon={<WindSpeedIcon />}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  value={`${weatherRecords[hour].wind_speed} km/h`}
                />
              )}
              {typeof weatherRecords[hour].cloud_cover !== 'undefined' && (
                <WeatherOption
                  icon={<CloudIcon />}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  value={`${weatherRecords[hour].cloud_cover} %`}
                />
              )}
              {typeof weatherRecords[hour].pressure_msl !== 'undefined' && (
                <WeatherOption
                  icon={<PressureIcon />}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  value={`${weatherRecords[hour].pressure_msl} hPa`}
                />
              )}
            </div>
            <div className="flex m-auto font-medium text-xl">
              {ICON_MAPPING[weatherRecords[hour].icon]}
              {weatherRecords[hour].temperature && (
                <p className="my-auto mx-auto pl-6">
                  {weatherRecords[hour].temperature} °C
                </p>
              )}
            </div>
          </div>
          <button
            className={classNames(
              'absolute top-6 sm:top-8 right-6 sm:right-8 cursor-pointer',
              'w-10 h-10 grid place-content-center rounded-full',
              'focus:outline-none focus:ring-2 focus:ring-gray-800',
              'hover:bg-red transition'
            )}
            onClick={() => setIsWeatherOpened(false)}
          >
            <CrossIcon />
          </button>
        </div>
      )}
    </span>
  )
}
