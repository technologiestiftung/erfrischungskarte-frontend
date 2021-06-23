import { GeoPinIcon } from '@components/Icons'
import { SearchResultType, useGeocodedPlace } from '@lib/hooks/useGeocodedPlace'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import {
  POI_DATA,
  SearchSuggestionItemType,
  SEARCH_SUGGESTIONS,
} from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'

interface SearchSuggestionItemPropType extends SearchSuggestionItemType {
  onClick: () => void
}

interface SearchResultItemPropType extends SearchResultType {
  searchTerm: string
  onClick: () => void
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Suchen',
    query,
  },
})

const SearchSuggestionItem: FC<SearchSuggestionItemPropType> = ({
  properties,
  onClick,
}) => (
  <button
    className={classNames(
      'flex items-center pt-3 text-left w-full',
      'hover:bg-gray-100 rounded transition px-4 -ml-4',
      'group focus:outline-none focus:ring-2 focus:ring-gray-800',
      'focus:ring-gray-800 focus:z-10 relative'
    )}
    style={{ width: 'calc(100% + 32px)' }}
    onClick={onClick}
  >
    <span
      className={classNames(
        'rounded-full w-4 h-4 border-4 border-white shadow-md',
        'transform -translate-y-2 mr-3'
      )}
      style={{
        backgroundColor: POI_DATA.fillColorMap.get(properties.category),
      }}
    />
    <div
      className={classNames(
        'pb-2 border-b border-gray-300 flex-grow border-dashed',
        'group-hover:border-opacity-0 group-focus:border-opacity-0 transition'
      )}
    >
      <h6 className="text-sm leading-4 mb-1">{properties.name}</h6>
      <div className="flex flex-wrap">
        <span className="text-sm text-gray-500 inline-block mr-1">
          {properties.category}
        </span>
        <span className="text-sm text-gray-400 italic">
          (&thinsp;{properties.conditions}&thinsp;)
        </span>
      </div>
    </div>
  </button>
)

const SearchResultItem: FC<SearchResultItemPropType> = ({
  name,
  searchTerm,
  onClick,
}) => {
  const indexOfTerm = name.toLowerCase().indexOf(searchTerm.toLowerCase())
  const before = name.slice(0, indexOfTerm)
  const after = name.slice(indexOfTerm + searchTerm.length, name.length)
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex gap-2 items-center pt-3 text-left w-full',
        'hover:bg-gray-100 rounded transition px-4 -ml-4',
        'group focus:outline-none focus:ring-2 focus:ring-gray-800',
        'focus:ring-gray-800 focus:z-10 relative'
      )}
      style={{ width: 'calc(100% + 32px)' }}
    >
      <span className="text-gray-300 transform -translate-y-2">
        <GeoPinIcon />
      </span>
      <div
        className={classNames(
          'pb-2 border-b border-gray-300 flex-grow border-dashed',
          'group-hover:border-opacity-0 group-focus:border-opacity-0 transition'
        )}
      >
        <h6 className="text-sm leading-4">
          {indexOfTerm === -1 ? (
            name
          ) : (
            <>
              {before}
              <span className="text-gray-400 text-light">{searchTerm}</span>
              {after}
            </>
          )}
        </h6>
      </div>
    </button>
  )
}

export const Search: FC = () => {
  const [inputVal, setInpuval] = useState('')
  const { pathname, push, query } = useRouter()
  const hasMobileSize = useHasMobileSize()
  const mappedQuery = mapRawQueryToState(query)
  const { results } = useGeocodedPlace(inputVal)

  const clickHandler = useCallback(
    (coordinates: [latitude: number, longitude: number]) => {
      const nextQuery = {
        ...mappedQuery,
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom: 16,
      }
      void push(
        { pathname: hasMobileSize ? '/map' : pathname, query: nextQuery },
        undefined,
        { shallow: true }
      )
    },
    [push, pathname, mappedQuery, hasMobileSize]
  )

  return (
    <div>
      <h4 className="font-bold text-xl hidden sm:block">Standort</h4>
      <p className="text-sm text-gray-500 hidden sm:block">
        Finde deinen Bezirk, deine Straße oder einen anderen Ort in Berlin.
      </p>

      <input
        type="text"
        placeholder="Gib hier einen Ort an"
        value={inputVal}
        onChange={(evt) => setInpuval(evt.target.value)}
        className={classNames(
          'block px-3 py-2 border rounded border-gray-400 w-full',
          'my-4 focus:outline-none focus:ring-2 focus:ring-gray-800',
          'focus:ring-offset-2 focus:ring-offset-white'
        )}
      />
      {!inputVal && (
        <>
          <h5 className="font-bold text-sm mb-2">Vorschläge für den Start:</h5>
          <ul>
            {SEARCH_SUGGESTIONS.map((item) => (
              <li
                key={`${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`}
              >
                <SearchSuggestionItem
                  {...item}
                  onClick={() => clickHandler(item.geometry.coordinates)}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {inputVal && results && (
        <ul>
          {results.map((item) => (
            <li key={`${item.id}`}>
              <SearchResultItem
                {...item}
                searchTerm={inputVal}
                onClick={() => clickHandler([item.latitude, item.longitude])}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
