import { render, screen } from '@testing-library/react'
import { LayerLegendContent } from '.'

describe('LayerLegendContent', () => {
  it('renders min and max label if provided', () => {
    render(
      <LayerLegendContent minLabel="min" maxLabel="max">
        <div className="h-3 bg-gray-400"></div>
      </LayerLegendContent>
    )

    const min = screen.getByText(/min/i)
    expect(min).toBeInTheDocument()

    const max = screen.getByText(/max/i)
    expect(max).toBeInTheDocument()
  })

  it('renders its children', () => {
    render(
      <LayerLegendContent minLabel="min" maxLabel="max">
        <div className="h-3 bg-gray-400" id="test"></div>
      </LayerLegendContent>
    )

    const children = document.querySelector('#test')
    expect(children).toBeInTheDocument()
  })
})
