import { render, screen } from '@testing-library/react'
import { LayerLegendFigure } from '.'

describe('LayerLegendFigure', () => {
  it('renders min and max label if provided', () => {
    render(
      <LayerLegendFigure minLabel="min" maxLabel="max">
        <div className="h-3 bg-gray-400"></div>
      </LayerLegendFigure>
    )

    const min = screen.getByText(/min/i)
    expect(min).toBeInTheDocument()

    const max = screen.getByText(/max/i)
    expect(max).toBeInTheDocument()
  })

  it('renders its children', () => {
    render(
      <LayerLegendFigure minLabel="min" maxLabel="max">
        <div className="h-3 bg-gray-400" id="test"></div>
      </LayerLegendFigure>
    )

    const children = document.querySelector('#test')
    expect(children).toBeInTheDocument()
  })
})
