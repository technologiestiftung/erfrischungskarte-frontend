import React from 'react'
import { render, screen } from '@testing-library/react'
import { FullScreenMapWrapper } from '.'

describe('FullScreenMapWrapper', () => {
  it('renders markup in screen corners if markup is provided', () => {
    render(
      <FullScreenMapWrapper
        topLeft={<div>Top left</div>}
        topRight={<div>Top right</div>}
        bottomLeft={<div>Bottom left</div>}
        bottomRight={<div>Bottom right</div>}
      ></FullScreenMapWrapper>
    )
    const topLeftContent = screen.getByText(/Top left/i)
    const topRightContent = screen.getByText(/Top right/i)
    const bottomLeftContent = screen.getByText(/Bottom left/i)
    const bottomRightContent = screen.getByText(/Bottom right/i)

    expect(topLeftContent).toBeInTheDocument()
    expect(topRightContent).toBeInTheDocument()
    expect(bottomLeftContent).toBeInTheDocument()
    expect(bottomRightContent).toBeInTheDocument()
  })
  it('renders its children', () => {
    render(
      <FullScreenMapWrapper>
        <div>Map canvas root element</div>
      </FullScreenMapWrapper>
    )
    const mapCanvasRoot = screen.getByText(/Map canvas root element/i)

    expect(mapCanvasRoot).toBeInTheDocument()
  })
})
