import { render } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { useCurrentTime } from '.'

type OnSuccessType = (currentTime: number) => void

const createTestComponent = (onSuccess: OnSuccessType): FC => {
  const TestComponent: FC = () => {
    const currentTime = useCurrentTime()
    useEffect(() => {
      onSuccess(currentTime)
    }, [currentTime])

    return <div />
  }
  return TestComponent
}
describe('useCurrentTime', () => {
  test('should round up from 3:30 am', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)

    global.Date.now = jest.fn(() =>
      new Date(
        'Fri Jan 01 2021 03:30:00 GMT+0100 (Central European Standard Time)'
      ).getTime()
    )

    render(<TestComponent />)
    expect(onSuccess).toHaveBeenLastCalledWith(10)
  })
  test('should round down from 3:29 am', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)

    global.Date.now = jest.fn(() =>
      new Date(
        'Fri Jan 01 2021 03:29:00 GMT+0100 (Central European Standard Time)'
      ).getTime()
    )

    render(<TestComponent />)
    expect(onSuccess).toHaveBeenLastCalledWith(20)
  })
  test('should round up from XX:30', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)

    global.Date.now = jest.fn(() =>
      new Date(
        'Fri Jan 01 2021 14:30:00 GMT+0100 (Central European Standard Time)'
      ).getTime()
    )

    render(<TestComponent />)
    expect(onSuccess).toHaveBeenLastCalledWith(15)
  })
  test('should round up from XX:29', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)

    global.Date.now = jest.fn(() =>
      new Date(
        'Fri Jan 01 2021 14:29:00 GMT+0100 (Central European Standard Time)'
      ).getTime()
    )

    render(<TestComponent />)
    expect(onSuccess).toHaveBeenLastCalledWith(14)
  })
})
