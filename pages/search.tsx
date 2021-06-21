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
          <h5 className="font-bold text-sm">Vorschläge für den Start:</h5>
        </>
      )}
    </div>
  )
}

export default Search
