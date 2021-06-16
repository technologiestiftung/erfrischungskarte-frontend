import { InternalLink } from '@components/InternalLink'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Karte',
    query,
  },
})

export const Home: FC<{
  query: ReturnType<typeof mapRawQueryToState>
}> = ({ query }) => (
  <div>
    <InternalLink href="/about">
      <a href="/about">Home</a>
    </InternalLink>
    <pre>{JSON.stringify(query, null, 2)}</pre>
  </div>
)

export default Home
