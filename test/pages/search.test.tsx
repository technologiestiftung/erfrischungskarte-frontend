import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Search } from '../../pages/search'
import { SEARCH_SUGGESTIONS } from '@modules/RefreshmentMap/content'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('Search page', () => {
  it('should render a heading', () => {
    render(<Search />)

    const heading = screen.getByRole('heading', { name: 'Standort' })
    expect(heading).toBeInTheDocument()
  })
  it('should render a search input', () => {
    render(<Search />)

    const textInput = screen.getByRole('textbox')
    expect(textInput).toBeInTheDocument()
  })
  it('should render each POI suggestion', () => {
    render(<Search />)

    SEARCH_SUGGESTIONS.forEach(({ properties }) => {
      const name = screen.getByRole('heading', { name: properties.name })
      expect(name).toBeInTheDocument()
    })
  })
  it('should change the input value when typing', () => {
    render(<Search />)

    const textInputBefore = screen.getByRole('textbox')

    fireEvent.change(textInputBefore, 'Berlin')

    const textInputAfter = screen.getByRole('textbox') as HTMLInputElement

    expect(textInputAfter).toBeInTheDocument()
  })
})
