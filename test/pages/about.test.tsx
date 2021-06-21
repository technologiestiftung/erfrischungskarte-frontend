import { render, screen } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { About } from '../../pages/about'
import { ABOUT_ACCORDION_ITEMS } from '@modules/RefreshmentMap/content'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('About page', () => {
  it('should render all the titles', () => {
    render(<About />)

    ABOUT_ACCORDION_ITEMS.forEach(({ title }) => {
      const titleEl = screen.getByRole('heading', { name: title })
      expect(titleEl).toBeInTheDocument()
    })
  })
})
