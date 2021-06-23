import { render, screen } from '@testing-library/react'
import { Warning } from '.'

describe('Warning', () => {
  it('renders its children AKA the warning message/content', () => {
    render(<Warning>Warning content</Warning>)

    const warningContent = screen.getByText(/Warning content/i)
    expect(warningContent).toBeInTheDocument()
  })

  it('renders a warning icon', () => {
    render(<Warning>Warning content</Warning>)

    const warningSVG = document.querySelector('svg')
    expect(warningSVG).toBeInTheDocument()
  })
})
