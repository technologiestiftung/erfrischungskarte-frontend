import { render, screen } from '@testing-library/react'
import { FilterChip } from '.'

describe('FilterChip', () => {
  it('renders its content accessibly', () => {
    render(<FilterChip ariaLabel="aria label content">I am visible</FilterChip>)

    const accessibleFilterChip = screen.getByLabelText(/aria label content/i)
    expect(accessibleFilterChip).toBeInTheDocument()

    const visualFilterChip = screen.getByText(/I am visible/i)
    expect(visualFilterChip).toBeInTheDocument()
  })

  it('has selected styles by default', () => {
    render(<FilterChip ariaLabel="aria label content">I am visible</FilterChip>)

    const button = screen.getByRole('button')
    expect(button.getAttribute('class')?.includes('border-gray-400')).toBe(true)
    expect(button.getAttribute('class')?.includes('opacity-100')).toBe(true)
  })

  it('has deselected styles if deselected', () => {
    render(
      <FilterChip ariaLabel="aria label content" isSelected={false}>
        I am visible
      </FilterChip>
    )

    const button = screen.getByRole('button')
    expect(button.getAttribute('class')?.includes('border-gray-200')).toBe(true)
    expect(button.getAttribute('class')?.includes('opacity-50')).toBe(true)
  })
})
