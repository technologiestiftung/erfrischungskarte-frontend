import { render, screen, fireEvent } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { MobileSearch } from '.'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter

describe('MobileSearch', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      query: {},
      push: jest.fn().mockResolvedValue(true),
      pathname: '/map',
    })
  })

  test('should render search input with placeholder', () => {
    render(<MobileSearch />)
    const input = screen.getByPlaceholderText('Suche...')
    expect(input).toBeInTheDocument()
  })

  test('should open suggestions when input is focused', () => {
    render(<MobileSearch />)
    const input = screen.getByPlaceholderText('Suche...')
    fireEvent.focus(input)
    const suggestionsHeader = screen.getByText('Vorschläge:')
    expect(suggestionsHeader).toBeInTheDocument()
  })

  test('should change value when typed', () => {
    render(<MobileSearch />)
    const input = screen.getByPlaceholderText('Suche...')
    fireEvent.change(input, { target: { value: 'Lichtenberg' } })
    expect(input).toHaveValue('Lichtenberg')
  })
})
