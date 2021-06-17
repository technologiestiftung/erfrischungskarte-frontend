import { render } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { useHasMobileSize } from '.'

type OnSuccessType = (hasMobileSize: boolean) => void

const createTestComponent = (onSuccess: OnSuccessType): FC => {
  const TestComponent: FC = () => {
    const hasMobileSize = useHasMobileSize()
    useEffect(() => {
      onSuccess(hasMobileSize)
    }, [hasMobileSize])

    return <div />
  }
  return TestComponent
}
describe('useHasMobileSize', () => {
  test('should default to false', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)
    render(<TestComponent />)

    expect(onSuccess).toHaveBeenLastCalledWith(false)
  })
  test('should change to true when smaller', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        onchange: null,
        addEventListener: (
          _eventType: string,
          handler: (evt: { matches: boolean }) => void
        ) => {
          handler({ matches: true })
        },
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)
    render(<TestComponent />)

    expect(onSuccess).toHaveBeenLastCalledWith(true)
  })
})
