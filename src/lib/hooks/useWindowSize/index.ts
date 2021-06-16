import { useEffect, useState } from 'react'

interface WindowSizeType {
  width: number
  height: number
}

interface WindowSizePayloadType {
  width: number
  height: number
}

export const useWindowSize = (): WindowSizeType => {
  const getWindowSize = (): WindowSizePayloadType => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [windowSize, setWindowSize] = useState<WindowSizePayloadType>({
    width: 1440,
    height: 960,
  })

  useEffect(() => {
    function handleResize(): void {
      setWindowSize(getWindowSize())
    }
    setWindowSize(getWindowSize())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
