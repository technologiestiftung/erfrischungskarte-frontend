import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HourSelector } from '.'
import * as nextRouter from 'next/router'
import * as hasMobileSize from '@lib/hooks/useHasMobileSize'

const useRouter = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  push: jest.fn().mockResolvedValue(true),
  pathname: '/map',
})

const useHasMobileSize = jest.fn()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
hasMobileSize.useHasMobileSize = useHasMobileSize.mockReturnValue(true)

describe('HourSelector', () => {
  test('should render a close button', async () => {
    useHasMobileSize.mockReturnValue(false)
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const closeButton = screen.getByLabelText('close-hour-selector')

    await waitFor(() => expect(closeButton).toBeInTheDocument())

    fireEvent.click(closeButton)

    await waitFor(() => expect(closeButton).not.toBeInTheDocument())
  })
  test('should render an open button', async () => {
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const closeButton = screen.getByLabelText('close-hour-selector')

    await waitFor(() => expect(closeButton).toBeInTheDocument())

    fireEvent.click(closeButton)

    const openButtonBefore = screen.getByLabelText('open-hour-selector')

    await waitFor(() => expect(openButtonBefore).toBeInTheDocument())

    fireEvent.click(openButtonBefore)

    const openButtonAfter = screen.queryByLabelText('open-hour-selector')

    await waitFor(() => expect(openButtonAfter).not.toBeInTheDocument())
  })
  test('should go to /map on mobile', async () => {
    const testPush = jest.fn().mockResolvedValue(true)
    const testQuery = { showTemperature: 'true' }
    useRouter.mockReturnValue({
      query: testQuery,
      push: testPush,
      pathname: '/about',
    })
    useHasMobileSize.mockReturnValue(true)
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const openButtonBefore = screen.getByLabelText('open-hour-selector')

    await waitFor(() => expect(openButtonBefore).toBeInTheDocument())

    fireEvent.click(openButtonBefore)

    await waitFor(() =>
      expect(testPush).toHaveBeenCalledWith({
        pathname: '/map',
        query: { showTemperature: true },
      })
    )
  })
  test('should not do anything if clicked on an open center', async () => {
    const testPush = jest.fn().mockResolvedValue(true)
    useRouter.mockReturnValue({
      query: {},
      push: testPush,
      pathname: '/map',
    })
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const openButton = screen.getByLabelText('open-hour-selector')

    await waitFor(() => expect(openButton).toBeInTheDocument())

    fireEvent.click(openButton)

    await waitFor(() => expect(testPush).toHaveBeenCalled())

    const hourSelectorClosed = screen.getByLabelText('hour-selector-closed')
    await waitFor(() => expect(hourSelectorClosed).toBeInTheDocument())

    fireEvent.click(hourSelectorClosed)

    await waitFor(() => expect(testPush).toHaveBeenCalledTimes(1))
  })
  test('should render an active item', async () => {
    render(<HourSelector activeHourKey="10" onChange={jest.fn()} />)

    const activeEl = screen.getByLabelText('active-hour-10')

    await waitFor(() => expect(activeEl).toBeInTheDocument())
  })
  test('should call onChange when an item is clicked', async () => {
    const onChange = jest.fn()
    render(<HourSelector activeHourKey="21" onChange={onChange} />)

    const clickEl = screen.getByLabelText('select-hour-10')

    fireEvent.click(clickEl)

    await waitFor(() => expect(onChange).toHaveBeenCalledWith('10'))
  })
})
