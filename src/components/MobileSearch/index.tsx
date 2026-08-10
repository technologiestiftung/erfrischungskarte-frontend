import { GeoPinIcon } from '@components/Icons'
import useClickOutside from '@lib/hooks/useClickOutside'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useGeocodedPlace } from '@lib/hooks/useGeocodedPlace'
import { SEARCH_SUGGESTIONS, POI_DATA } from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC, useState, useCallback } from 'react'

export const MobileSearch: FC = () => {
  const [inputVal, setInputVal] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { pathname, push, query } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const { results } = useGeocodedPlace(inputVal)
  const elRef = useClickOutside<HTMLDivElement>(() => setIsFocused(false))

  const clickHandler = useCallback(
    (coordinates: [latitude: number, longitude: number]) => {
      const nextQuery = {
        ...mappedQuery,
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom: 16,
      }
      void push({ pathname, query: nextQuery }, undefined, { shallow: true })
      setInputVal('')
      setIsFocused(false)
    },
    [push, pathname, mappedQuery]
  )

  return (
    <div
      ref={elRef}
      className="flex-grow flex flex-col relative pointer-events-auto ml-2 mr-[60px] max-w-[240px] xs:max-w-xs"
    >
      <input
        type="text"
        placeholder="Suche..."
        value={inputVal}
        onFocus={() => setIsFocused(true)}
        onChange={(evt) => setInputVal(evt.target.value)}
        className={classNames(
          'block px-3 py-2 border rounded-lg border-gray-200 w-full h-10',
          'bg-white shadow-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800'
        )}
      />

      {isFocused && (
        <div
          className={classNames(
            'absolute top-12 left-0 w-full bg-white shadow-xl rounded-lg',
            'border border-gray-200 p-4 max-h-[300px] overflow-y-auto z-40 text-left'
          )}
        >
          {!inputVal && (
            <>
              <h5 className="font-bold text-xs mb-2 text-gray-500">
                Vorschläge:
              </h5>
              <ul className="divide-y divide-gray-100">
                {SEARCH_SUGGESTIONS.map((item) => (
                  <li
                    key={`${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`}
                  >
                    <button
                      className="flex items-center py-2 text-left w-full hover:bg-gray-50 rounded px-2 -mx-2 transition focus:outline-none focus:ring-2 focus:ring-gray-800"
                      onClick={() => clickHandler(item.geometry.coordinates)}
                    >
                      <span
                        className="rounded-full w-3 h-3 border-2 border-white shadow-sm mr-2 flex-shrink-0"
                        style={{
                          backgroundColor: POI_DATA.fillColorMap.get(
                            item.properties.category
                          ),
                        }}
                      />
                      <div className="flex-grow min-w-0">
                        <h6 className="text-sm font-medium truncate text-gray-800">
                          {item.properties.name}
                        </h6>
                        <span className="text-xs text-gray-400 truncate block">
                          {item.properties.category} (
                          {item.properties.conditions})
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {inputVal && results && results.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {results.map((item) => {
                const indexOfTerm = item.name
                  .toLowerCase()
                  .indexOf(inputVal.toLowerCase())
                const before = item.name.slice(0, indexOfTerm)
                const after = item.name.slice(indexOfTerm + inputVal.length)
                return (
                  <li key={`${item.id}`}>
                    <button
                      className="flex items-center py-2 text-left w-full hover:bg-gray-50 rounded px-2 -mx-2 transition focus:outline-none focus:ring-2 focus:ring-gray-800"
                      onClick={() =>
                        clickHandler([item.latitude, item.longitude])
                      }
                    >
                      <span className="text-gray-400 mr-2 flex-shrink-0">
                        <GeoPinIcon />
                      </span>
                      <div className="flex-grow min-w-0">
                        <h6 className="text-sm font-medium truncate text-gray-800">
                          {indexOfTerm === -1 ? (
                            item.name
                          ) : (
                            <>
                              {before}
                              <span className="text-gray-400 font-normal">
                                {inputVal}
                              </span>
                              {after}
                            </>
                          )}
                        </h6>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          {inputVal && results && results.length === 0 && (
            <p className="text-sm text-gray-400 py-2">
              Keine Ergebnisse gefunden
            </p>
          )}
        </div>
      )}
    </div>
  )
}
