import { useCallback, useEffect, useRef, useState } from 'react'

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
        return
      }

      navigator.clipboard.writeText(text).then(startTimeout).catch(setError)
    },
  }
}
