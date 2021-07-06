import { render, waitFor } from '@testing-library/react'
import { FC, useEffect } from 'react'
import { useCopyToClipboard } from '.'

type OnSuccessType = (hasCopied: boolean) => void
type OnErrorType = () => void

const createTestComponent = (
  onSuccess: OnSuccessType,
  onError: OnErrorType
): FC => {
  const TestComponent: FC = () => {
    const { hasCopied, copyToClipboard, error } = useCopyToClipboard()
    useEffect(() => {
      !error && onSuccess(hasCopied)
      error && onError()
    }, [hasCopied, error])

    useEffect(() => {
      copyToClipboard('Test')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div />
  }
  return TestComponent
}

const writeText = jest.fn()
const execCommand = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: writeText,
  },
})
Object.assign(document, {
  execCommand: execCommand,
})

describe('useCopyToClipboard', () => {
  jest.spyOn(navigator.clipboard, 'writeText')
  test('should copy if navigator exists', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()
    writeText.mockResolvedValue(true)
    const TestComponent = createTestComponent(onSuccess, onError)
    render(<TestComponent />)

    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenNthCalledWith(1, false)
        expect(onSuccess).toHaveBeenNthCalledWith(2, true)
        expect(onSuccess).toHaveBeenNthCalledWith(3, false)
        expect(onError).not.toHaveBeenCalled()
      },
      { timeout: 3100 }
    )
  })
  test('should fail if navigator fails', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()
    writeText.mockRejectedValue(new Error())
    const TestComponent = createTestComponent(onSuccess, onError)
    render(<TestComponent />)

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(false)
      expect(onSuccess).not.toHaveBeenCalledWith(true)
      expect(onError).toHaveBeenCalled()
    })
  })
  test('should call fallback with success if clipboard is not supported', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()
    writeText.mockRejectedValue(new Error())
    execCommand.mockReturnValue(true)
    const originalClipboard = navigator.clipboard
    Object.assign(navigator, { clipboard: undefined })
    const TestComponent = createTestComponent(onSuccess, onError)
    render(<TestComponent />)
    Object.assign(navigator, originalClipboard)

    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenNthCalledWith(1, false)
        expect(onSuccess).toHaveBeenNthCalledWith(2, true)
        expect(onSuccess).toHaveBeenNthCalledWith(3, false)
        expect(onError).not.toHaveBeenCalled()
      },
      { timeout: 3100 }
    )
  })
  test('should call nothing if fallback execCommand return false', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()
    writeText.mockRejectedValue(new Error())
    execCommand.mockReturnValue(false)
    const originalClipboard = navigator.clipboard
    Object.assign(navigator, { clipboard: undefined })
    const TestComponent = createTestComponent(onSuccess, onError)
    render(<TestComponent />)
    Object.assign(navigator, originalClipboard)

    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalledWith(false)
        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onError).not.toHaveBeenCalled()
      },
      { timeout: 3100 }
    )
  })
  test('should call fallback with fail if clipboard is not supported', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()
    writeText.mockRejectedValue(new Error())
    execCommand.mockImplementation(() => {
      throw new Error('Error')
    })
    const originalClipboard = navigator.clipboard
    Object.assign(navigator, { clipboard: undefined })
    const TestComponent = createTestComponent(onSuccess, onError)
    render(<TestComponent />)
    Object.assign(navigator, originalClipboard)

    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalledWith(false)
        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onError).toHaveBeenCalled()
      },
      { timeout: 3100 }
    )
  })
})
