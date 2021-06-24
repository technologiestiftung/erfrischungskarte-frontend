import { render } from '@testing-library/react'
import { Head } from '.'
import * as nextRouter from 'next/router'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  pathname: '/map',
})

describe('Head component', () => {
  test('should render without crashing without query', () => {
    useRouter.mockReturnValue({
      query: {},
      pathname: '/map',
    })
    render(<Head />)
  })
  test('should render without crashing with query', () => {
    useRouter.mockReturnValue({
      query: {
        latitude: '12.23525',
        longitude: '16.23525',
        zoom: '3',
      },
      pathname: '/about',
    })
    render(<Head />)
  })
})
