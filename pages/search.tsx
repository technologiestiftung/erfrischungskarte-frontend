import {
  POI_DATA,
  SearchSuggestionItemType,
  SEARCH_SUGGESTIONS,
} from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Suchen',
    query,
  },
})

const SearchSuggestionItem: FC<SearchSuggestionItemType> = ({ properties }) => (
  <button
    className={classNames(
      'flex gap-4 items-center pt-3 text-left w-full',
      'hover:bg-gray-100 rounded transition px-4 -ml-4',
      'group focus:outline-none focus:ring-2 focus:ring-gray-800',
      'focus:ring-gray-800 focus:z-10 relative'
    )}
    style={{ width: 'calc(100% + 32px)' }}
  >
    <span
      className={classNames(
        'rounded-full w-4 h-4 border-4 border-white shadow-md',
        'transform -translate-y-2'
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
      <h6 className="text-sm leading-4">{properties.name}</h6>
      <span className="text-sm text-gray-500">{properties.category}</span>
    </div>
  </button>
)

export const Search: FC = () => {
  const [inputVal, setInpuval] = useState('')

  return (
    <div>
      <h4 className="font-bold text-xl">Standort</h4>
      <p className="text-sm text-gray-500 hidden sm:block">
        Finde deinen Bezirk, deine Straße oder einen anderen Ort in Berlin.
      </p>

      <input
        type="text"
        placeholder="Geben Sie einen Ort an"
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
                <SearchSuggestionItem {...item} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Search
