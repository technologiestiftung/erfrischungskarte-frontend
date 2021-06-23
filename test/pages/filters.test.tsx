import { render, screen } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Filters } from '../../pages/filters'
import * as hasWebPSupport from '@lib/hooks/useHasWebPSupport'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <img src={src} alt={alt} />
})

const useHasWebPSupport = jest.fn()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
hasWebPSupport.useHasWebPSupport = useHasWebPSupport

describe('Filters page', () => {
  it('renders without crashing', () => {
    useHasWebPSupport.mockReturnValue(true)

    render(<Filters query={{}} />)

    const supportNote = screen.queryByText(/Leider können die Schatten/i)
    expect(supportNote).not.toBeInTheDocument()
  })

  it('displays a note if webp is not supported', () => {
    useHasWebPSupport.mockReturnValue(false)

    render(<Filters query={{}} />)

    const supportNote = screen.getByText(/Leider können die Schatten/i)
    expect(supportNote).toBeInTheDocument()
  })
})
