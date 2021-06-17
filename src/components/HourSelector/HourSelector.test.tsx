import { fireEvent, render, screen } from '@testing-library/react'
import { HourSelector } from '.'

describe('HourSelector', () => {
  test('should render a close button', () => {
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const closeButton = screen.getByLabelText('close-hour-selector')

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    expect(closeButton).not.toBeInTheDocument()
  })
  test('should render an open button', () => {
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const closeButton = screen.getByLabelText('close-hour-selector')

    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    const openButtonBefore = screen.getByLabelText('open-hour-selector')

    expect(openButtonBefore).toBeInTheDocument()

    fireEvent.click(openButtonBefore)

    const openButtonAfter = screen.queryByLabelText('open-hour-selector')

    expect(openButtonAfter).not.toBeInTheDocument()
  })
  test('should render an active item', () => {
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const activeEl = screen.getByLabelText('active-hour-10')

    expect(activeEl).toBeInTheDocument()
  })
  test('should call onChange when an item is clicked', () => {
    const onChange = jest.fn()
    render(<HourSelector activeHourKey="21" onChange={onChange} />)

    const clickEl = screen.getByLabelText('select-hour-10')

    fireEvent.click(clickEl)

    expect(onChange).toHaveBeenCalledWith('10')
  })
})
