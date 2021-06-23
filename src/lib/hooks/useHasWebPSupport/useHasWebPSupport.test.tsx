import { render } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { useHasWebPSupport } from '.'

type OnSuccessType = (hasWebPSupport: boolean) => void

const createTestComponent = (onSuccess: OnSuccessType): FC => {
  const TestComponent: FC = () => {
    const hasWebPSupport = useHasWebPSupport()
    useEffect(() => {
      onSuccess(hasWebPSupport)
    }, [hasWebPSupport])

    return <div />
  }
  return TestComponent
}
describe('useHasWebPSupport', () => {
  //jest virtual browser doesn't support webp
  test('should default to false with jest', () => {
    const onSuccess = jest.fn()
    const TestComponent = createTestComponent(onSuccess)
    render(<TestComponent />)

    expect(onSuccess).toHaveBeenLastCalledWith(false)
  })
})
