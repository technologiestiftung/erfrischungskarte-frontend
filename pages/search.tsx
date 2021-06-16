import { InternalLink } from '@components/InternalLink'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Suchen',
    query,
  },
})

export const Search: FC<{
  query: ReturnType<typeof mapRawQueryToState>
  title: string
}> = ({ query }) => (
  <div>
    <InternalLink href="/">Home</InternalLink>
    <pre>{JSON.stringify(query, null, 2)}</pre>
  </div>
)

export default Search
