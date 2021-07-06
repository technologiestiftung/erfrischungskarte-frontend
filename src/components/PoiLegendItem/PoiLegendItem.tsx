import { render, screen } from '@testing-library/react'
import { PoiLegendItem } from '.'

describe('PoiLegendItem', () => {
  it('renders a legend item', () => {
    render(<PoiLegendItem label="some label" color="#ff0000" />)

    const label = screen.getByText(/some label/i)
    expect(label).toBeInTheDocument()
  })
})
