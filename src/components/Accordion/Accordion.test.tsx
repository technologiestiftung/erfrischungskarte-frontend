import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Accordion } from '.'

describe('Accordion component', () => {
  it('should render as many titles as provided by the items prop', () => {
    render(
      <Accordion
        items={[
          { id: '1', title: 'One', content: 'Content-1' },
          { id: '2', title: 'Two', content: 'Content-2' },
          { id: '3', title: 'Three', content: 'Content-3' },
          { id: '4', title: 'Four', content: 'Content-4' },
        ]}
      />
    )
    const one = screen.getByText('One')
    const two = screen.getByText('Two')
    const three = screen.getByText('Three')
    const four = screen.getByText('Four')
    expect(one).toBeInTheDocument()
    expect(two).toBeInTheDocument()
    expect(three).toBeInTheDocument()
    expect(four).toBeInTheDocument()
  })
  it('should open an item if clicked', () => {
    render(
      <Accordion
        items={[
          { id: '1', title: 'One', content: 'Content-1' },
          { id: '2', title: 'Two', content: 'Content-2' },
          { id: '3', title: 'Three', content: 'Content-3' },
          { id: '4', title: 'Four', content: 'Content-4' },
        ]}
      />
    )

    const content1 = screen.queryByText('Content-1')
    expect(content1).not.toBeInTheDocument()
    const content2 = screen.queryByText('Content-2')
    expect(content2).not.toBeInTheDocument()

    const one = screen.getByText('One')
    fireEvent.click(one)

    const content1_2 = screen.queryByText('Content-1')
    expect(content1_2).toBeInTheDocument()
    const content2_2 = screen.queryByText('Content-2')
    expect(content2_2).not.toBeInTheDocument()

    const two = screen.getByText('Two')
    fireEvent.click(two)

    const content1_3 = screen.queryByText('Content-1')
    expect(content1_3).not.toBeInTheDocument()
    const content2_3 = screen.queryByText('Content-2')
    expect(content2_3).toBeInTheDocument()
  })

  it('should close an item if already open', () => {
    render(
      <Accordion items={[{ id: '1', title: 'One', content: 'Content-1' }]} />
    )

    const content1 = screen.queryByText('Content-1')
    expect(content1).not.toBeInTheDocument()

    const one = screen.getByText('One')
    fireEvent.click(one)

    const content1_2 = screen.queryByText('Content-1')
    expect(content1_2).toBeInTheDocument()

    fireEvent.click(one)

    const content1_3 = screen.queryByText('Content-1')
    expect(content1_3).not.toBeInTheDocument()
  })
})
