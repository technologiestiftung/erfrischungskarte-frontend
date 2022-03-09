import { useCallback, useEffect, useRef, useState } from 'react'

function fallbackCopyTextToClipboard(
  text: string,
  onSuccess: () => void,
  onError: (error: Error) => void
): void {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    successful && onSuccess()
  } catch (err) {
    onError(new Error(err as string))
  }

  document.body.removeChild(textArea)
}

export const useCopyToClipboard = (): {
  hasCopied: boolean
  error: Error | null
  copyToClipboard: (text: string) => void
} => {
  const to = useRef<number>(0)
  const [hasCopied, setHascopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const startTimeout = useCallback(() => {
    setHascopied(true)
    to.current = setTimeout(
      () => setHascopied(false),
      3000
    ) as unknown as number
  }, [])

  useEffect(() => () => clearTimeout(to as unknown as number), [])

  return {
    hasCopied,
    error,
    copyToClipboard: (text) => {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text, startTimeout, setError)
        return
      }

      navigator.clipboard.writeText(text).then(startTimeout).catch(setError)
    },
  }
}
