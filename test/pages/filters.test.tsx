import { render, screen } from '@testing-library/react'
import React from 'react'
import * as nextRouter from 'next/router'
import { Filters } from '../../pages/filters'
import * as hasWebPSupport from '@lib/hooks/useHasWebPSupport'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter

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
    useRouter.mockReturnValue({
      query: {},
    })

    render(<Filters query={{}} />)

    const supportNote = screen.queryByText(/Leider können die Schatten/i)
    expect(supportNote).not.toBeInTheDocument()
  })

  it('displays a note if webp is not supported', () => {
    useHasWebPSupport.mockReturnValue(false)
    useRouter.mockReturnValue({
      query: {},
    })

    render(<Filters query={{}} />)

    const supportNote = screen.getByText(/Leider können die Schatten/i)
    expect(supportNote).toBeInTheDocument()
  })

  it('explains wind/temperature color blend when no query provided (both filters active by default)', () => {
    useHasWebPSupport.mockReturnValue(true)
    useRouter.mockReturnValue({
      query: {},
    })

    render(<Filters query={{}} />)

    const turquoiseNote = screen.getByText(/Aufgepasst/i)
    expect(turquoiseNote).toBeInTheDocument()
  })

  it('hides wind/temperature color blend note when one filter is false', () => {
    useHasWebPSupport.mockReturnValue(true)
    useRouter.mockReturnValue({
      query: {
        showWind: 'false',
      },
    })

    render(<Filters query={{}} />)

    const turquoiseNote = screen.queryByText(/Aufgepasst/i)
    expect(turquoiseNote).not.toBeInTheDocument()
  })

  it('explains wind/temperature color blend when both filters are true in query', () => {
    useHasWebPSupport.mockReturnValue(true)
    useRouter.mockReturnValue({
      query: {
        showWind: 'true',
        showTemperature: 'true',
      },
    })

    render(<Filters query={{}} />)

    const turquoiseNote = screen.getByText(/Aufgepasst/i)
    expect(turquoiseNote).toBeInTheDocument()
  })
})
