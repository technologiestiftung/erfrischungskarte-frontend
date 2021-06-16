import { useEffect, useState } from 'react'

interface WindowSizeType {
  width: number
  height: number
}

export const useWindowSize = (): WindowSizeType => {
  const getWindowSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  const [windowSize, setWindowSize] = useState({ width: null, height: null })

  function handleResize() {
    setWindowSize(getWindowSize())
  }

  useEffect(() => {
    setWindowSize(getWindowSize())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
