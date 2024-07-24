import { render, screen } from '@testing-library/react'
import { PoiLegendItem } from '.'

describe('PoiLegendItem', () => {
  it('renders a legend item', () => {
    render(<PoiLegendItem label="some label" fill="#ff0000" border="#000000" />)

    const label = screen.getByText(/some label/i)
    expect(label).toBeInTheDocument()
  })
})
