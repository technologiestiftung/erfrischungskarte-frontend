import { render } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { SocialImage } from '../../pages/social-image'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter

describe('SocialImage page', () => {
  it('renders without crashing without query', () => {
    useRouter.mockReturnValue({
      query: {},
    })
    render(<SocialImage />)
  })
  it('renders without crashing with query', () => {
    useRouter.mockReturnValue({
      query: {
        latitude: '12.23525',
        longitude: '16.23525',
        zoom: '3',
      },
      pathname: '/about',
    })
    render(<SocialImage />)
  })
})
