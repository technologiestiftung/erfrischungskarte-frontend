import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Karte',
    query,
  },
})

export const Map: FC = () => null

export default Map
